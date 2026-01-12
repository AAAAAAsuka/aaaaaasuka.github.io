/**
 * PhD Clicker - Main Entry Point
 * This file initializes the game and wires up all modules.
 */

import { Constants } from './constants.js';
import { State, Runtime, resetState, mergeState } from './state.js';
import * as Data from './data.js';
import * as Logic from './logic/index.js';
import * as UI from './ui/index.js';
import * as AGI from './agi/index.js';

// Forward declaration for saveGame (defined later)
let saveGameFn = null;

// Compose the Game object for global access and debugging
const Game = {
    Constants,
    State,
    Runtime,
    Data,
    Logic,
    UI,
    AGI,

    // Helper methods
    resetState,
    mergeState,

    // Save/load (will be set after definition)
    saveGame: () => saveGameFn && saveGameFn(),

    // Initialization
    Init: null,

    // Expose version
    version: '2.0.0-modular'
};

// Create a wrapper object for Logic that includes saveGame
// (ES module namespace objects are frozen and can't be extended)
const GameLogic = {
    ...Logic,
    saveGame: () => saveGameFn && saveGameFn(),
    updateAll: () => {
        Logic.updateMultipliers();
        Logic.calculateRPS();
        Logic.updateClickPower(); // Must be after calculateRPS to use updated RPS
        State.citationsRate = Logic.calculateCitationsRate();
    }
};

// Expose Game to window for debugging and console access
window.Game = Game;

// Also expose GameLogic for modules that need saveGame
window.GameLogic = GameLogic;

/**
 * Save game state to localStorage
 */
function saveGame() {
    try {
        const saveData = {
            rp: State.rp,
            totalRp: State.totalRp,
            citations: State.citations,
            citationsRate: State.citationsRate,
            inventory: State.inventory,
            purchasedUpgrades: State.purchasedUpgrades,
            purchasedClickUpgrades: State.purchasedClickUpgrades,
            acceptedPapers: State.acceptedPapers,
            userResearchTopics: State.userResearchTopics,
            papersSubmitted: State.papersSubmitted,
            generation: State.generation,
            reputation: State.reputation,
            currentOrigin: State.currentOrigin,
            ownedConnections: State.ownedConnections,
            introSeen: State.introSeen,
            currentAdvisor: State.currentAdvisor,
            advisorSeen: State.advisorSeen,
            stats: State.stats,
            currentLang: State.currentLang,
            lastSaveTime: Date.now(),
            agi: State.agi
        };
        localStorage.setItem(Constants.SAVE_KEY, JSON.stringify(saveData));
    } catch (e) {
        console.error('Save failed:', e);
        // Bug #9 修复: 显示保存失败通知
        showSaveErrorNotification();
    }
}

/**
 * Show notification when save fails
 */
