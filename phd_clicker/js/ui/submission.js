/**
 * Submission Modal UI Module
 * Handles the paper submission flow including tier selection,
 * investment, rebuttal questions, and result display.
 * Extracted from Game.UI.Submission in game.js
 */

import { DOM } from './dom.js';
import { State, Runtime } from '../state.js';
import { renderPublications } from './render.js';
import { t, formatNumber, formatTemplate, pickRandom } from '../data.js';

/**
 * Pending submission data (tier, baseCost, invested).
 */
let pending = null;

/**
 * Result typing animation timer.
 */
let resultTypingTimer = null;

/**
 * Show a specific stage of the submission flow.
 * @param {string} stageName - 'tier', 'detail', 'question', or 'result'
 */
export function showStage(stageName) {
    ['tierStage', 'tierDetailView', 'questionStage', 'resultStage', 'resultSettlement'].forEach(k => {
        if (DOM[k]) DOM[k].classList.add('hidden');
    });

    if (stageName === 'tier' && DOM.tierStage) DOM.tierStage.classList.remove('hidden');
    if (stageName === 'detail' && DOM.tierDetailView) DOM.tierDetailView.classList.remove('hidden');
    if (stageName === 'question' && DOM.questionStage) DOM.questionStage.classList.remove('hidden');
    if (stageName === 'result' && DOM.resultStage) DOM.resultStage.classList.remove('hidden');
}

/**
 * Render the tier selection list.
 * @param {Object} Logic - Logic module for cost calculations
 */
