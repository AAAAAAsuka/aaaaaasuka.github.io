/**
 * Advisor Logic Module
 * Handles advisor generation, trait randomization, and effect calculation.
 */

import { State, Runtime } from '../state.js';
import { pickRandom } from '../data.js';

// === Configuration Constants ===
const TRAIT_COUNT_WEIGHTS = { 3: 0.8, 4: 0.2 };  // 80% get 3 traits, 20% get 4 traits
const RARITY_WEIGHTS = {
    green: 40,
    blue: 30,
    purple: 20,
    gold: 8,
    red: 2
};
const MAX_RED_PER_ADVISOR = 1;

// Default trait IDs for first generation advisor
const DEFAULT_TRAIT_IDS = ['green_001', 'green_005']; // Coffee + Undergraduate

// Advisor name pools (mixed Chinese pinyin + Western names)
const CHINESE_SURNAMES = ['Wang', 'Li', 'Zhang', 'Liu', 'Chen', 'Yang', 'Huang', 'Zhao', 'Zhou', 'Wu', 'Xu', 'Sun', 'Ma', 'Zhu', 'Hu', 'Lin', 'Guo', 'He', 'Luo', 'Gao'];
const CHINESE_GIVEN = ['Wei', 'Ming', 'Hua', 'Qiang', 'Fang', 'Na', 'Xiuying', 'Min', 'Jing', 'Li', 'Lei', 'Yang', 'Yan', 'Yong', 'Jun', 'Jie', 'Tao', 'Chao', 'Hao', 'Kai'];
const WESTERN_SURNAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Wilson'];
const WESTERN_GIVEN = ['James', 'John', 'Robert', 'Michael', 'David', 'Emily', 'Emma', 'Sarah', 'Jessica', 'Jennifer', 'Daniel', 'Matthew', 'Christopher', 'Andrew', 'Elizabeth'];

// Combined pools for mixed name generation
const SURNAME_POOL = [...CHINESE_SURNAMES, ...WESTERN_SURNAMES];
const GIVEN_NAME_POOL = [...CHINESE_GIVEN, ...WESTERN_GIVEN];

// === Lock Slot Rules ===
/**
 * Get maximum number of trait lock slots based on generation.
 * @returns {number} Max lock slots available
 */
export function getMaxLockSlots() {
    if (State.generation <= 1) return 0;
    if (State.generation === 2) return 1;
    if (State.generation === 3) return 2;
    return 3;
}

// === Default Advisor (Generation 1) ===
/**
 * Get the default advisor for first generation.
 * Has 2 fixed simple traits: coffee bonus and undergraduate.
 * @returns {Object} Default advisor object
 */
export function getDefaultAdvisor() {
    const traits = Runtime.traitsConfig;
    const defaultTraits = [];

    // Find default traits from green pool
    for (const traitId of DEFAULT_TRAIT_IDS) {
        const trait = traits.green.find(t => t.id === traitId);
        if (trait) {
            defaultTraits.push({ ...trait, rarity: 'green', locked: false });
        }
    }

    return {
        id: 'default',
        name: State.currentLang === 'en' ? 'Generic Advisor' : '普通导师',
        isLegend: false,
        traits: defaultTraits
    };
}

// === Random Advisor Generation ===
/**
 * Generate a random advisor with traits.
 * @param {Array} lockedTraits - Traits that should be preserved
 * @returns {Object} Random advisor object
 */
export function generateRandomAdvisor(lockedTraits = []) {
    const traitCount = pickWeighted(TRAIT_COUNT_WEIGHTS);
    const traits = [];
    let redCount = 0;

    // Preserve locked traits
    lockedTraits.forEach(t => {
        traits.push({ ...t, locked: true });
        if (t.rarity === 'red') redCount++;
    });

    // Fill remaining slots with random traits
    const MAX_ATTEMPTS = 50;  // Safety guard to prevent infinite loop
    let attempts = 0;
    while (traits.length < traitCount && attempts < MAX_ATTEMPTS) {
        attempts++;
        const rarity = pickRarity(redCount >= MAX_RED_PER_ADVISOR);
        const trait = pickRandomTrait(rarity, traits);
        if (trait) {
            traits.push({ ...trait, rarity, locked: false });
            if (rarity === 'red') redCount++;
        }
    }
    if (attempts >= MAX_ATTEMPTS) {
        console.warn('[Advisor] Max attempts reached, trait pool may be exhausted');
    }

    return {
        id: 'random_' + Date.now(),
        name: generateAdvisorName(),
        isLegend: false,
        traits: traits
    };
}