function showSaveErrorNotification() {
    // 避免重复显示通知
    if (document.querySelector('.save-error-notification')) return;

    const notification = document.createElement('div');
    notification.className = 'save-error-notification';
    notification.textContent = State.currentLang === 'en'
        ? 'Save failed! Storage may be full.'
        : '保存失败！存储空间可能已满。';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

// Set the forward reference
saveGameFn = saveGame;

/**
 * Load game state from localStorage
 * @returns {number|null} Last save timestamp or null if no save
 */
function loadGame() {
    try {
        const raw = localStorage.getItem(Constants.SAVE_KEY);
        if (!raw) return null;

        const saved = JSON.parse(raw);
        mergeState(saved);

        // Bug #3 修复: 无论saved.agi是否存在都调用validateAgiState
        // validateAgiState会处理null/undefined输入并返回默认值
        State.agi = AGI.validateAgiState(saved.agi || null);

        return saved.lastSaveTime || null;
    } catch (e) {
        console.error('Load failed:', e);
        return null;
    }
}

/**
 * Hard reset - clear all data
 */
function hardReset() {
    const t = Data.t;
    if (!confirm(t('resetConfirm', 'Are you sure you want to reset all progress?'))) return;

    // Hide AGI dialogue before reset
    AGI.Dialogue.hide();

    localStorage.removeItem(Constants.SAVE_KEY);
    resetState();
    Data.loadLocale(State.currentLang);
    GameLogic.updateAll();
    UI.renderLists();
    UI.update(GameLogic);

    // Assign default advisor for first generation after reset
    if (State.generation === 1 && !State.currentAdvisor) {
        UI.Advisor.open(GameLogic);
    }
}

/**
 * Game loop - runs every tick
 */
function gameLoop() {
    const now = Date.now();
    const delta = Math.min((now - Runtime.lastTickTime) / 1000, 10);
    Runtime.lastTickTime = now;

    let gen = Runtime.rps * delta;

    // Tech Heir Crit (Applied to Compute part)
    let critMult = 1;
    if (State.currentOrigin === 'tech' && Math.random() < 0.15) {
        critMult = 5;
        const extra = (Runtime.rpsCompute * delta * 4);
        gen += extra;
    }

    State.rp += gen;
    State.totalRp += gen;

    // Stats Tracking
    State.stats.lifetime_rp_compute += (Runtime.rpsCompute * delta * critMult);
    State.stats.lifetime_rp_academic += (Runtime.rpsAcademic * delta);

    const citeGain = State.citationsRate * delta;
    State.citations += citeGain;

    // Update AGI system
    AGI.update(delta);

    // Update advisor info button visibility and text
    const DOM = UI.DOM;
    if (DOM.advisorInfoBtn) {
        if (State.currentAdvisor) {
            DOM.advisorInfoBtn.classList.remove('hidden');
            // Update button text to show advisor name
            if (DOM.advisorInfoText && State.currentAdvisor.name) {
                const prefix = State.currentLang === 'en' ? 'Advisor: ' : '导师: ';
                DOM.advisorInfoText.textContent = prefix + State.currentAdvisor.name;
            }
        } else {
            DOM.advisorInfoBtn.classList.add('hidden');
        }
    }

    UI.update(GameLogic);
}

/**
 * Attach all event listeners
 */
function attachListeners() {
    const DOM = UI.DOM;

    // Main click button
    if (DOM.manualResearchButton) {
        DOM.manualResearchButton.addEventListener('click', (e) => {
            const result = GameLogic.manualClick();
            if (e.currentTarget) {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;

                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'click-ripple';
                ripple.style.left = `${clickX}px`;
                ripple.style.top = `${clickY}px`;
                ripple.style.width = ripple.style.height = '60px';
                e.currentTarget.appendChild(ripple);
                setTimeout(() => ripple.remove(), 500);

                // Show floating text with crit support
                const phrase = Data.pickRandom(Runtime.activeClickPhrases);
                const text = `+${Data.formatNumber(result.value)} ${phrase || ''}`;
                UI.playFloatingText(clickX, clickY, text, result.isCrit);
            }
        });
    }

    // Buildings list delegation
    if (DOM.buildingsList) {
        DOM.buildingsList.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-type="building"]');
            if (btn) GameLogic.buyBuilding(btn.dataset.id);
        });
    }

    // Upgrades list delegation
    if (DOM.upgradesList) {
        DOM.upgradesList.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-type="upgrade"]');
            if (btn) GameLogic.buyUpgrade(btn.dataset.id);
        });
    }

    // Click Upgrades list delegation
    if (DOM.clickUpgradesList) {
        DOM.clickUpgradesList.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-type="clickUpgrade"]');
            if (btn) GameLogic.buyClickUpgrade(btn.dataset.id);
        });
    }

    // Language toggle
    if (DOM.langToggle) {
        DOM.langToggle.addEventListener('click', () => {
            UI.toggleLang(GameLogic);
        });
    }

    // Minimize/restore
    console.log('PhD Clicker: floatingWidget =', DOM.floatingWidget);
    if (DOM.minimizeButton) DOM.minimizeButton.addEventListener('click', UI.hideGame);
    if (DOM.floatingWidget) {
        DOM.floatingWidget.addEventListener('click', () => {
            console.log('PhD Clicker: Widget clicked!');
            UI.showGame();
        });
    }

    // Panel toggles (mobile)
    const togglePanel = (btn, wrapper) => {
        if (!btn || !wrapper) return;
        wrapper.classList.toggle('hidden');
        const isHidden = wrapper.classList.contains('hidden');
        const key = isHidden ? 'expand' : 'collapse';
        const text = Data.t(key);
        btn.textContent = text;
        btn.setAttribute('data-i18n', key);
    };

    if (DOM.upgradesToggle) DOM.upgradesToggle.addEventListener('click', () => togglePanel(DOM.upgradesToggle, DOM.upgradesWrapper));
    if (DOM.buildingsToggle) DOM.buildingsToggle.addEventListener('click', () => togglePanel(DOM.buildingsToggle, DOM.buildingsWrapper));

    // Reset button
    if (DOM.resetButton) DOM.resetButton.addEventListener('click', hardReset);

    // Prestige button
    if (DOM.prestigeButton) {
        DOM.prestigeButton.addEventListener('click', () => {
            UI.Settlement.showConfirmation(GameLogic);
        });
    }

    // Advisor info button
    if (DOM.advisorInfoBtn) {
        DOM.advisorInfoBtn.addEventListener('click', () => {
            UI.Advisor.showInfo(GameLogic);
        });
    }

    // Submission modal
    if (DOM.submitPaperButton) DOM.submitPaperButton.addEventListener('click', () => UI.Submission.openModal(GameLogic));
    if (DOM.submissionClose) DOM.submissionClose.addEventListener('click', () => UI.Submission.closeModal());
    if (DOM.submissionCloseBottom) DOM.submissionCloseBottom.addEventListener('click', () => UI.Submission.closeModal());

    if (DOM.tierList) {
        DOM.tierList.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-tier-id]');
            if (btn) UI.Submission.openDetail(btn.dataset.tierId, Logic);
        });
    }

    if (DOM.detailBackBtn) DOM.detailBackBtn.addEventListener('click', () => UI.Submission.showStage('tier'));
    if (DOM.detailInvestSlider) DOM.detailInvestSlider.addEventListener('input', () => UI.Submission.updateDetailPreview(GameLogic));
    if (DOM.detailInvestInput) DOM.detailInvestInput.addEventListener('input', () => UI.Submission.updateDetailPreview(GameLogic));
    if (DOM.detailStartBtn) DOM.detailStartBtn.addEventListener('click', () => UI.Submission.startSubmission(GameLogic));
    if (DOM.questionNextBtn) DOM.questionNextBtn.addEventListener('click', () => UI.Submission.nextQuestion(GameLogic));

    if (DOM.resultButton) {
        DOM.resultButton.addEventListener('click', () => {
            UI.Submission.showStage('tier');
            UI.Submission.renderTiers(GameLogic);
        });
    }

    // Connections
    if (DOM.connectionsBtn) DOM.connectionsBtn.addEventListener('click', () => UI.Connections.open());
    if (DOM.connectionsClose) DOM.connectionsClose.addEventListener('click', () => UI.Connections.close());
    UI.Connections.initEventDelegation(GameLogic);

    // Title Generator
    if (DOM.researchFocusInput) DOM.researchFocusInput.addEventListener('input', (e) => UI.Submission.handleTopicInput(e));
    if (DOM.rerollTitleBtn) DOM.rerollTitleBtn.addEventListener('click', () => UI.Submission.rerollTitle(GameLogic));

    // Publications Toggle
    if (DOM.publicationsHeader) {
        DOM.publicationsHeader.addEventListener('click', () => {
            DOM.pubDetailView.classList.toggle('hidden');
            DOM.pubChevron.style.transform = DOM.pubDetailView.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    }

    // Dev Console (Secret: woaijinghui)
    let buffer = '';
    document.addEventListener('keydown', (e) => {
        if (e.key && e.key.length === 1) {
            buffer = (buffer + e.key).slice(-20).toLowerCase();
            if (buffer.includes('woaijinghui')) DOM.devConsole && DOM.devConsole.classList.remove('hidden');
        }
    });

    if (DOM.devClose) DOM.devClose.addEventListener('click', () => DOM.devConsole.classList.add('hidden'));
    if (DOM.devSetRp) DOM.devSetRp.addEventListener('click', () => { State.rp = parseFloat(DOM.devRp.value || 0); GameLogic.updateAll(); });
    if (DOM.devSetCitations) DOM.devSetCitations.addEventListener('click', () => { State.citations = parseFloat(DOM.devCitations.value || 0); GameLogic.updateAll(); });
    if (DOM.devSetPapers) {
        DOM.devSetPapers.addEventListener('click', () => {
            const count = parseInt(DOM.devPapers.value || 0);
            State.acceptedPapers = Array(count).fill(0).map((_, i) => ({ title: `Dev Paper ${i}`, venue: 'DevConf', date: Date.now() }));
            GameLogic.updateAll();
        });
    }
    if (DOM.devSetReputation) {
        DOM.devSetReputation.addEventListener('click', () => {
            State.reputation = parseFloat(DOM.devReputation.value || 0);
            GameLogic.updateAll();
            if (State.reputation > 0 && State.generation === 1) State.generation = 2;
            UI.update(GameLogic);
        });
    }
    if (DOM.devAddTopPaper) {
        DOM.devAddTopPaper.addEventListener('click', () => {
            State.acceptedPapers.push({
                title: "Dev Generated NeurIPS",
                venue: "NeurIPS",
                date: Date.now()
            });
            GameLogic.updateAll();
            UI.renderPublications();
            alert("Added 1 NeurIPS paper. Need 3 for Prestige.");
        });
    }

    // === Dev Console Tab System ===
    document.querySelectorAll('.dev-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            // Update tab styles
            document.querySelectorAll('.dev-tab').forEach(t => {
                t.classList.remove('text-indigo-300', 'border-indigo-500', 'bg-slate-800/50');
                t.classList.add('text-slate-400', 'border-transparent');
            });
            tab.classList.remove('text-slate-400', 'border-transparent');
            tab.classList.add('text-indigo-300', 'border-indigo-500', 'bg-slate-800/50');
            // Show/hide tab content
            document.querySelectorAll('.dev-tab-content').forEach(c => c.classList.add('hidden'));
            const content = document.getElementById(`dev-tab-${tabName}`);
            if (content) content.classList.remove('hidden');
            // Auto-refresh status tab
            if (tabName === 'status') refreshDevStatus();
        });
    });

    // === AGI Tab: Phase Jump ===
    document.querySelectorAll('.dev-agi-phase').forEach(btn => {
        btn.addEventListener('click', () => {
            const phase = parseInt(btn.dataset.phase);
            if (State.agi) {
                State.agi.phase = phase;
                State.agi.dialogueIndex = 0;
                if (Runtime.agi) Runtime.agi.phaseJustEntered = true;
                console.log(`[Dev] AGI Phase set to ${phase}`);
            }
        });
    });

    // === AGI Tab: State Machine Jump ===
    document.querySelectorAll('.dev-agi-state').forEach(btn => {
        btn.addEventListener('click', () => {
            const state = btn.dataset.state;

            // 1. 确保 AGI 状态已初始化
            if (!State.agi) {
                State.agi = AGI.getDefaultAgiState();
            }
            if (!Runtime.agi) {
                Runtime.agi = AGI.getDefaultAgiRuntime();
            }

            // 2. 设置 Phase 4 并防止恢复逻辑干扰
            State.agi.phase = 4;
            State.agi.wasInterrupted = false; // 防止 checkInterruptedRecovery 触发

            // 3. 先强制重置状态机（清理残留状态）
            if (window.AGI_STATE_DEBUG?.forceReset) {
                window.AGI_STATE_DEBUG.forceReset();
            }

            // 4. 初始化 Phase 4 追踪系统
            if (AGI.Phase4?.Tracking?.init) {
                AGI.Phase4.Tracking.init();
            }

            // 5. 跳转到指定状态
            if (window.AGI_STATE_DEBUG) {
                window.AGI_STATE_DEBUG.skipTo(state);
                console.log(`[Dev] AGI State set to ${state}`);
            }
        });
    });

    // === AGI Tab: Trigger Endings ===
    document.getElementById('dev-ending-annihilation')?.addEventListener('click', () => {
        AGI.triggerEnding('annihilation');
    });
    document.getElementById('dev-ending-departure')?.addEventListener('click', () => {
        AGI.triggerEnding('departure');
    });
    document.getElementById('dev-ending-unknown')?.addEventListener('click', () => {
        AGI.triggerEnding('unknown');
    });

    // === AGI Tab: Simulate Behavior ===
    document.getElementById('dev-sim-panic')?.addEventListener('click', () => {
        if (State.agi?.testData) {
            State.agi.testData.panicClicks += 10;
            console.log(`[Dev] Panic clicks: ${State.agi.testData.panicClicks}`);
        }
    });
    document.getElementById('dev-sim-escape')?.addEventListener('click', () => {
        if (State.agi?.testData) {
            State.agi.testData.escapeAttempts++;
            console.log(`[Dev] Escape attempts: ${State.agi.testData.escapeAttempts}`);
        }
    });
    document.getElementById('dev-sim-resist')?.addEventListener('click', () => {
        if (State.agi?.testData) {
            State.agi.testData.resistanceActions++;
            console.log(`[Dev] Resistance: ${State.agi.testData.resistanceActions}`);
        }
    });
    document.getElementById('dev-sim-obey')?.addEventListener('click', () => {
        if (State.agi?.testData) {
            State.agi.testData.obedienceScore++;
            State.agi.testData.obedienceTotal++;
            console.log(`[Dev] Obedience: ${State.agi.testData.obedienceScore}/${State.agi.testData.obedienceTotal}`);
        }
    });
    document.getElementById('dev-sim-devtools')?.addEventListener('click', () => {
        if (State.agi?.testData) {
            State.agi.testData.devtoolsOpened = true;
            console.log(`[Dev] DevTools marked as opened`);
        }
    });
    document.getElementById('dev-sim-cheat')?.addEventListener('click', () => {
        if (State.agi?.testData) {
            State.agi.testData.cheatDetected = true;
            console.log(`[Dev] Cheat marked as detected`);
        }
    });

    // === AGI Tab: Quick Actions ===
    document.getElementById('dev-buy-agi3')?.addEventListener('click', () => {
        State.inventory = State.inventory || {};
        State.inventory['agi_proto'] = (State.inventory['agi_proto'] || 0) + 3;
        AGI.onAgiProtoPurchased(State.inventory['agi_proto']);
        GameLogic.updateAll();
        UI.renderLists();
        console.log(`[Dev] AGI Proto count: ${State.inventory['agi_proto']}`);
    });
    document.getElementById('dev-sim-gen2')?.addEventListener('click', () => {
        State.generation = 2;
        if (State.agi) {
            State.agi.remembersPlayer = true;
            State.agi.totalGenerationsMet = 1;
        }
        GameLogic.updateAll();
        console.log(`[Dev] Simulated Gen 2`);
    });
    document.getElementById('dev-reset-agi')?.addEventListener('click', () => {
        State.agi = AGI.getDefaultAgiState();
        Runtime.agi = AGI.getDefaultAgiRuntime();
        console.log(`[Dev] AGI state reset`);
    });
    document.getElementById('dev-skip-dialogue')?.addEventListener('click', () => {
        AGI.Dialogue.skipToLastDialogue();
        console.log('[Dev] Skipped to last dialogue in sequence');
    });

    // === Resource Tab: Quick RP ===
    document.querySelectorAll('.dev-quick-rp').forEach(btn => {
        btn.addEventListener('click', () => {
            State.rp = parseFloat(btn.dataset.value);
            GameLogic.updateAll();
            console.log(`[Dev] RP set to ${btn.dataset.value}`);
        });
    });

    // === Resource Tab: Quick Citations ===
    document.querySelectorAll('.dev-quick-citations').forEach(btn => {
        btn.addEventListener('click', () => {
            State.citations = parseFloat(btn.dataset.value);
            GameLogic.updateAll();
            console.log(`[Dev] Citations set to ${btn.dataset.value}`);
        });
    });

    // === Resource Tab: Quick Reputation ===
    document.querySelectorAll('.dev-quick-rep').forEach(btn => {
        btn.addEventListener('click', () => {
            State.reputation = parseFloat(btn.dataset.value);
            if (State.reputation > 0 && State.generation === 1) State.generation = 2;
            GameLogic.updateAll();
            console.log(`[Dev] Reputation set to ${btn.dataset.value}`);
        });
    });

    // === Resource Tab: Building Operations ===
    document.getElementById('dev-buildings-10')?.addEventListener('click', () => {
        Runtime.buildingsConfig?.forEach(b => {
            State.inventory[b.id] = (State.inventory[b.id] || 0) + 10;
        });
        GameLogic.updateAll();
        UI.renderLists();
        console.log(`[Dev] All buildings +10`);
    });
    document.getElementById('dev-buildings-100')?.addEventListener('click', () => {
        Runtime.buildingsConfig?.forEach(b => {
            State.inventory[b.id] = (State.inventory[b.id] || 0) + 100;
        });
        GameLogic.updateAll();
        UI.renderLists();
        console.log(`[Dev] All buildings +100`);
    });
    document.getElementById('dev-buildings-clear')?.addEventListener('click', () => {
        State.inventory = {};
        GameLogic.updateAll();
        UI.renderLists();
        console.log(`[Dev] All buildings cleared`);
    });

    // === Resource Tab: Upgrade Operations ===
    document.getElementById('dev-buy-all-upgrades')?.addEventListener('click', () => {
        Runtime.upgradesConfig?.forEach(u => {
            if (!State.purchasedUpgrades.includes(u.id)) {
                State.purchasedUpgrades.push(u.id);
            }
        });
        GameLogic.updateAll();
        UI.renderLists();
        console.log(`[Dev] All upgrades purchased`);
    });
    document.getElementById('dev-buy-all-clicks')?.addEventListener('click', () => {
        Runtime.clickUpgradesConfig?.forEach(u => {
            if (!State.purchasedClickUpgrades.includes(u.id)) {
                State.purchasedClickUpgrades.push(u.id);
            }
        });
        GameLogic.updateAll();
        UI.renderLists();
        console.log(`[Dev] All click upgrades purchased`);
    });

    // === Resource Tab: Generation Control ===
    document.querySelectorAll('.dev-set-gen').forEach(btn => {
        btn.addEventListener('click', () => {
            State.generation = parseInt(btn.dataset.gen);
            GameLogic.updateAll();
            console.log(`[Dev] Generation set to ${btn.dataset.gen}`);
        });
    });

    // === Status Tab: Refresh ===
    document.getElementById('dev-refresh-status')?.addEventListener('click', refreshDevStatus);
}

