/**
 * Settlement (Prestige) UI Module
 * Handles the prestige flow including confirmation, transition animation,
 * and statistics display.
 * Extracted from Game.UI.Settlement in game.js
 */

import { DOM } from './dom.js';
import { State, Runtime } from '../state.js';
import { t, formatNumber } from '../data.js';
import { updateI18n, renderLists, renderPublications, updateNews } from './render.js';
import * as Advisor from './advisor.js';
import * as Submission from './submission.js';
import * as AGI from '../agi/index.js';
import * as AGIFarewell from '../agi/prestige/farewell.js';

/**
 * Show the prestige confirmation modal.
 * @param {Object} Logic - Logic module for reputation calculation
 */
export function showConfirmation(Logic) {
    // Force update UI strings
    updateI18n();

    const repGain = Logic.Prestige.calculateReputationGain();

    if (DOM.confirmGeneration) DOM.confirmGeneration.textContent = State.generation;
    if (DOM.confirmRepGain) DOM.confirmRepGain.textContent = `+${formatNumber(repGain)}`;

    // Bind events
    if (DOM.prestigeConfirmCancel) {
        DOM.prestigeConfirmCancel.onclick = () => {
            if (DOM.prestigeConfirmationModal) DOM.prestigeConfirmationModal.classList.add('hidden');
        };
    }

    if (DOM.prestigeConfirmAccept) {
        DOM.prestigeConfirmAccept.onclick = () => {
            if (DOM.prestigeConfirmationModal) DOM.prestigeConfirmationModal.classList.add('hidden');
            const stats = Logic.Prestige.collectStatistics();
            showStats(stats, Logic);
        };
    }

    if (DOM.prestigeConfirmationModal) DOM.prestigeConfirmationModal.classList.remove('hidden');
}

/**
 * Show detailed statistics modal.
 * @param {Object} stats - Collected statistics object
 * @param {Object} Logic - Logic module (unused but kept for consistency)
 */
