// Simplified PhD Clicker using data.zh.js / data.en.js

// ---------------- Locale & Data ----------------
let currentLang = localStorage.getItem('phd-clicker-lang') || 'zh';
let locale = {};
let BUILDINGS_CONFIG = [];
let UPGRADES_CONFIG = [];
let SUBMISSION_SYSTEM = { tiers: [], flavorText: { accepted: [], rejected: [] } };
let ACTIVE_NEWS = [];
let ACTIVE_CLICK_PHRASES = [];

const getDataForLang = (lang) => {
  if (lang === 'en') return window.GAME_DATA_EN || window.GAME_DATA_ZH || {};
  return window.GAME_DATA_ZH || window.GAME_DATA_EN || {};
};
const setLocaleData = (lang) => {
  const data = getDataForLang(lang);
  locale = data || {};
  BUILDINGS_CONFIG = data.buildings || [];
  UPGRADES_CONFIG = data.upgrades || [];
  SUBMISSION_SYSTEM = data.submission || { tiers: [], flavorText: { accepted: [], rejected: [] } };
  ACTIVE_NEWS = data.news || [];
  ACTIVE_CLICK_PHRASES = data.clickPhrases || [];
};
setLocaleData(currentLang);

// ---------------- State ----------------
let rp = 0, totalRp = 0, citations = 0;
let citationsRate = 0, papersSubmitted = 0;
let inventory = {}, purchasedUpgrades = [];
let rps = 0, clickPower = 1, globalMultiplier = 1;
let newsIndex = 0, isGameStarted = false, lastTickTime = Date.now();
let acceptedPapers = {};
let submissionSession = null;
let resultTypingTimer = null;

const dom = { elements: { buildings: {}, upgrades: {} } };

// ---------------- Helpers ----------------
const t = (key, fallback = '') => (locale.ui && key in locale.ui ? locale.ui[key] : fallback);
const formatTemplate = (tpl, rep = {}) => Object.entries(rep).reduce((s,[k,v])=>s.replace(`{${k}}`,v), tpl||'');
const formatNumber = (n) => {
  if (n < 1000) return n.toFixed(1);
  if (n < 1e6) return (n/1e3).toFixed(1)+'K';
  if (n < 1e9) return (n/1e6).toFixed(1)+'M';
  return (n/1e9).toFixed(1)+'B';
};
const calculateCost = (base, count) => Math.floor(base*Math.pow(1.12,count));
const buildingMultiplierFor = (id) => UPGRADES_CONFIG.reduce((m,u)=>m*(purchasedUpgrades.includes(u.id)&&u.type==='building'&&u.target===id?u.multiplier:1),1);
const totalCitationRateForPapers = (count)=> count*0.05 + 0.01*count*(count-1);
const pickRandom = (arr)=> arr && arr.length ? arr[Math.floor(Math.random()*arr.length)] : '';
const visibleBuildingCount = () => Math.min(BUILDINGS_CONFIG.length, Object.values(inventory||{}).filter(v=>v>0).length + 2);
const syncLocaleAssets = () => {
  ACTIVE_NEWS = locale.news || [];
  ACTIVE_CLICK_PHRASES = locale.clickPhrases || [];
};

// ---------------- DOM Assign ----------------
function assignDom() {
  const ids = [
    'game-container','minimize-button','floating-widget','widget-text','widget-rp-display','rp-display','rp-per-second-display','citations-display','citations-rate-display','papers-count-display','h-index-display','manual-research-button','manual-button-label','floating-text-container','buildings-list','upgrades-list','news-ticker','news-prefix','lang-toggle','submit-paper-button','submit-paper-cost','submit-paper-label','prestige-button','prestige-label','reset-button','reset-label','autosave-label','title-text','subtitle-text','rp-label','upgrades-title','facilities-title','submission-modal','submission-close','submission-close-bottom','submission-current-rp','submission-min-cost','tier-stage','tier-list','step1-label','step1-desc','question-stage','question-tier-label','question-progress','question-chance','question-reviewer-badge','question-reviewer-name','question-text','options-container','question-feedback','question-next-btn','step2-label','result-stage','result-letter','result-letter-subject','result-letter-body','result-letter-date','result-settlement','result-icon','result-title','result-detail','result-tier','result-chance','result-roll','result-rewards','result-flavor','result-button','dev-console','dev-close','dev-rp','dev-set-rp','dev-citations','dev-set-citations','dev-papers','dev-set-papers'
  ];
  ids.forEach(id=>{ const el=document.getElementById(id); if(el){ const key=id.replace(/-(\w)/g,(_,c)=>c.toUpperCase()); dom[key]=el; }});
  if(dom.newsTicker) dom.newsTicker = dom.newsTicker.querySelector('span') || dom.newsTicker;
}