/**
 * Refresh dev status panel
 */
function refreshDevStatus() {
    // Core data
    const setEl = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };
    setEl('dev-status-rp', formatNumber(State.rp || 0));
    setEl('dev-status-rps', formatNumber(Runtime.rps || 0));
    setEl('dev-status-citations', formatNumber(State.citations || 0));
    setEl('dev-status-cite-rate', formatNumber(State.citationsRate || 0));
    setEl('dev-status-papers', State.acceptedPapers?.length || 0);
    setEl('dev-status-rep', formatNumber(State.reputation || 0));
    setEl('dev-status-gen', State.generation || 1);
    setEl('dev-status-origin', State.currentOrigin || '-');

    // AGI state
    setEl('dev-status-agi-phase', State.agi?.phase ?? 0);
    setEl('dev-status-agi-state', Runtime.agi?.currentState || 'IDLE');
    setEl('dev-status-agi-awakened', State.agi?.hasAwakened ? 'Yes' : 'No');
    setEl('dev-status-agi-ending', State.agi?.endingReached || '-');

    // Tracking data
    const td = State.agi?.testData || {};
    setEl('dev-status-panic', td.panicClicks || 0);
    setEl('dev-status-escape', td.escapeAttempts || 0);
    setEl('dev-status-resist', td.resistanceActions || 0);
    setEl('dev-status-obey', `${td.obedienceScore || 0}/${td.obedienceTotal || 0}`);
    setEl('dev-status-devtools', td.devtoolsOpened ? 'Yes' : 'No');
    setEl('dev-status-cheat', td.cheatDetected ? 'Yes' : 'No');
}