export function showStats(stats, Logic) {
    updateI18n();

    const modal = DOM.prestigeStatisticsModal;

    // Fill Headers
    if (DOM.statsGeneration) DOM.statsGeneration.textContent = stats.generation;
    if (DOM.statsDateRange) DOM.statsDateRange.textContent = `${stats.startDate} ~ ${stats.endDate}`;

    // Fill Academic
    if (DOM.statTotalPapers) DOM.statTotalPapers.textContent = stats.academic.totalPapers;
    if (DOM.statTopPapers) DOM.statTopPapers.textContent = stats.academic.topTierPapers;
    if (DOM.statCitations) DOM.statCitations.textContent = formatNumber(stats.academic.totalCitations);
    if (DOM.statHIndex) DOM.statHIndex.textContent = stats.academic.hIndex;
    if (DOM.statRejections) DOM.statRejections.textContent = stats.academic.rejections;
    if (DOM.statRebuttalAcc) DOM.statRebuttalAcc.textContent = Math.round(stats.academic.rebuttalAccuracy * 100) + '%';

    // Fill Intensity
    if (DOM.statClicks) DOM.statClicks.textContent = formatNumber(stats.intensity.manualClicks);
    if (DOM.statTotalRp) DOM.statTotalRp.textContent = formatNumber(stats.intensity.totalRPEarned);
    if (DOM.statCoffee) DOM.statCoffee.textContent = stats.intensity.coffeeConsumed;
    if (DOM.statBuildings) DOM.statBuildings.textContent = stats.intensity.buildingsPurchased;
    if (DOM.statUpgrades) DOM.statUpgrades.textContent = stats.intensity.upgradesBought;

    // Fill RP Source
    if (DOM.statRpClickPct) DOM.statRpClickPct.textContent = stats.rpBreakdown.click.pct + '%';
    if (DOM.statRpClickAmt) DOM.statRpClickAmt.textContent = formatNumber(stats.rpBreakdown.click.amount) + ' RP';

    if (DOM.statRpComputePct) DOM.statRpComputePct.textContent = stats.rpBreakdown.compute.pct + '%';
    if (DOM.statRpComputeAmt) DOM.statRpComputeAmt.textContent = formatNumber(stats.rpBreakdown.compute.amount) + ' RP';

    if (DOM.statRpAcademicPct) DOM.statRpAcademicPct.textContent = stats.rpBreakdown.academic.pct + '%';
    if (DOM.statRpAcademicAmt) DOM.statRpAcademicAmt.textContent = formatNumber(stats.rpBreakdown.academic.amount) + ' RP';

    // Fill Social
    if (DOM.statConnectionsCount) DOM.statConnectionsCount.textContent = stats.networking.owned.length;
    if (DOM.statRepEarned) DOM.statRepEarned.textContent = '+' + formatNumber(stats.networking.repEarned);
    if (DOM.statSocialInflation) DOM.statSocialInflation.textContent = 'x' + stats.networking.inflation;

    // Fill Playstyle
    if (DOM.statPlaystyleType) DOM.statPlaystyleType.textContent = stats.playstyle.type;
    if (DOM.statPlaystyleDesc) DOM.statPlaystyleDesc.textContent = stats.playstyle.desc;
    if (DOM.statPrimaryStrategy) DOM.statPrimaryStrategy.textContent = stats.playstyle.strategy;

    // Fill Advisor
    if (DOM.statAdvisorComment) DOM.statAdvisorComment.textContent = `"${stats.advisor.text}"`;
    if (DOM.statAdvisorReason) DOM.statAdvisorReason.textContent = `- ${stats.advisor.reason}`;

    if (modal) modal.classList.remove('hidden');

    // Bind Start New Button
    if (DOM.statsStartNewBtn) {
        DOM.statsStartNewBtn.onclick = () => {
            if (modal) modal.classList.add('hidden');

            // Check if AGI farewell should be shown
            if (AGIFarewell.shouldShowFarewell()) {
                AGIFarewell.show(() => {
                    showTransition(stats, Logic);
                });
            } else {
                showTransition(stats, Logic);
            }
        };
    }
}

/**
 * Show the prestige transition animation.
 * @param {Object} stats - Collected statistics object
 * @param {Object} Logic - Logic module for prestige execution
 */
export function showTransition(stats, Logic) {
    const screen = DOM.prestigeTransitionScreen;

    // Clear any pending transition timers
    Runtime.transitionTimers.forEach(id => clearTimeout(id));
    Runtime.transitionTimers = [];

    // Fill Data
    if (DOM.transitionGenOld) DOM.transitionGenOld.textContent = stats.generation;
    if (DOM.transitionGenNew) DOM.transitionGenNew.textContent = stats.nextGen.gen;
    if (DOM.transitionCommentText) DOM.transitionCommentText.textContent = stats.advisor.text;

    // Update Icon
    const currentIcon = document.getElementById('transition-origin-icon');
    if (currentIcon && stats.nextGen.origin.icon) {
        const parent = currentIcon.parentNode;
        const newI = document.createElement('i');
        newI.id = 'transition-origin-icon';
        newI.setAttribute('data-lucide', stats.nextGen.origin.icon);
        newI.className = 'w-16 h-16 text-amber-500 mx-auto';
        parent.replaceChild(newI, currentIcon);
        if (window.lucide) lucide.createIcons({ root: parent });
    }

    if (screen) screen.classList.remove('hidden');

    // Animation Sequence
    const timers = Runtime.transitionTimers;
    timers.push(setTimeout(() => {
        if (DOM.transitionProgress) DOM.transitionProgress.style.width = '100%';
    }, 100));

    timers.push(setTimeout(() => {
        if (DOM.transitionComment) DOM.transitionComment.style.opacity = '1';
    }, 1000));

    timers.push(setTimeout(() => {
        if (DOM.transitionCurrent) {
            DOM.transitionCurrent.style.opacity = '0';
            DOM.transitionCurrent.style.transform = 'translateY(-20px)';
        }
    }, 1500));

    timers.push(setTimeout(() => {
        if (DOM.transitionNext) {
            DOM.transitionNext.style.opacity = '1';
            DOM.transitionNext.style.transform = 'translateY(0)';
        }
    }, 2000));

    timers.push(setTimeout(() => {
        if (screen) {
            screen.style.opacity = '0';
            screen.style.transition = 'opacity 0.5s';
        }
    }, 3500));

    timers.push(setTimeout(() => {
        if (screen) {
            screen.classList.add('hidden');
            screen.style.opacity = '1'; // Reset for next time
        }
        Runtime.transitionTimers = [];
        executePrestigeReset(stats, Logic);
    }, 4000));
}