// ---------------- Static Texts ----------------
function updateStaticTexts(){
  if (typeof document!=='undefined') document.title = t('title','PhD Clicker');
  dom.titleText && (dom.titleText.textContent = t('title','PhD Clicker'));
  dom.subtitleText && (dom.subtitleText.textContent = t('subtitle',''));
  dom.rpLabel && (dom.rpLabel.textContent = t('rpLabel','Research Points (RP)'));
  dom.manualButtonLabel && (dom.manualButtonLabel.textContent = t('manualButton','Run experiment'));
  dom.submitPaperLabel && (dom.submitPaperLabel.textContent = t('submitPaperButton','Submit paper'));
  dom.prestigeLabel && (dom.prestigeLabel.textContent = t('prestigeButton','Prestige'));
  dom.upgradesTitle && (dom.upgradesTitle.textContent = t('upgradesTitle','Upgrades'));
  dom.facilitiesTitle && (dom.facilitiesTitle.textContent = t('facilitiesTitle','Facilities'));
  dom.resetLabel && (dom.resetLabel.textContent = t('resetButton','Reset Save'));
  dom.autosaveLabel && (dom.autosaveLabel.textContent = t('autosaving','Auto-saving'));
  dom.langToggle && (dom.langToggle.textContent = currentLang==='zh' ? 'English' : '中文');
  dom.newsPrefix && (dom.newsPrefix.textContent = t('newsPrefix','NEWS:'));
  dom.step1Label && (dom.step1Label.textContent = 'Step 1');
  dom.step2Label && (dom.step2Label.textContent = 'Step 2');
  dom.step1Desc && (dom.step1Desc.textContent = t('submissionStep1', dom.step1Desc.textContent || ''));
}

// ---------------- Render Lists ----------------
function renderInitialDOM(){
  if(!dom.buildingsList||!dom.upgradesList) return;
  dom.buildingsList.innerHTML='';
  BUILDINGS_CONFIG.forEach(b=>{
    inventory[b.id]=inventory[b.id]||0;
    const html=`<button id="buy-${b.id}" data-type="building" data-id="${b.id}" class="flex items-center p-3 rounded border bg-slate-800/50 border-slate-800 opacity-60 cursor-not-allowed transition-all" disabled><div class="w-12 h-12 rounded bg-slate-700 flex items-center justify-center text-indigo-400 shrink-0 mr-4 relative"><i data-lucide="${b.icon}" class="w-6 h-6"></i><div id="b-count-${b.id}" class="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 border border-slate-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm">0</div></div><div class="flex-1 text-left"><div class="flex justify-between items-baseline mb-1"><span id="b-name-${b.id}" class="font-bold text-slate-200">${b.name}</span><span id="b-cost-${b.id}" class="font-mono text-sm text-red-400">...</span></div><div id="b-desc-${b.id}" class="text-xs text-slate-500 italic mb-1">${b.desc||''}</div><div id="b-prod-${b.id}" class="text-xs text-indigo-300">+${formatNumber(b.baseProd)} RP/s</div></div></button>`;
    dom.buildingsList.insertAdjacentHTML('beforeend',html);
  });
  dom.upgradesList.innerHTML='';
  UPGRADES_CONFIG.forEach(u=>{
    const html=`<button id="buy-${u.id}" data-type="upgrade" data-id="${u.id}" class="p-3 rounded border text-left transition-all relative overflow-hidden group bg-slate-800 border-slate-700 opacity-70 cursor-not-allowed" disabled><div class="font-bold text-sm text-slate-200 mb-1">${u.name}</div><div class="text-xs text-slate-400 leading-tight">${u.desc||''}</div>${u.effect?`<div class=\"text-[11px] text-indigo-300 mt-1\">${u.effect}</div>`:''}<div class="text-xs font-mono font-bold text-indigo-400 mt-1">${formatNumber(u.cost)} RP</div></button>`;
    dom.upgradesList.insertAdjacentHTML('beforeend',html);
  });
  BUILDINGS_CONFIG.forEach(b=>{ dom.elements.buildings[b.id]={
    button:document.getElementById(`buy-${b.id}`),
    name:document.getElementById(`b-name-${b.id}`),
    cost:document.getElementById(`b-cost-${b.id}`),
    count:document.getElementById(`b-count-${b.id}`),
    prod:document.getElementById(`b-prod-${b.id}`),
    desc:document.getElementById(`b-desc-${b.id}`)
  };});
  UPGRADES_CONFIG.forEach(u=>{ dom.elements.upgrades[u.id]={button:document.getElementById(`buy-${u.id}`)};});
  window.lucide && lucide.createIcons();
}