/**
 * Generate a random advisor name from mixed Chinese/Western pool.
 * Uses unified "Given Surname" format for all names.
 * @returns {string} Random name
 */
export function generateAdvisorName() {
    const given = pickRandom(GIVEN_NAME_POOL);
    const surname = pickRandom(SURNAME_POOL);
    return `${given} ${surname}`;
}

// === Legend Advisors ===
/**
 * Get a legend advisor by their connection ID.
 * @param {string} connectionId - Connection ID (e.g., 'hinton', 'lecun')
 * @returns {Object|null} Legend advisor object or null
 */
export function getLegendAdvisor(connectionId) {
    const legends = Runtime.legendAdvisorsConfig || {};
    const legend = legends[connectionId];
    if (!legend) return null;

    // Mark all traits as non-rerollable
    const traits = (legend.traits || []).map(t => ({
        ...t,
        locked: false,  // Legend traits don't need lock display
        isLegendTrait: true  // Flag to prevent reroll
    }));

    return {
        id: legend.id,
        name: legend.name,
        title: legend.title,
        desc: legend.desc,
        isLegend: true,
        traits: traits
    };
}

/**
 * Get list of available legend advisors based on owned connections.
 * @returns {Array} List of available legend advisors
 */
export function getAvailableLegendAdvisors() {
    const legends = Runtime.legendAdvisorsConfig || {};
    return State.ownedConnections
        .filter(id => legends[id])
        .map(id => getLegendAdvisor(id));
}

// === Effect Calculation ===
/**
 * Calculate all modifier values from current advisor's traits.
 * @returns {Object} Modifiers object with all effect values
 */
export function getAdvisorModifiers() {
    const advisor = State.currentAdvisor;
    if (!advisor || !advisor.traits) return getDefaultModifiers();

    const modifiers = getDefaultModifiers();

    advisor.traits.forEach(trait => {
        if (trait.effect) {
            applyTraitEffect(trait.effect, modifiers);
        }
    });

    return modifiers;
}

/**
 * Get default modifier values (no effects).
 * @returns {Object} Default modifiers
 */
function getDefaultModifiers() {
    return {
        // Multipliers (multiplicative, default 1)
        globalRpMultiplier: 1,
        manualClickMultiplier: 1,
        offlineMultiplier: 1,
        computeFacilitiesMultiplier: 1,
        academicFacilitiesMultiplier: 1,
        facilityCostMultiplier: 1,
        upgradeCostMultiplier: 1,
        rebuttalPenaltyMultiplier: 1,
        rebuttalBonusMultiplier: 1,
        submissionCostMultiplier: 1,
        collaboratorMultiplier: 1,

        // Specific building multipliers
        buildingMultipliers: {},

        // Additive bonuses (default 0)
        submissionRateAdditive: 0,
        tier3SubmissionRateAdditive: 0,
        submissionRateFloor: 0,
        paperBonusAdditive: 0,
        inflationReduction: 0,
        rebirthRpRetain: 0,

        // Starting bonuses (applied once at game start)
        startingBonuses: [],

        // Special effects
        critChance: 0,
        critMultiplier: 1,
        disableOffline: false
    };
}

/**
 * Apply a single trait effect to modifiers.
 * @param {Object} effect - Effect object from trait
 * @param {Object} modifiers - Modifiers object to update
 */