/**
 * Execute the actual prestige reset.
 * @param {Object} stats - Collected statistics object
 * @param {Object} Logic - Logic module for state reset
 */
export function executePrestigeReset(stats, Logic) {
    const nextGen = State.generation + 1;
    const newRep = State.reputation + stats.networking.repEarned;
    const keptConns = State.ownedConnections;
    const keptPapers = [];

    let startRP = 0;
    if (Logic.hasConnection('hinton')) {
        startRP = State.rp * 0.05;
    }

    // Force reset Runtime values
    Runtime.rps = 0;
    Runtime.rpsCompute = 0;
    Runtime.rpsAcademic = 0;
    Runtime.globalMultiplier = 1;

    // Reset State
    const currentLang = State.currentLang;

    State.rp = startRP;
    State.totalRp = startRP;
    State.citations = 0;
    State.citationsRate = 0;
    State.inventory = {};
    State.purchasedUpgrades = [];
    State.purchasedClickUpgrades = [];
    State.acceptedPapers = keptPapers;
    State.userResearchTopics = [];
    State.papersSubmitted = 0;

    State.generation = nextGen;
    State.reputation = newRep;
    State.currentOrigin = stats.raw.nextOriginId;
    State.ownedConnections = keptConns;
    State.introSeen = false; // Show intro next time
    State.advisorSeen = false; // Show advisor selection next time
    State.currentAdvisor = null; // Clear advisor

    State.stats = {
        lifetime_rp_click: 0,
        lifetime_rp_compute: 0,
        lifetime_rp_academic: 0,
        lifetime_clicks: 0,
        total_papers: 0
    };

    State.currentLang = currentLang;
    State.lastSaveTime = Date.now();

    // Bug #8 修复: 调整AGI状态处理顺序，避免竞态条件
    if (State.agi) {
        // 1. 先保留需要跨周目保存的数据
        const preservedAgi = AGI.preserveOnPrestige(State.agi);

        // 2. 通知AGI系统转生开始（会重置Runtime.agi）
        AGI.onPrestigeStart();

        // 3. 最后应用保留的状态
        State.agi = preservedAgi;
    }

    // Trigger a manual save (saveGame is in main.js, will be called by auto-save interval)

    // Refresh UI
    try {
        Runtime.submissionSession = null;
        Submission.closeModal();
        renderLists();
        renderPublications();
        updateNews();
        Logic.updateAll();
    } catch (e) {
        console.error("UI Refresh Error after prestige:", e);
    }

    // Show advisor selection (this will also apply starting bonuses)
    // After advisor is confirmed, intro will be shown
    Advisor.open(Logic);
}

/**
 * Close the settlement/statistics modal.
 */
export function close() {
    if (DOM.prestigeConfirmationModal) DOM.prestigeConfirmationModal.classList.add('hidden');
    if (DOM.prestigeStatisticsModal) DOM.prestigeStatisticsModal.classList.add('hidden');
    if (DOM.prestigeTransitionScreen) DOM.prestigeTransitionScreen.classList.add('hidden');
}