// ---------------- UI Update ----------------
function updateUI(){
  if(!isGameStarted) return;
  dom.rpDisplay && (dom.rpDisplay.textContent=formatNumber(rp));
  dom.rpPerSecondDisplay && (dom.rpPerSecondDisplay.textContent=formatTemplate(t('rpPerSec','+{value} / sec'),{value:formatNumber(rps)}));
  dom.citationsDisplay && (dom.citationsDisplay.textContent=`${t('citationsLabel','Citations')}: ${formatNumber(citations)}`);
  dom.hIndexDisplay && (dom.hIndexDisplay.textContent=formatTemplate(t('globalMultiplier','Global output x{value}'),{value:globalMultiplier.toFixed(2)}));
  dom.papersCountDisplay && (dom.papersCountDisplay.textContent=`${t('papersLabel','Papers')}: ${papersSubmitted}`);
  dom.citationsRateDisplay && (dom.citationsRateDisplay.textContent=`${t('citationsRateLabel','Citation gain')}: +${formatNumber(citationsRate)} / sec`);
  dom.submissionCurrentRp && (dom.submissionCurrentRp.textContent=`RP: ${formatNumber(rp)}`);

  const visibleCount = visibleBuildingCount();
  BUILDINGS_CONFIG.forEach((b,idx)=>{
    const els=dom.elements.buildings[b.id]; if(!els) return;
    const isVisible = idx < visibleCount;
    const cost=calculateCost(b.baseCost, inventory[b.id]||0);
    const canAfford=rp+1e-6>=cost;

    els.name.textContent=isVisible?b.name:'???';
    els.desc.textContent=isVisible?(b.desc||''):'???';
    els.cost.textContent=isVisible?formatNumber(cost):'???';
    els.count.textContent=inventory[b.id]||0;
    const totalMult=buildingMultiplierFor(b.id)*globalMultiplier;
    els.prod.textContent=isVisible?`+${formatNumber(b.baseProd*totalMult)} RP/s`:'???';

    els.button.disabled = !isVisible || !canAfford;
    if(isVisible && canAfford){
      els.button.classList.remove('opacity-60','cursor-not-allowed');
      els.button.classList.add('border-indigo-500','bg-slate-700/70','shadow-lg');
    } else {
      els.button.classList.add('opacity-60','cursor-not-allowed');
      els.button.classList.remove('border-indigo-500','bg-slate-700/70','shadow-lg');
    }
    if (els.cost){
      if (isVisible && canAfford){ els.cost.classList.add('text-green-400'); els.cost.classList.remove('text-red-400'); }
      else { els.cost.classList.add('text-red-400'); els.cost.classList.remove('text-green-400'); }
    }
  });

  UPGRADES_CONFIG.forEach((u,idx)=>{
    const els=dom.elements.upgrades[u.id]; if(!els) return;
    const isBought=purchasedUpgrades.includes(u.id);
    const unlocked=idx < purchasedUpgrades.length+2;
    const canAfford=rp+1e-6>=u.cost;
    if(!unlocked){els.button.disabled=true;els.button.className='p-3 rounded border text-left transition-all relative overflow-hidden group bg-slate-900 border-slate-800 opacity-70 cursor-not-allowed';els.button.innerHTML=`<div class=\"font-bold text-sm text-slate-500 mb-1\">???</div><div class=\"text-xs text-slate-600 mb-2 leading-tight h-8\">${t('locked','Locked')}</div><div class=\"text-xs font-mono font-bold text-slate-600\">??? RP</div>`;return;}
    const name=u.name, desc=u.desc||'', effect=u.effect||'';
    if(isBought){
      els.button.disabled=true;
      els.button.className='p-3 rounded border text-left transition-all relative overflow-hidden group bg-emerald-900/40 border-emerald-500 text-emerald-200';
      els.button.innerHTML=`<div class=\"flex items-center justify-between\"><span class=\"font-bold text-sm\">${name}</span><span class=\"text-emerald-300 text-xs font-mono\">${t('purchased','Owned')}</span></div><div class=\"text-xs text-slate-300 leading-tight\">${desc}</div>${effect?`<div class=\"text-[11px] text-emerald-300 mt-1\">${effect}</div>`:''}<div class=\"text-xs font-mono font-bold text-indigo-200 line-through\">${formatNumber(u.cost)} RP</div>`;
    } else {
      els.button.disabled=!canAfford;
      els.button.className='p-3 rounded border text-left transition-all relative overflow-hidden group bg-slate-800 border-slate-700';
      els.button.innerHTML=`<div class=\"font-bold text-sm text-slate-200 mb-1\">${name}</div><div class=\"text-xs text-slate-400 leading-tight\">${desc}</div>${effect?`<div class=\"text-[11px] text-indigo-300 mt-1\">${effect}</div>`:''}<div class=\"text-xs font-mono font-bold text-indigo-400 mt-1\">${formatNumber(u.cost)} RP</div>`;
      if(canAfford) els.button.classList.add('border-indigo-500','bg-slate-700/70','shadow-lg'); else els.button.classList.add('opacity-70','cursor-not-allowed');
    }
  });

  if(dom.submitPaperCost){
    const costs=(SUBMISSION_SYSTEM.tiers||[]).map(t=>t.costRp).filter(Number.isFinite);
    const minCost=Math.min(...costs, Infinity);
    dom.submitPaperCost.textContent = isFinite(minCost)?formatTemplate(t('submitPaperCostLabel','From {value} RP'),{value:formatNumber(minCost)}):'...';
  }
}