export function renderTiers(Logic) {
    const list = DOM.tierList;
    if (!list) return;
    list.innerHTML = '';

    (Runtime.submissionConfig.tiers || []).forEach(tier => {
        const cost = Logic.Submission.getCurrentBaseCost(tier);
        const canAfford = State.rp >= cost;

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="rounded-xl border ${canAfford ? 'border-indigo-500/60 bg-slate-800/60' : 'border-slate-800 bg-slate-900/40'} p-4 shadow relative overflow-hidden transition-all hover:bg-slate-800/80">
          <div class="flex items-start justify-between gap-3 mb-2">
            <div>
              <div class="text-sm font-bold text-white">${tier.name}</div>
              <div class="text-xs text-slate-400 leading-snug">${tier.description || ''}</div>
            </div>
            <div class="text-right">
              <div class="text-xs text-slate-400" data-i18n="costLabel">${t('costLabel')}</div>
              <div class="text-sm font-mono font-semibold ${canAfford ? 'text-indigo-200' : 'text-slate-500'}">${formatNumber(cost)} RP</div>
            </div>
          </div>
          <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>${Math.round(tier.baseRate * 100)}% -> ${Math.round(tier.maxBaseChance * 100)}%</span>
            <span>+/-${Math.round(tier.rebuttalSwing * 100)}%</span>
          </div>
          <button data-tier-id="${tier.id}" class="w-full mt-1 py-2 rounded-lg text-sm font-bold border transition-colors ${canAfford ? 'border-indigo-500 text-indigo-100 bg-indigo-900/40 hover:bg-indigo-800/60' : 'border-slate-800 text-slate-500 bg-slate-800/40 cursor-not-allowed'}" ${canAfford ? '' : 'disabled'}>${t('submitVenue')}</button>
        </div>`;
        list.appendChild(div.firstElementChild);
    });
}

/**
 * Open the detail view for a specific tier.
 * @param {string} tierId - The tier ID to open
 * @param {Object} Logic - Logic module for cost calculations
 */
export function openDetail(tierId, Logic) {
    const tier = (Runtime.submissionConfig.tiers || []).find(t => t.id === tierId);
    if (!tier) return;

    const baseCost = Logic.Submission.getCurrentBaseCost(tier);
    if (State.rp < baseCost) return;

    pending = { tier, baseCost, invested: 0 };

    if (DOM.detailTitle) DOM.detailTitle.textContent = tier.name;
    if (DOM.detailBaseCost) DOM.detailBaseCost.textContent = `${formatNumber(baseCost)} RP`;
    if (DOM.detailWarning) DOM.detailWarning.classList.toggle('hidden', tier.rebuttalSwing < 0.15);

    // Setup Slider
    // Limit max investment to effective max (where 95% of bonus is achieved)
    // Formula: bonus = (max - base) * (invested / (invested + K))
    // At invested = 19*K, bonus reaches 95% of maximum
    const K = Logic.Submission.getCurrentK(tier);
    const effectiveMax = Math.floor(19 * K); // 95% of max bonus
    const availableRP = Math.floor(State.rp - baseCost);
    const maxInvest = Math.min(availableRP, effectiveMax);

    if (DOM.detailInvestSlider) {
        DOM.detailInvestSlider.max = maxInvest;
        DOM.detailInvestSlider.value = 0;
    }
    if (DOM.detailInvestInput) DOM.detailInvestInput.value = 0;
    if (DOM.detailMaxInvest) DOM.detailMaxInvest.textContent = formatTemplate('{max}', { max: formatNumber(maxInvest) });

    updateDetailPreview(Logic);
    showStage('detail');
}

/**
 * Update the detail preview with current investment values.
 * @param {Object} Logic - Logic module for chance calculations
 */
export function updateDetailPreview(Logic) {
    if (!pending) return;

    if (!DOM.detailInvestSlider || !DOM.detailInvestInput) return;

    let val = parseInt(DOM.detailInvestSlider.value) || 0;
    if (document.activeElement === DOM.detailInvestInput) {
        val = parseInt(DOM.detailInvestInput.value) || 0;
    }

    // Use same effective max calculation as openDetail
    const K = Logic.Submission.getCurrentK(pending.tier);
    const effectiveMax = Math.floor(19 * K);
    const availableRP = Math.floor(State.rp - pending.baseCost);
    const max = Math.min(availableRP, effectiveMax);

    if (val > max) val = max;
    if (val < 0) val = 0;

    pending.invested = val;

    if (DOM.detailInvestSlider.value != val) DOM.detailInvestSlider.value = val;
    if (DOM.detailInvestInput.value != val && document.activeElement !== DOM.detailInvestInput) {
        DOM.detailInvestInput.value = val;
    }

    const chance = Logic.Submission.calculateChance(pending.tier, val);
    const bonus = chance - pending.tier.baseRate;

    if (DOM.detailTotalChance) DOM.detailTotalChance.textContent = `${(chance * 100).toFixed(1)}%`;
    if (DOM.detailChanceBar) DOM.detailChanceBar.style.width = `${chance * 100}%`;
    if (DOM.detailChanceBreakdown) {
        DOM.detailChanceBreakdown.textContent = formatTemplate(t('detailBaseChanceBreakdown'), {
            base: Math.round(pending.tier.baseRate * 100),
            bonus: (bonus * 100).toFixed(1)
        });
    }
}

/**
 * Start the submission process (deduct cost, generate questions).
 * @param {Object} Logic - Logic module for calculations and state updates
 */
export function startSubmission(Logic) {
    if (!pending) return;
    const totalCost = pending.baseCost + pending.invested;
    if (State.rp < totalCost) return;

    State.rp -= totalCost;
    Logic.updateAll();

    const initialChance = Logic.Submission.calculateChance(pending.tier, pending.invested);

    const qConfig = pending.tier.questionConfig;
    const pool = Runtime.submissionConfig.questionPool || {};
    const funny = (pool.funny || []).slice();
    const tech = (pool.technical || []).slice();

    const selectedQs = [];
    const pick = (arr, n) => {
        for (let i = 0; i < n && arr.length; i++) {
            const idx = Math.floor(Math.random() * arr.length);
            const q = arr.splice(idx, 1)[0];
            if (q) selectedQs.push(q);
        }
    };
    pick(funny, qConfig.funny);
    pick(tech, qConfig.tech);

    // Fill remaining
    let safeGuard = 0;
    while (selectedQs.length < qConfig.total && safeGuard < 100) {
        safeGuard++;
        const rem = [...funny, ...tech];
        if (!rem.length) break;
        pick(rem, 1);
    }

    if (selectedQs.length === 0) {
        console.error("No questions selected!");
        closeModal();
        return;
    }

    Runtime.submissionSession = {
        tier: pending.tier,
        questions: selectedQs,
        index: 0,
        correct: 0,
        currentChance: initialChance,
        initialChance: initialChance,
        answered: false,
        totalCost: totalCost  // Store for Linus connection refund
    };

    showQuestion(Logic);
}

/**
 * Show the current rebuttal question.
 * @param {Object} Logic - Logic module (unused but kept for consistency)
 */
export function showQuestion(Logic) {
    const session = Runtime.submissionSession;
    if (!session) return;

    showStage('question');

    const q = session.questions[session.index];
    if (!q) {
        console.error("Question data missing");
        finish(Logic);
        return;
    }

    if (DOM.questionTierLabel) DOM.questionTierLabel.textContent = `${session.tier.name} - Rebuttal`;
    if (DOM.questionProgress) DOM.questionProgress.textContent = `Q ${session.index + 1}/${session.questions.length}`;

    const displayChance = Math.max(0, Math.min(100, session.currentChance * 100));
    if (DOM.questionChance) DOM.questionChance.textContent = `${displayChance.toFixed(1)}%`;
    if (DOM.rebuttalGaugeFill) {
        DOM.rebuttalGaugeFill.style.width = `${displayChance}%`;
        DOM.rebuttalGaugeFill.className = 'absolute top-0 left-0 h-full transition-all duration-500 bg-emerald-500';
    }

    const revNum = q.reviewer || ((session.index % 3) + 1);
    if (DOM.questionReviewerName) DOM.questionReviewerName.textContent = t('questionReviewerName').replace('{num}', revNum);
    if (DOM.questionReviewerBadge) DOM.questionReviewerBadge.textContent = `#${revNum}`;
    if (DOM.questionText) DOM.questionText.textContent = q.q || q.question;

    if (DOM.optionsContainer) {
        DOM.optionsContainer.innerHTML = '';
        (q.options || []).forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'w-full text-left p-3 rounded-lg border border-slate-700 bg-slate-800/60 hover:border-indigo-400 hover:bg-slate-700 transition-colors text-sm text-slate-200';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleAnswer(idx, btn, Logic));
            DOM.optionsContainer.appendChild(btn);
        });
    }

    if (DOM.questionFeedback) DOM.questionFeedback.classList.add('hidden');
    if (DOM.questionNextBtn) DOM.questionNextBtn.classList.add('hidden');
    session.answered = false;
}

