/**
 * Paper Submission Logic Module
 * Contains paper submission, tier calculation, and rebuttal logic.
 * Extracted from Game.Logic.Submission in game.js
 *
 * Note: UI parts (modal display, stage management) are handled by the UI module.
 * This module only contains pure logic functions.
 */

import { Constants } from '../constants.js';
import { State, Runtime } from '../state.js';
import { hasConnection } from './core.js';
import * as Advisor from './advisor.js';

/**
 * Pending submission state.
 * Holds current submission configuration before confirmation.
 */
export let pending = null;

/**
 * Set the pending submission.
 * @param {Object|null} value - Pending submission object or null to clear
 */
export function setPending(value) {
    pending = value;
}

/**
 * Get the pending submission.
 * @returns {Object|null} Current pending submission
 */
export function getPending() {
    return pending;
}

/**
 * Get inflation multiplier based on papers submitted.
 * @returns {number} Inflation multiplier
 */
export function getInflationMult() {
    return Math.pow(Constants.INFLATION_BASE, State.papersSubmitted);
}

/**
 * Get current base cost for a tier with inflation and advisor effects.
 * @param {Object} tier - Tier configuration object
 * @returns {number} Current base cost
 */
export function getCurrentBaseCost(tier) {
    const advisorMod = Advisor.getAdvisorModifiers();
    let cost = Math.floor((tier.baseCost || 1000) * getInflationMult());

    // Advisor submission cost multiplier
    cost = Math.floor(cost * advisorMod.submissionCostMultiplier);

    return cost;
}

/**
 * Get current K factor for chance calculation with inflation.
 * @param {Object} tier - Tier configuration object
 * @returns {number} Current K factor
 */
export function getCurrentK(tier) {
    return Math.floor((tier.kFactor || 1000) * getInflationMult());
}

/**
 * Calculate acceptance chance for a submission.
 * Applies investment bonus, connection bonuses, and advisor effects.
 * @param {Object} tier - Tier configuration object
 * @param {number} investedRP - Amount of RP invested beyond base cost
 * @returns {number} Acceptance chance (0-0.99)
 */
export function calculateChance(tier, investedRP) {
    const advisorMod = Advisor.getAdvisorModifiers();

    const K = getCurrentK(tier);
    const base = tier.baseRate;
    const max = tier.maxBaseChance;
    let bonus = (max - base) * (investedRP / (investedRP + K));

    let chance = base + bonus;

    // Connection: Ilya Sutskever (Maximum Likelihood) - Tier 3 Base Rate +10%
    if (hasConnection('ilya') && tier.id === 'tier_3') {
        chance += 0.10;
    }

    // Advisor tier 3 submission rate additive
    if (tier.id === 'tier_3') {
        chance += advisorMod.tier3SubmissionRateAdditive;
    }

    // Advisor general submission rate additive
    chance += advisorMod.submissionRateAdditive;

    // Apply floor rate (minimum guaranteed chance)
    if (advisorMod.submissionRateFloor > 0) {
        chance = Math.max(chance, advisorMod.submissionRateFloor);
    }

    return Math.min(chance, 0.99);
}

/**
 * Open the submission modal.
 * Resets pending state and prepares for tier selection.
 * Note: Actual modal display is handled by UI module.
 */
export function openModal() {
    Runtime.submissionSession = null;
    pending = null;
    // UI rendering is handled by UI.Submission.openModal()
}

/**
 * Close the submission modal.
 * Clears pending state and session.
 * Note: Actual modal hiding is handled by UI module.
 */
export function closeModal() {
    Runtime.submissionSession = null;
    pending = null;
    // UI hiding is handled by UI.Submission.closeModal()
}

/**
 * Check if player can afford a tier's base cost.
 * @param {Object} tier - Tier configuration object
 * @returns {boolean} True if player can afford the tier
 */
export function canAffordTier(tier) {
    const cost = getCurrentBaseCost(tier);
    return State.rp >= cost;
}

/**
 * Get maximum investment amount for current pending tier.
 * @returns {number} Maximum RP that can be invested (always >= 0)
 */
export function getMaxInvestment() {
    if (!pending) return 0;
    return Math.max(0, Math.floor(State.rp - pending.baseCost));
}

/**
 * Prepare a submission for a tier.
 * Sets up pending state with tier info and base cost.
 * @param {string} tierId - ID of the tier to submit to
 * @returns {boolean} True if preparation was successful
 */