// ---------------- Purchases ----------------
function buyBuilding(id){
  const b=BUILDINGS_CONFIG.find(x=>x.id===id); if(!b) return;
  const cost=calculateCost(b.baseCost, inventory[b.id]||0);
  if(rp<cost) return;
  rp-=cost; inventory[b.id]=(inventory[b.id]||0)+1; updateAll();
}
function buyUpgrade(id){
  const u=UPGRADES_CONFIG.find(x=>x.id===id); if(!u||purchasedUpgrades.includes(id)) return;
  if(rp < u.cost) return;
  rp-=u.cost; purchasedUpgrades.push(id); updateAll();
}

// ---------------- Submission (simplified) ----------------
const resetSubmissionStages = () => {
  dom.questionStage && dom.questionStage.classList.add('hidden');
  dom.resultStage && dom.resultStage.classList.add('hidden');
  dom.resultSettlement && dom.resultSettlement.classList.add('hidden');
  if(resultTypingTimer){ clearInterval(resultTypingTimer); resultTypingTimer=null; }
  if (dom.questionFeedback) {
    dom.questionFeedback.classList.add('hidden');
    dom.questionFeedback.classList.remove('text-emerald-300','text-rose-300');
  }
  dom.questionNextBtn && dom.questionNextBtn.classList.add('hidden');
};
const updateSubmissionRpDisplay = () => { dom.submissionCurrentRp && (dom.submissionCurrentRp.textContent=`RP: ${formatNumber(rp)}`); };
function openSubmissionModal(){
  submissionSession = null;
  renderTierSelection();
  resetSubmissionStages();
  dom.tierStage && dom.tierStage.classList.remove('hidden');
  dom.submissionModal && dom.submissionModal.classList.remove('hidden');
  updateSubmissionRpDisplay();
}
function closeSubmissionModal(){
  resetSubmissionStages();
  dom.submissionModal && dom.submissionModal.classList.add('hidden');
  dom.tierStage && dom.tierStage.classList.remove('hidden');
  submissionSession = null;
}
function renderTierSelection(){
  if(!dom.tierList) return;
  dom.tierList.innerHTML='';
  const costLabel=t('costLabel','Cost');
  const baseLabel=t('baseRateLabel','Base accept rate');
  const bonusLabel=t('bonusPerQuestion','Per question');
  const totalLabel=t('totalQuestions','Total questions');
  const rewardLabel=t('rewardLabel','Reward');
  const submitLabel=t('submitVenue','Submit here');
  const costs=(SUBMISSION_SYSTEM.tiers||[]).map(t=>t.costRp).filter(Number.isFinite);
  const minCost=Math.min(...costs, Infinity);
  if(dom.submissionMinCost) dom.submissionMinCost.textContent = isFinite(minCost)?`${costLabel}: ${formatNumber(minCost)} RP`:'';
  (SUBMISSION_SYSTEM.tiers||[]).forEach(tier=>{
    const canAfford=rp>=tier.costRp;
    const rewardCt=tier.rewardCitations*(tier.rewardMultiplier||1);
    const card=document.createElement('div');
    card.className=`rounded-xl border ${canAfford?'border-indigo-500/60 bg-slate-800/60':'border-slate-800 bg-slate-900/40'} p-4 shadow relative overflow-hidden`;
    card.innerHTML=`<div class=\"flex items-start justify-between gap-3 mb-2\"><div><div class=\"text-sm font-bold text-white\">${tier.name}</div><div class=\"text-xs text-slate-400 leading-snug\">${tier.description||''}</div></div><div class=\"text-right\"><div class=\"text-xs text-slate-400\">${costLabel}</div><div class=\"text-sm font-mono font-semibold ${canAfford?'text-indigo-200':'text-slate-500'}\">${formatNumber(tier.costRp)} RP</div></div></div><div class=\"flex items-center justify-between text-xs text-slate-400 mb-2\"><span>${baseLabel} ${Math.round(tier.baseRate*100)}% · ${bonusLabel} +${Math.round(tier.bonusPerCorrect*100)}%</span><span>${totalLabel} ${tier.questionConfig.total}</span></div><div class=\"text-[11px] text-slate-300 mb-3 px-2 py-1 rounded bg-slate-800/70 border border-slate-700\">${rewardLabel}: +${formatNumber(rewardCt)} Citations</div><button data-tier-id=\"${tier.id}\" class=\"w-full mt-1 py-2 rounded-lg text-sm font-bold border transition-colors ${canAfford?'border-indigo-500 text-indigo-100 bg-indigo-900/40 hover:bg-indigo-800/60':'border-slate-800 text-slate-500 bg-slate-800/40 cursor-not-allowed'}\" ${canAfford?'':'disabled'}>${submitLabel}</button>`;
    dom.tierList.appendChild(card);
  });
}
const buildSubmissionQuestions = (tier) => {
  const funny = (SUBMISSION_SYSTEM.questionPool?.funny || []).slice();
  const tech = (SUBMISSION_SYSTEM.questionPool?.technical || []).slice();
  const questions = [];
  const take = (arr, count, type) => {
    for(let i=0;i<count && arr.length;i++){ const idx=Math.floor(Math.random()*arr.length); const q={...arr.splice(idx,1)[0], type}; questions.push(q); }
  };
  take(funny, tier.questionConfig.funny, 'funny');
  take(tech, tier.questionConfig.tech, 'technical');
  while(questions.length < tier.questionConfig.total){
    const pool=[...funny,...tech];
    if(!pool.length) break;
    const q=pool[Math.floor(Math.random()*pool.length)];
    if(q) questions.push({...q});
  }
  return questions.slice(0, tier.questionConfig.total);
};