function applyTraitEffect(effect, modifiers) {
    // Handle red traits with positive/negative structure
    if (effect.positive && effect.negative) {
        applyTraitEffect(effect.positive, modifiers);
        applyTraitEffect(effect.negative, modifiers);
        return;
    }

    const { type, target, value } = effect;

    switch (type) {
        case 'multiplier':
            applyMultiplierEffect(target, value, modifiers);
            break;
        case 'additive':
            applyAdditiveEffect(target, value, modifiers);
            break;
        case 'starting_bonus':
            modifiers.startingBonuses.push({ target, value });
            break;
        case 'crit_chance':
            modifiers.critChance = Math.max(modifiers.critChance, value);
            modifiers.critMultiplier = Math.max(modifiers.critMultiplier, effect.crit_multiplier || 10);
            break;
        case 'disable':
            if (target === 'offline') {
                modifiers.disableOffline = true;
            }
            break;
    }
}

/**
 * Apply a multiplier effect to the appropriate modifier.
 * @param {string} target - Effect target
 * @param {number} value - Multiplier value
 * @param {Object} modifiers - Modifiers object
 */
function applyMultiplierEffect(target, value, modifiers) {
    const targetMap = {
        'global_rp': 'globalRpMultiplier',
        'manual_click': 'manualClickMultiplier',
        'offline': 'offlineMultiplier',
        'compute_facilities': 'computeFacilitiesMultiplier',
        'academic_facilities': 'academicFacilitiesMultiplier',
        'facility_cost': 'facilityCostMultiplier',
        'upgrade_cost': 'upgradeCostMultiplier',
        'rebuttal_penalty': 'rebuttalPenaltyMultiplier',
        'rebuttal_bonus': 'rebuttalBonusMultiplier',
        'submission_cost': 'submissionCostMultiplier',
        'collaborator': 'collaboratorMultiplier',
        'rebirth_rp_retain': 'rebirthRpRetain'
    };

    if (targetMap[target]) {
        modifiers[targetMap[target]] *= value;
    } else {
        // Specific building target (e.g., 'h100', 'arxiv', 'undergrad')
        modifiers.buildingMultipliers[target] = (modifiers.buildingMultipliers[target] || 1) * value;
    }
}

/**
 * Apply an additive effect to the appropriate modifier.
 * @param {string} target - Effect target
 * @param {number} value - Additive value
 * @param {Object} modifiers - Modifiers object
 */
function applyAdditiveEffect(target, value, modifiers) {
    const targetMap = {
        'submission_rate': 'submissionRateAdditive',
        'tier3_submission_rate': 'tier3SubmissionRateAdditive',
        'submission_rate_floor': 'submissionRateFloor',
        'paper_bonus': 'paperBonusAdditive',
        'inflation_reduction': 'inflationReduction'
    };

    if (targetMap[target]) {
        modifiers[targetMap[target]] += value;
    }
}

// === Utility Functions ===
/**
 * Pick a value based on weighted probabilities.
 * @param {Object} weights - Object with values as keys and weights as values
 * @returns {number} Selected value
 */
function pickWeighted(weights) {
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    let random = Math.random() * total;

    for (const [value, weight] of Object.entries(weights)) {
        random -= weight;
        if (random <= 0) return parseInt(value);
    }

    return parseInt(Object.keys(weights)[0]);
}

/**
 * Pick a random rarity based on weights.
 * @param {boolean} excludeRed - Whether to exclude red rarity
 * @returns {string} Selected rarity
 */
function pickRarity(excludeRed = false) {
    const weights = { ...RARITY_WEIGHTS };
    if (excludeRed) {
        delete weights.red;
    }

    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    let random = Math.random() * total;

    for (const [rarity, weight] of Object.entries(weights)) {
        random -= weight;
        if (random <= 0) return rarity;
    }

    return 'green';
}

/**
 * Pick a random trait of specified rarity, avoiding duplicates.
 * @param {string} rarity - Trait rarity
 * @param {Array} existing - Existing traits to avoid duplicates
 * @returns {Object|null} Random trait or null
 */
function pickRandomTrait(rarity, existing) {
    const traits = Runtime.traitsConfig;
    const pool = traits[rarity] || [];

    if (pool.length === 0) return null;

    // Filter out already selected traits
    const existingIds = new Set(existing.map(t => t.id));
    const available = pool.filter(t => !existingIds.has(t.id));

    if (available.length === 0) return null;

    return pickRandom(available);
}