/**
 * Handle answer selection for a rebuttal question.
 * @param {number} idx - Selected answer index
 * @param {HTMLElement} btnElem - The clicked button element
 * @param {Object} Logic - Logic module for connection checks
 */
export function handleAnswer(idx, btnElem, Logic) {
    try {
        const session = Runtime.submissionSession;
        if (!session || session.answered) return;

        session.answered = true;
        const q = session.questions[session.index];
        const correctIdx = typeof q.correct === 'number' ? q.correct : q.correctIndex;
        const isCorrect = idx === correctIdx;

        if (isCorrect) session.correct++;

        const swing = session.tier.rebuttalSwing / Math.max(1, session.questions.length);
        if (isCorrect) {
            session.currentChance += swing;
        } else {
            // Connection: Jinghui Chen - Halve penalty
            const penalty = Logic.hasConnection('jinghui') ? (swing / 2) : swing;
            session.currentChance -= penalty;
        }

        // Connection: Jinghui Chen - Min chance 20%
        const minChance = Logic.hasConnection('jinghui') ? 0.20 : 0.01;
        session.currentChance = Math.min(0.99, Math.max(minChance, session.currentChance));

        // Visual Updates
        const displayChance = session.currentChance * 100;

        if (DOM.questionChance) DOM.questionChance.textContent = `${displayChance.toFixed(1)}%`;

        if (DOM.rebuttalGaugeFill) {
            DOM.rebuttalGaugeFill.style.width = `${displayChance}%`;
            DOM.rebuttalGaugeFill.className = `absolute top-0 left-0 h-full transition-all duration-500 ${isCorrect ? 'bg-emerald-400' : 'bg-rose-400'}`;
        }

        if (DOM.questionFeedback) {
            DOM.questionFeedback.textContent = isCorrect ? (q.comment || 'Correct!') : t('incorrectAnswer');
            DOM.questionFeedback.classList.remove('hidden', 'text-emerald-300', 'text-rose-300');
            DOM.questionFeedback.classList.add(isCorrect ? 'text-emerald-300' : 'text-rose-300');
        }

        if (DOM.optionsContainer) {
            const btns = DOM.optionsContainer.querySelectorAll('button');
            btns.forEach((b, i) => {
                b.disabled = true;
                if (i === correctIdx) b.classList.add('border-emerald-400', 'bg-emerald-900/40');
                else if (i === idx) b.classList.add('border-rose-400', 'bg-rose-900/40');
            });
        }

        if (DOM.questionNextBtn) {
            const isLast = session.index >= session.questions.length - 1;
            DOM.questionNextBtn.textContent = isLast ? t('resultButton', 'View Result') : t('questionNext', 'Next');
            DOM.questionNextBtn.classList.remove('hidden');
        }
    } catch (e) {
        console.error("Handle Answer Error", e);
    }
}