function showQuestion(){
  if(!submissionSession || !dom.questionStage) return;
  const { tier, questions, index, correct } = submissionSession;
  const q = questions[index];
  if(!q) return;
  resetSubmissionStages();
  dom.tierStage && dom.tierStage.classList.add('hidden');
  dom.questionStage.classList.remove('hidden');
  const chance = Math.min(1, tier.baseRate + correct * tier.bonusPerCorrect);
  const reviewerNum = q.reviewer || ((index % 3) + 1);
  dom.questionTierLabel && (dom.questionTierLabel.textContent = `${tier.name} · Rebuttal`);
  dom.questionProgress && (dom.questionProgress.textContent = `Q ${index+1}/${questions.length}`);
  dom.questionChance && (dom.questionChance.textContent = `${Math.round(chance*100)}%`);
  dom.questionReviewerBadge && (dom.questionReviewerBadge.textContent = `#${reviewerNum}`);
  dom.questionReviewerName && (dom.questionReviewerName.textContent = `Reviewer #${reviewerNum}`);
  dom.questionText && (dom.questionText.textContent = q.q || q.question || q.text || '');
  if(dom.optionsContainer){
    dom.optionsContainer.innerHTML = '';
    q.options.forEach((opt,idx)=>{
      const btn=document.createElement('button');
      btn.className='w-full text-left p-3 rounded-lg border border-slate-700 bg-slate-800/60 hover:border-indigo-400 hover:bg-slate-700 transition-colors text-sm text-slate-200';
      btn.textContent=opt;
      btn.addEventListener('click', ()=>handleSubmissionAnswer(idx));
      dom.optionsContainer.appendChild(btn);
    });
  }
  submissionSession.answered=false;
  submissionSession.locked=false;
  dom.questionNextBtn && dom.questionNextBtn.classList.add('hidden');
}

function handleSubmissionAnswer(choiceIdx){
  if(!submissionSession) return;
  const { tier, questions, index } = submissionSession;
  const q = questions[index];
  if(!q || submissionSession.locked || submissionSession.answered) return;
  submissionSession.locked = true;
  const correctIdx = typeof q.correct === 'number' ? q.correct : (typeof q.answer === 'number' ? q.answer : q.correctIndex);
  const isCorrect = choiceIdx === correctIdx;
  if(isCorrect) submissionSession.correct += 1;
  submissionSession.answered = true;
  if(dom.questionFeedback){
    const incorrectMsg = t('incorrectAnswer','Reviewer: this argument is not convincing enough...');
    dom.questionFeedback.textContent = isCorrect ? (q.comment || t('correctAnswer','回答正确！')) : incorrectMsg;
    dom.questionFeedback.classList.remove('hidden');
    dom.questionFeedback.classList.toggle('text-emerald-300', isCorrect);
    dom.questionFeedback.classList.toggle('text-rose-300', !isCorrect);
  }
  if(dom.optionsContainer){
    dom.optionsContainer.querySelectorAll('button').forEach((btn,idx)=>{
      btn.disabled=true;
      if(idx===correctIdx) btn.classList.add('border-emerald-400','bg-emerald-900/40');
      if(idx===choiceIdx && !isCorrect) btn.classList.add('border-rose-400','bg-rose-900/40');
    });
  }
  if(dom.questionNextBtn){
    dom.questionNextBtn.textContent = (index >= questions.length-1) ? t('resultButton','查看结果') : t('questionNext','下一题');
    dom.questionNextBtn.classList.remove('hidden');
  } else {
    goNextQuestion();
  }
}

function goNextQuestion(){
  if(!submissionSession || !submissionSession.answered) return;
  submissionSession.index += 1;
  submissionSession.answered = false;
  submissionSession.locked = false;
  if(submissionSession.index >= submissionSession.questions.length){
    finishSubmission();
  } else {
    showQuestion();
  }
}