export function prepareTier(tierId) {
    const tier = (Runtime.submissionConfig.tiers || []).find(t => t.id === tierId);
    if (!tier) return false;

    const baseCost = getCurrentBaseCost(tier);
    if (State.rp < baseCost) return false;

    pending = { tier, baseCost, invested: 0 };
    return true;
}

/**
 * Set investment amount for pending submission.
 * @param {number} amount - RP amount to invest
 * @returns {number} Actual investment amount (capped at max)
 */
export function setInvestment(amount) {
    if (!pending) return 0;

    const max = getMaxInvestment();
    const clamped = Math.max(0, Math.min(amount, max));
    pending.invested = clamped;

    return clamped;
}

/**
 * Start the submission process.
 * Deducts cost and creates submission session.
 * @returns {Object|null} Submission session object or null if failed
 */
export function startSubmission() {
    if (!pending) return null;

    const totalCost = pending.baseCost + pending.invested;
    if (State.rp < totalCost) return null;

    // Deduct cost
    State.rp -= totalCost;

    // Calculate initial chance
    const initialChance = calculateChance(pending.tier, pending.invested);

    // Select questions from pool
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

    // Fill remaining slots
    let safeGuard = 0;
    while (selectedQs.length < qConfig.total && safeGuard < 100) {
        safeGuard++;
        const rem = [...funny, ...tech];
        if (!rem.length) break;
        pick(rem, 1);
    }

    if (selectedQs.length === 0) {
        console.error("No questions selected!");
        return null;
    }

    // Create submission session
    const session = {
        tier: pending.tier,
        questions: selectedQs,
        index: 0,
        currentChance: initialChance,
        answers: [],
        invested: pending.invested,
        targetVenue: pending.tier.venues ?
            pending.tier.venues[Math.floor(Math.random() * pending.tier.venues.length)] :
            pending.tier.name
    };

    Runtime.submissionSession = session;

    // Increment papers submitted counter
    State.papersSubmitted++;

    return session;
}

/**
 * Process an answer to a rebuttal question.
 * Applies advisor rebuttal bonus/penalty multipliers.
 * @param {number} delta - Chance delta from answer (positive or negative)
 * @returns {{ newChance: number, isComplete: boolean }} Result of processing
 */
export function processAnswer(delta) {
    const session = Runtime.submissionSession;
    if (!session) return { newChance: 0, isComplete: true };

    const advisorMod = Advisor.getAdvisorModifiers();

    // Apply delta with rebuttal swing scaling
    const swing = session.tier.rebuttalSwing || 0.1;
    let scaledDelta = delta * swing;

    // Apply advisor rebuttal multipliers
    if (scaledDelta > 0) {
        // Positive outcome - apply bonus multiplier
        scaledDelta *= advisorMod.rebuttalBonusMultiplier;
    } else if (scaledDelta < 0) {
        // Negative outcome - apply penalty multiplier
        scaledDelta *= advisorMod.rebuttalPenaltyMultiplier;
    }

    session.currentChance = Math.max(0, Math.min(0.99, session.currentChance + scaledDelta));
    session.answers.push(delta);
    session.index++;

    const isComplete = session.index >= session.questions.length;

    return {
        newChance: session.currentChance,
        isComplete: isComplete
    };
}

/**
 * Finalize submission and determine result.
 * @returns {{ success: boolean, roll: number, chance: number, venue: string, rewards: Object }} Submission result
 */
export function finalizeSubmission() {
    const session = Runtime.submissionSession;
    if (!session) return null;

    const roll = Math.random();
    const success = roll < session.currentChance;

    const rewards = {
        citations: 0,
        venue: session.targetVenue
    };

    if (success) {
        // Calculate citation rewards
        const baseCitations = session.tier.citations || 10;
        rewards.citations = baseCitations + Math.floor(session.invested / 1000);

        // Add to accepted papers
        State.acceptedPapers.push({
            title: Runtime.lastGeneratedTitle || "Untitled Paper",
            venue: session.targetVenue,
            date: Date.now()
        });

        State.citations += rewards.citations;
        State.stats.total_papers++;
    }

    return {
        success: success,
        roll: roll,
        chance: session.currentChance,
        venue: session.targetVenue,
        rewards: rewards
    };
}

/**
 * Get current submission session.
 * @returns {Object|null} Current submission session
 */
export function getSession() {
    return Runtime.submissionSession;
}

/**
 * Clear the submission session.
 */
export function clearSession() {
    Runtime.submissionSession = null;
}