/**
 * Go to the next question or finish.
 * @param {Object} Logic - Logic module for finish handling
 */
export function nextQuestion(Logic) {
    const session = Runtime.submissionSession;
    if (!session) return;
    session.index++;
    if (session.index >= session.questions.length) {
        finish(Logic);
    } else {
        showQuestion(Logic);
    }
}

/**
 * Finish the submission and show result.
 * @param {Object} Logic - Logic module for state updates
 * @param {Function} renderPublicationsCallback - Callback to re-render publications
 */
export function finish(Logic, renderPublicationsCallback) {
    const session = Runtime.submissionSession;
    if (!session) return;

    const roll = Math.random();
    const accepted = roll < session.currentChance;
    const tier = session.tier;

    const rewards = {
        rp: 0,
        citations: 0
    };

    if (accepted) {
        State.rp += rewards.rp;
        State.citations += rewards.citations;
        State.papersSubmitted++;
        State.totalRp += rewards.rp;

        const target = pickRandom(tier.targets) || tier.name;
        const finalTitle = Runtime.lastGeneratedTitle || "Untitled Paper";

        State.acceptedPapers.push({
            title: finalTitle,
            venue: target,
            date: Date.now()
        });

        Logic.updateAll();
        renderPublications();

        // Show Result
        if (DOM.resultIcon) {
            DOM.resultIcon.textContent = 'A';
            DOM.resultIcon.className = 'w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/60';
        }
        if (DOM.resultTitle) DOM.resultTitle.textContent = t('resultAccept');
        if (DOM.resultDetail) DOM.resultDetail.textContent = formatTemplate(t('resultPaperAccepted'), { target });
        if (DOM.resultTier) DOM.resultTier.textContent = target;

        // Letter
        const letterText = formatTemplate(t('letterAcceptBody'), { target, title: finalTitle });
        typeLetter(letterText);

        if (DOM.resultFlavor) DOM.resultFlavor.textContent = pickRandom(Runtime.submissionConfig.flavorText.accepted);

    } else {
        // Connection: Linus Torvalds (Git Revert) - Refund 30% on rejection
        let refund = 0;
        if (Logic.hasConnection('linus') && session.totalCost) {
            refund = Math.floor(session.totalCost * 0.3);
            State.rp += refund;
        }

        const target = pickRandom(tier.targets) || tier.name;
        const finalTitle = Runtime.lastGeneratedTitle || "Untitled Paper";

        if (DOM.resultIcon) {
            DOM.resultIcon.textContent = 'R';
            DOM.resultIcon.className = 'w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-rose-500/20 text-rose-200 border border-rose-400/60';
        }
        if (DOM.resultTitle) DOM.resultTitle.textContent = t('resultReject');

        // Show refund info if Linus connection active
        let detailText = formatTemplate(t('resultPaperRejected'), { target });
        if (refund > 0) {
            detailText += ` (Git Revert: +${formatNumber(refund)} RP)`;
        }
        if (DOM.resultDetail) DOM.resultDetail.textContent = detailText;
        if (DOM.resultTier) DOM.resultTier.textContent = target;

        const letterText = formatTemplate(t('letterRejectBody'), { target, title: finalTitle });
        typeLetter(letterText);

        if (DOM.resultFlavor) DOM.resultFlavor.textContent = pickRandom(Runtime.submissionConfig.flavorText.rejected);
    }

    // Stats
    if (DOM.resultChance) DOM.resultChance.textContent = `${(session.currentChance * 100).toFixed(1)}%`;
    if (DOM.resultRoll) DOM.resultRoll.textContent = `${t('resultRollLabel')} ${roll.toFixed(2)}`;

    // Rewards HTML
    const counts = {};
    State.acceptedPapers.forEach(p => counts[p.venue] = (counts[p.venue] || 0) + 1);
    const accList = Object.entries(counts).map(([k, v]) => `[${k}: ${v}]`).join(' ');

    if (DOM.resultRewards) {
        DOM.resultRewards.innerHTML = `
            <div class="p-3 rounded-lg border border-slate-800 bg-slate-800/60 text-sm text-slate-200">${t('resultRpReward')}: ${formatNumber(rewards.rp)}</div>
            <div class="p-3 rounded-lg border border-slate-800 bg-slate-800/60 text-sm text-slate-200">${t('resultCitationReward')}: ${formatNumber(rewards.citations)}</div>
            <div class="p-3 rounded-lg border border-slate-800 bg-slate-800/60 text-sm text-slate-200 text-xs">
                ${formatTemplate(t('resultAnswerSummary'), {
                    correct: session.correct,
                    total: session.questions.length,
                    chance: Math.round(session.currentChance * 100),
                    base: Math.round(session.initialChance * 100)
                })}
            </div>
            <div class="p-3 rounded-lg border border-slate-800 bg-slate-800/60 text-sm text-slate-200 text-xs">${t('resultAcceptedList')}: ${accList}</div>
        `;
    }

    showStage('result');
}