function finishSubmission(){
  if(!submissionSession) return;
  const { tier, correct, questions } = submissionSession;
  const finalChance = Math.min(1, tier.baseRate + correct * tier.bonusPerCorrect);
  const roll = Math.random();
  const accepted = roll < finalChance;
  const rewardCt = tier.rewardCitations * (tier.rewardMultiplier||1);
  const rpReward = accepted ? tier.costRp : 0;
  const target = pickRandom(tier.targets) || tier.name;
  if(accepted){
    rp += rpReward;
    totalRp += rpReward;
    citations += rewardCt;
    papersSubmitted += 1;
    citationsRate = totalCitationRateForPapers(papersSubmitted);
    acceptedPapers[target] = (acceptedPapers[target]||0)+1;
  }
  submissionSession.result = {accepted, chance:finalChance, roll, rewardCt, rpReward, target, tier, correct, total:questions.length};
  showSubmissionResult();
  updateAll();
}

function startSubmission(tierId){
  const tier=(SUBMISSION_SYSTEM.tiers||[]).find(t=>t.id===tierId); if(!tier) return;
  if(rp<tier.costRp) return;
  rp-=tier.costRp;
  submissionSession = { tier, questions: buildSubmissionQuestions(tier), index:0, correct:0, answered:false, locked:false, result:null };
  updateSubmissionRpDisplay();
  showQuestion();
  updateAll();
}
function showSubmissionResult(res){
  const data = res || (submissionSession && submissionSession.result);
  if(!data || !dom.resultStage) return;
  resetSubmissionStages();
  dom.resultStage.classList.remove('hidden');
  dom.tierStage && dom.tierStage.classList.add('hidden');
  if(dom.resultLetter){ dom.resultLetter.classList.remove('result-letter-anim'); void dom.resultLetter.offsetWidth; dom.resultLetter.classList.add('result-letter-anim'); }
  if(dom.resultSettlement){ dom.resultSettlement.classList.add('hidden'); dom.resultSettlement.classList.remove('result-settlement-anim'); }
  const {accepted,chance,roll,rewardCt,target,tier,correct,total,rpReward}=data;
  const flavor=pickRandom(accepted?SUBMISSION_SYSTEM.flavorText.accepted:SUBMISSION_SYSTEM.flavorText.rejected) || '';
  if(dom.resultLetterSubject) dom.resultLetterSubject.textContent = accepted ? formatTemplate(t('letterAcceptTitle','[{target}] Decision: Accept'),{target}) : formatTemplate(t('letterRejectTitle','[{target}] Decision: Reject'),{target});
  const letterBodyText = accepted ? formatTemplate(t('letterAcceptBody',''),{target}) : formatTemplate(t('letterRejectBody',''),{target});
  if(dom.resultIcon){dom.resultIcon.textContent=accepted?'A':'R';dom.resultIcon.className=`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border ${accepted?'bg-emerald-500/20 text-emerald-200 border-emerald-400/60':'bg-rose-500/20 text-rose-200 border-rose-400/60'}`;}
  dom.resultTitle && (dom.resultTitle.textContent = accepted ? t('resultAccept','Accept!') : t('resultReject','Reject'));
  dom.resultDetail && (dom.resultDetail.textContent = accepted ? formatTemplate(t('resultPaperAccepted','Your paper was accepted by {target}!'),{target}) : formatTemplate(t('resultPaperRejected','{target} rejected this paper'),{target}));
  dom.resultTier && (dom.resultTier.textContent=target);
  dom.resultChance && (dom.resultChance.textContent=`${Math.round(chance*100)}%`);
  dom.resultRoll && (dom.resultRoll.textContent=`${t('resultRoll','Roll')} ${roll.toFixed(2)}`);
  if(dom.resultRewards){
    const acceptanceLine=Object.entries(acceptedPapers).map(([k,v])=>`[${k}: ${v}]`).join(' ');
    dom.resultRewards.innerHTML = `
      <div class="p-3 rounded-lg border border-slate-800 bg-slate-800/60 text-sm text-slate-200">${t('resultRpReward','RP 奖励')}: ${accepted?formatNumber(rpReward):'+0'}</div>
      <div class="p-3 rounded-lg border border-slate-800 bg-slate-800/60 text-sm text-slate-200">${t('resultCitationReward','Citations 奖励')}: ${accepted?formatNumber(rewardCt):'+0'}</div>
      <div class="p-3 rounded-lg border border-slate-800 bg-slate-800/60 text-sm text-slate-200">${t('resultAnswerSummary','答对 {correct}/{total} 题 · 最终概率 {chance}（基础 {base}）').replace('{correct}', correct??0).replace('{total}', total??0).replace('{chance}', `${Math.round(chance*100)}%`).replace('{base}', `${Math.round(tier.baseRate*100)}%`)}</div>
      <div class="p-3 rounded-lg border border-slate-800 bg-slate-800/60 text-sm text-slate-200">${t('resultAcceptedList','Accepted')}: ${acceptanceLine}</div>`;
  }
  if(dom.resultFlavor) dom.resultFlavor.textContent = flavor;
  if(dom.resultLetterBody){
    dom.resultLetterBody.textContent = '';
    playResultLetterTyping(letterBodyText, ()=>{
      if(dom.resultSettlement){ dom.resultSettlement.classList.remove('hidden'); dom.resultSettlement.classList.add('result-settlement-anim'); }
    });
  } else if(dom.resultSettlement){
    dom.resultSettlement.classList.remove('hidden');
    dom.resultSettlement.classList.add('result-settlement-anim');
  }
}

