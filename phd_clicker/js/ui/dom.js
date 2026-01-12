/**
 * DOM Element Caching Module
 * Caches frequently accessed DOM elements for performance.
 * Extracted from Game.DOM and Game.UI.cacheDOM() in game.js
 */

/**
 * Cached DOM elements object.
 * Elements are stored with camelCase keys (e.g., 'rp-display' -> 'rpDisplay')
 */
export const DOM = {};

/**
 * List of element IDs to cache.
 * These are all the interactive and display elements used in the game.
 */
const elementIds = [
    // Main UI
    'game-container', 'minimize-button', 'floating-widget', 'widget-text', 'widget-rp-display',
    'rp-display', 'rp-per-second-display', 'citations-display', 'citations-rate-display',
    'papers-count-display', 'h-index-display',
    'manual-research-button', 'floating-text-container',
    'buildings-list', 'upgrades-list', 'news-ticker', 'lang-toggle',
    'upgrades-toggle', 'upgrades-wrapper', 'buildings-toggle', 'buildings-wrapper', 'click-upgrades-list',
    'submit-paper-button', 'submit-paper-cost', 'prestige-button',
    'reset-button', 'autosave-label',

    // Publications
    'publications-header', 'pub-summary-view', 'pub-detail-view', 'pub-list',
    'pub-total-badge', 'pub-chevron',

    // Connections
    'connections-btn', 'connections-modal', 'connections-close', 'connections-list', 'rep-display',

    // Submission Modal
    'submission-modal', 'submission-close', 'submission-close-bottom', 'submission-current-rp',
    'tier-stage', 'tier-list', 'submission-min-cost',

    // Prestige Confirmation
    'prestige-confirmation-modal', 'confirm-generation', 'confirm-subtitle', 'confirm-rep-gain',
    'prestige-confirm-cancel', 'prestige-confirm-accept',

    // Prestige Transition
    'prestige-transition-screen', 'transition-current', 'transition-gen-old', 'transition-progress',
    'transition-comment', 'transition-comment-text', 'transition-next', 'transition-gen-new',
    'transition-origin-icon',

    // Prestige Statistics
    'prestige-statistics-modal', 'stats-generation', 'stats-date-range', 'stats-close-btn',
    'stats-start-new-btn',
    'stat-total-papers', 'stat-top-papers', 'stat-venue-list', 'stat-citations', 'stat-h-index',
    'stat-rejections', 'stat-rebuttal-acc',
    'stat-clicks', 'stat-total-rp', 'stat-coffee', 'stat-playtime', 'stat-peak-rps',
    'stat-avg-rps', 'stat-buildings', 'stat-upgrades',
    'stat-rp-click-pct', 'stat-rp-click-amt', 'stat-rp-compute-pct', 'stat-rp-compute-amt',
    'stat-rp-academic-pct', 'stat-rp-academic-amt',
    'stat-top-building-name', 'stat-top-building-value',
    'stat-oom', 'stat-lucky', 'stat-unlucky', 'stat-closest', 'stat-waste',
    'badge-perfect', 'badge-never-reject', 'badge-idle',
    'stat-connections-count', 'stat-connections-list', 'stat-mvc-name', 'stat-mvc-value',
    'stat-rep-earned', 'stat-social-inflation',
    'stat-playstyle-type', 'stat-playstyle-desc', 'stat-primary-strategy',
    'stat-advisor-comment', 'stat-advisor-reason',

    // Title Generator
    'research-focus-input', 'generated-title-display', 'reroll-title-btn',

    // Legacy / Shared IDs
    'settlement-modal', 'settlement-subtitle', 'stat-papers', 'stat-clicks', 'stat-playtime',
    'settlement-flavor', 'settlement-rep-gain', 'next-origin-icon', 'next-origin-name',
    'next-origin-desc',
    'settlement-stamp', 'settlement-cancel', 'settlement-confirm',

    // Intro Modal
    'heritage-intro-modal', 'intro-gen-title', 'intro-origin-name', 'intro-origin-icon',
    'intro-buff-desc', 'intro-start-btn',

    // HUD
    'origin-badge', 'origin-icon', 'generation-display',

    // Detail View
    'tier-detail-view', 'detail-back-btn', 'detail-title', 'detail-base-cost',
    'detail-invest-input', 'detail-invest-slider', 'detail-max-invest',
    'detail-total-chance', 'detail-chance-breakdown', 'detail-chance-bar',
    'detail-warning', 'detail-start-btn',

    // Question Stage
    'question-stage', 'question-tier-label', 'rebuttal-gauge-fill', 'question-progress', 'question-chance',
    'question-reviewer-badge', 'question-reviewer-name', 'question-text',
    'options-container', 'question-feedback', 'question-next-btn',

    // Result Stage
    'result-stage', 'result-letter', 'result-letter-date', 'result-letter-subject',
    'result-letter-body',
    'result-settlement', 'result-icon', 'result-title', 'result-detail',
    'result-tier', 'result-chance', 'result-roll', 'result-rewards', 'result-flavor',
    'result-button',

    // Dev Console
    'dev-console', 'dev-close', 'dev-rp', 'dev-set-rp', 'dev-citations', 'dev-set-citations',
    'dev-papers', 'dev-set-papers',
    'dev-reputation', 'dev-set-reputation', 'dev-add-top-paper',

    // Stealth Terminal
    'stealth-terminal', 'terminal-title', 'terminal-time', 'terminal-monitor',
    'top-display', 'nvidia-smi-display', 'terminal-output', 'terminal-cmd',

    // Advisor Selection Modal
    'advisor-modal', 'advisor-name-input', 'advisor-title', 'advisor-desc',
    'advisor-traits', 'legend-advisors', 'advisor-lock-info',
    'advisor-reroll-btn', 'advisor-switch-btn', 'advisor-confirm-btn',
    'advisor-info-btn', 'advisor-info-text'
];

/**
 * Convert hyphenated ID to camelCase.
 * @param {string} id - Hyphenated ID string
 * @returns {string} camelCase key
 */
function toCamelCase(id) {
    return id.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}

/**
 * Cache all DOM elements by their IDs.
 * Should be called once during game initialization.
 * Elements are stored in the DOM object with camelCase keys.
 */
export function cacheDOM() {
    elementIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            DOM[toCamelCase(id)] = el;
        }
    });

    // Special case: news ticker span
    if (DOM.newsTicker) {
        const span = DOM.newsTicker.querySelector('span');
        if (span) {
            DOM.newsTickerSpan = span;
        }
    }
}

/**
 * Get a cached DOM element by its original ID.
 * @param {string} id - Original element ID (hyphenated)
 * @returns {HTMLElement|undefined} Cached element or undefined
 */
export function getElement(id) {
    return DOM[toCamelCase(id)];
}

/**
 * Add a new element to the cache.
 * @param {string} id - Element ID
 * @param {HTMLElement} element - DOM element to cache
 */
export function cacheElement(id, element) {
    DOM[toCamelCase(id)] = element;
}