/**
 * Typewriter effect for result letter.
 * @param {string} text - Text to type out
 */
export function typeLetter(text) {
    const el = DOM.resultLetterBody;
    if (!el) return;
    el.textContent = '';

    // Hide buttons initially
    if (DOM.resultSettlement) {
        DOM.resultSettlement.classList.add('hidden');
        DOM.resultSettlement.classList.remove('result-settlement-anim');
    }

    if (resultTypingTimer) clearInterval(resultTypingTimer);

    const chars = text.split('');
    let idx = 0;

    resultTypingTimer = setInterval(() => {
        if (idx >= chars.length) {
            clearInterval(resultTypingTimer);
            resultTypingTimer = null;

            // Show buttons after pause
            setTimeout(() => {
                if (DOM.resultSettlement) {
                    DOM.resultSettlement.classList.remove('hidden');
                    DOM.resultSettlement.classList.add('result-settlement-anim');
                }
            }, 600);
            return;
        }

        el.textContent += chars[idx];
        idx++;
    }, 30);
}

/**
 * Handle research topic input change.
 * @param {Event} e - Input event
 */
export function handleTopicInput(e) {
    const raw = e.target.value;
    State.userResearchTopics = raw.split(/[,]/).map(s => s.trim()).filter(s => s.length > 0);
}

/**
 * Reroll the generated paper title.
 * @param {Object} Logic - Logic module for title generation
 */
export function rerollTitle(Logic) {
    const title = Logic.generatePaperTitle();
    const el = DOM.generatedTitleDisplay;
    if (el) {
        el.textContent = `"${title}"`;
        el.classList.remove('animate-pulse');
        void el.offsetWidth;
        el.classList.add('animate-pulse');
    }
}

/**
 * Open the submission modal.
 * @param {Object} Logic - Logic module for initialization
 */
export function openModal(Logic) {
    Runtime.submissionSession = null;
    pending = null;

    // Title Gen Init
    if (DOM.researchFocusInput) {
        DOM.researchFocusInput.value = (State.userResearchTopics || []).join(', ');
    }
    rerollTitle(Logic);

    renderTiers(Logic);
    showStage('tier');
    if (DOM.submissionModal) DOM.submissionModal.classList.remove('hidden');
}

/**
 * Close the submission modal.
 */
export function closeModal() {
    if (DOM.submissionModal) DOM.submissionModal.classList.add('hidden');
    Runtime.submissionSession = null;
}

/**
 * Get the pending submission data.
 * @returns {Object|null} Pending submission or null
 */
export function getPending() {
    return pending;
}

/**
 * Set the pending submission data.
 * @param {Object} data - Pending submission data
 */
export function setPending(data) {
    pending = data;
}