function playResultLetterTyping(text, done){
  if(!dom.resultLetterBody){ done && done(); return; }
  if(resultTypingTimer){ clearInterval(resultTypingTimer); resultTypingTimer=null; }
  const lines = (text || '').split('\n');
  dom.resultLetterBody.textContent = '';
  let idx=0;
  resultTypingTimer = setInterval(()=>{
    dom.resultLetterBody.textContent += (idx>0?'\n':'') + lines[idx];
    idx += 1;
    if(idx >= lines.length){
      clearInterval(resultTypingTimer);
      resultTypingTimer=null;
      setTimeout(()=>done&&done(), 180);
    }
  }, 120);
}

// ---------------- Game Loop ----------------
function gameLoop(){
  const now=Date.now();
  const delta=Math.min((now-lastTickTime)/1000,10);
  lastTickTime=now;
  const gen=rps*delta;
  rp+=gen; totalRp+=gen;
  const citeGain=citationsRate*delta;
  citations+=citeGain;
  updateUI();
}

// ---------------- Events ----------------
function updateMultipliers(){
  globalMultiplier = 1 + (papersSubmitted * 0.05);
  UPGRADES_CONFIG.forEach(u=>{ if(purchasedUpgrades.includes(u.id) && u.type==='global') globalMultiplier*=u.multiplier; });
  clickPower = 1; UPGRADES_CONFIG.forEach(u=>{ if(purchasedUpgrades.includes(u.id) && u.type==='click') clickPower*=u.multiplier; });
}
function calculateRPS(){
  let raw=0; BUILDINGS_CONFIG.forEach(b=>{ raw += (inventory[b.id]||0)*b.baseProd*buildingMultiplierFor(b.id); });
  rps = raw*globalMultiplier;
}
function updateAll(){ updateMultipliers(); calculateRPS(); updateUI(); }

// ---------------- Handlers ----------------
function buyBuildingHandler(e){ const btn=e.target.closest('button[data-type="building"]'); if(btn) buyBuilding(btn.dataset.id); }
function buyUpgradeHandler(e){ const btn=e.target.closest('button[data-type="upgrade"]'); if(btn) buyUpgrade(btn.dataset.id); }
function handleManualClick(e){ const val=clickPower; rp+=val; totalRp+=val; if(dom.floatingTextContainer && e && e.currentTarget){ const rect=e.currentTarget.getBoundingClientRect(); const x=e.clientX-rect.left; const y=e.clientY-rect.top; const phrase=pickRandom(ACTIVE_CLICK_PHRASES); const floatText=document.createElement('div'); floatText.className='absolute text-sm font-bold text-amber-200 drop-shadow pointer-events-none animate-float-up whitespace-nowrap'; floatText.style.left=`${x}px`; floatText.style.top=`${y}px`; floatText.style.transform='translate(-50%, -50%)'; floatText.textContent=`+${formatNumber(val)} ${phrase||''}`; dom.floatingTextContainer.appendChild(floatText); setTimeout(()=>floatText.remove(),1300);} updateUI(); }
function submitPaper(){ openSubmissionModal(); }
function prestige(){ alert('Not implemented'); }
function hardReset(){ localStorage.removeItem('phd-clicker-save'); location.reload(); }
function handleLanguageToggle(){ applyLanguage(currentLang==='zh'?'en':'zh'); }

// ---------------- Language ----------------
function applyLanguage(lang){ currentLang = (lang==='en')?'en':'zh'; localStorage.setItem('phd-clicker-lang',currentLang); setLocaleData(currentLang); syncLocaleAssets(); updateStaticTexts(); renderInitialDOM(); updateAll(); }

// ---------------- Save/Load ----------------
function saveGame(){ const data={rp,totalRp,citations,citationsRate,papersSubmitted,inventory,purchasedUpgrades,acceptedPapers,currentLang}; localStorage.setItem('phd-clicker-save', JSON.stringify(data)); }
function loadGame(){
  const saved=localStorage.getItem('phd-clicker-save');
  if(!saved){ inventory={}; BUILDINGS_CONFIG.forEach(b=>inventory[b.id]=0); return;}
  try{
    const d=JSON.parse(saved);
    rp=d.rp||0; totalRp=d.totalRp||0; citations=d.citations||0; papersSubmitted=d.papersSubmitted||0;
    citationsRate=totalCitationRateForPapers(papersSubmitted);
    inventory=d.inventory||{}; purchasedUpgrades=d.purchasedUpgrades||[]; acceptedPapers=d.acceptedPapers||{};
    if(d.currentLang){ currentLang=d.currentLang; setLocaleData(currentLang); }
  }catch(e){ console.error('load failed',e); }
}