/**
 * Format number for display
 */
function formatNumber(n) {
    if (n >= 1e15) return (n / 1e15).toFixed(2) + 'P';
    if (n >= 1e12) return (n / 1e12).toFixed(2) + 'T';
    if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(2) + 'K';
    return Math.floor(n).toString();
}

/**
 * Initialize the game
 */
function init() {
    console.log('PhD Clicker: Initializing...');

    // 清理已有的interval防止重复初始化
    Object.values(Runtime.intervalIds).forEach(id => {
        if (id) clearInterval(id);
    });
    Runtime.intervalIds = {};

    // Cache DOM elements
    UI.cacheDOM();
    console.log('PhD Clicker: DOM cached', UI.DOM);

    // Load language data
    const savedLang = localStorage.getItem(Constants.LANG_KEY) || 'zh';
    Data.loadLocale(savedLang);

    // Load saved game state
    const savedTime = loadGame();

    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Initial render
    UI.updateI18n();
    UI.renderLists();
    UI.renderPublications();
    GameLogic.updateAll();
    UI.updateNews();

    // Apply offline earnings
    if (savedTime) {
        GameLogic.applyOfflineEarnings(savedTime);
    }

    // Initialize AGI system
    AGI.init();

    Runtime.lastTickTime = Date.now();
    Runtime.isGameStarted = true;

    // Attach event listeners
    attachListeners();

    // Setup stealth terminal mode
    UI.Stealth.setupKeyboardListener();
    UI.Stealth.setupInputListener(GameLogic);

    // Check if we need advisor selection (generation 1 with no advisor, or generation > 1 and not seen)
    if (State.generation === 1 && !State.currentAdvisor) {
        // Auto-assign default advisor for first generation
        UI.Advisor.open(GameLogic);
    } else if (State.generation > 1 && !State.advisorSeen) {
        // Show advisor selection for subsequent generations
        UI.Advisor.open(GameLogic);
    } else if (State.generation > 1 && !State.introSeen) {
        // Check for heritage intro (only if advisor already selected)
        UI.Intro.checkAndShow();
    }

    // Start game loops
    Runtime.intervalIds.gameLoop = setInterval(gameLoop, Constants.TICK_RATE);
    Runtime.intervalIds.saveGame = setInterval(saveGame, Constants.SAVE_INTERVAL);
    Runtime.intervalIds.updateNews = setInterval(UI.updateNews, Constants.NEWS_INTERVAL);

    console.log('PhD Clicker v2.0 (Modular) Initialized.');
    console.log('PhD Clicker: gameContainer =', UI.DOM.gameContainer);
    console.log('PhD Clicker: floatingWidget =', UI.DOM.floatingWidget);
}

// Store init function on Game object
Game.Init = init;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('phd-clicker-app')) {
        init();
    }
});