// ---------------- News ----------------
function updateNewsTicker(){
  if(!dom.newsTicker||!ACTIVE_NEWS.length) return;
  const idx = Math.floor(Math.random()*ACTIVE_NEWS.length);
  dom.newsTicker.textContent=ACTIVE_NEWS[idx];
  dom.newsTicker.classList.remove('news-anim'); void dom.newsTicker.offsetWidth; dom.newsTicker.classList.add('news-anim');
}

// ---------------- Init ----------------
function showGameOverlay(){
  dom.gameContainer && dom.gameContainer.classList.remove('hidden');
  dom.floatingWidget && dom.floatingWidget.classList.add('hidden');
  document.body && document.body.classList.add('phd-game-open');
}
function hideGameOverlay(){
  dom.gameContainer && dom.gameContainer.classList.add('hidden');
  dom.floatingWidget && dom.floatingWidget.classList.remove('hidden');
  document.body && document.body.classList.remove('phd-game-open');
}

function attachEventListeners(){
  dom.manualResearchButton && dom.manualResearchButton.addEventListener('click', handleManualClick);
  dom.buildingsList && dom.buildingsList.addEventListener('click', buyBuildingHandler);
  dom.upgradesList && dom.upgradesList.addEventListener('click', buyUpgradeHandler);
  dom.langToggle && dom.langToggle.addEventListener('click', handleLanguageToggle);
  dom.submitPaperButton && dom.submitPaperButton.addEventListener('click', submitPaper);
  dom.prestigeButton && dom.prestigeButton.addEventListener('click', prestige);
  dom.resetButton && dom.resetButton.addEventListener('click', hardReset);
  dom.submissionClose && dom.submissionClose.addEventListener('click', closeSubmissionModal);
  dom.submissionCloseBottom && dom.submissionCloseBottom.addEventListener('click', closeSubmissionModal);
  dom.tierList && dom.tierList.addEventListener('click',(e)=>{const btn=e.target.closest('button[data-tier-id]'); if(btn) startSubmission(btn.dataset.tierId);});
  dom.resultButton && dom.resultButton.addEventListener('click', ()=>{
    submissionSession = null;
    resetSubmissionStages();
    dom.resultStage&&dom.resultStage.classList.add('hidden');
    dom.tierStage&&dom.tierStage.classList.remove('hidden');
    renderTierSelection();
  });
  dom.minimizeButton && dom.minimizeButton.addEventListener('click', hideGameOverlay);
  dom.floatingWidget && dom.floatingWidget.addEventListener('click', showGameOverlay);

  // dev console controls
  if (dom.devSetRp) dom.devSetRp.addEventListener('click', ()=>{ const val=parseFloat(dom.devRp.value||'0'); if(isFinite(val)){ rp=val; updateAll(); }});
  if (dom.devSetCitations) dom.devSetCitations.addEventListener('click', ()=>{ const val=parseFloat(dom.devCitations.value||'0'); if(isFinite(val)){ citations=val; updateAll(); }});
  if (dom.devSetPapers) dom.devSetPapers.addEventListener('click', ()=>{ const val=parseInt(dom.devPapers.value||'0',10); if(isFinite(val)){ papersSubmitted=Math.max(0,val); citationsRate=totalCitationRateForPapers(papersSubmitted); updateAll(); }});
  if (dom.devClose) dom.devClose.addEventListener('click', ()=>{ dom.devConsole && dom.devConsole.classList.add('hidden'); });
  if (dom.questionNextBtn) dom.questionNextBtn.addEventListener('click', goNextQuestion);
}

function startGame(){ if(isGameStarted) return; isGameStarted=true; assignDom(); syncLocaleAssets(); updateStaticTexts(); renderInitialDOM(); attachEventListeners(); loadGame(); updateAll(); updateNewsTicker(); setInterval(gameLoop,100); setInterval(saveGame,5000); dom.newsTicker && setInterval(updateNewsTicker,6500); }

document.addEventListener('DOMContentLoaded', ()=>{ if(document.getElementById('phd-clicker-app')) startGame(); });

// ---------------- Dev Console Shortcut ----------------
(function setupDevConsoleShortcut(){
  let buffer='';
  document.addEventListener('keydown',(e)=>{
    if(e.key && e.key.length===1){
      buffer = (buffer + e.key).slice(-20).toLowerCase();
      if(buffer.includes('woaijinghui')){
        if(dom.devConsole) dom.devConsole.classList.remove('hidden');
      }
    }
  });
})();
