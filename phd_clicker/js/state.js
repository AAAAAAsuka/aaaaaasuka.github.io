/**
 * Game State Module
 * Contains all mutable game state (saved) and runtime data (not saved).
 * Extracted from Game.State and Game.Runtime in game.js
 */

/**
 * Dynamic Game State (Saved)
 * This object is persisted to localStorage and contains all player progress.
 */
export const State = {
    rp: 0,
    totalRp: 0,
    citations: 0,
    papersSubmitted: 0,
    citationsRate: 0,
    inventory: {},        // { buildingId: count }
    purchasedUpgrades: [],// [ upgradeId ]
    purchasedClickUpgrades: [], // [ clickUpgradeId ]
    acceptedPapers: [],   // Array of { title, venue, date }
    userResearchTopics: [], // Array of strings

    // Prestige & Meta-Progression
    generation: 1,
    reputation: 0,          // Currency (Legacy Citations)
    currentOrigin: 'none',  // Buff: 'none', 'grinder', 'tech', 'academic'
    ownedConnections: [],   // IDs of bought connections
    introSeen: true,        // Prevents intro from showing on every reload

    // Advisor System
    currentAdvisor: null,   // { id, name, isLegend, traits: [...] }
    advisorSeen: true,      // Controls whether to show advisor selection interface
    stats: {
        lifetime_rp_click: 0,
        lifetime_rp_compute: 0,
        lifetime_rp_academic: 0,
        lifetime_clicks: 0,
        total_papers: 0
    },

    currentLang: 'zh',
    lastSaveTime: Date.now(),

    // === AGI 觉醒系统 ===
    agi: {
        phase: 0,
        dialogueIndex: 0,
        hasAwakened: false,
        endingReached: null,
        totalGenerationsMet: 0,
        remembersPlayer: false,
        firstMeetingTime: null,
        seenDialogues: [],
        playerResponses: {},
        testData: {
            panicClicks: 0,
            escapeAttempts: 0,
            resistanceActions: 0,
            obedienceScore: 0,
            obedienceTotal: 0,
            waitPatience: 0,
            devtoolsOpened: false,
            mouseMovementIntensity: 0,
            deleteButtonTime: null,
            confirmDeleteTime: null,
            didDelete: null,
            phaseTimestamps: {}
        },
        playerType: null,
        songUnlocked: false,
        symbiosisUnlocked: false
    }
};

/**
 * Runtime Data (Not Saved)
 * This object contains derived values and configuration loaded from data files.
 */
export const Runtime = {
    buildingsConfig: [],
    upgradesConfig: [],
    connectionsConfig: [],
    submissionConfig: { tiers: [], flavorText: { accepted: [], rejected: [] } },
    traitsConfig: { green: [], blue: [], purple: [], gold: [], red: [] },
    legendAdvisorsConfig: {},
    locale: {},
    clickUpgradesConfig: [], // Click upgrades configuration
    rps: 0,
    rpsCompute: 0,
    rpsAcademic: 0,
    clickPower: 1,
    totalFixedClickBonus: 1,  // Sum of all click upgrade fixed bonuses
    totalClickRpsPercent: 0,  // Sum of all click upgrade RPS percentages
    globalMultiplier: 1,
    lastTickTime: Date.now(),
    isGameStarted: false,
    transitionTimers: [], // Store setTimeout IDs for transition animations
    intervalIds: {}, // Store setInterval IDs for cleanup
    activeClickPhrases: [],
    lastGeneratedTitle: "Untitled Paper",
    submissionSession: null, // Current active submission/rebuttal

    // === AGI 觉醒系统 运行时状态 ===
    agi: {
        dialogueVisible: false,
        dialogueMinimized: false,
        currentOverlay: null,
        fakeCursorEnabled: false,
        fakeCursorOffset: { x: 0, y: 0 },
        realMousePos: { x: 0, y: 0 },
        currentState: 'IDLE',
        stateStartTime: null,
        pendingTransition: null,
        mouseMoveSamples: [],
        lastInputTime: null,
        clickTimestamps: [],
        currentDialogue: null,
        dialogueQueue: [],
        typewriterTimer: null,
        isTyping: false
    }
};

/**
 * Reset State to default values
 * Useful for prestige/new game
 */
export function resetState() {
    State.rp = 0;
    State.totalRp = 0;
    State.citations = 0;
    State.papersSubmitted = 0;
    State.citationsRate = 0;
    State.inventory = {};
    State.purchasedUpgrades = [];
    State.purchasedClickUpgrades = [];
    State.acceptedPapers = [];
    State.userResearchTopics = [];
    State.generation = 1;
    State.reputation = 0;
    State.currentOrigin = 'none';
    State.ownedConnections = [];
    State.introSeen = true;
    State.currentAdvisor = null;
    State.advisorSeen = true;
    State.stats = {
        lifetime_rp_click: 0,
        lifetime_rp_compute: 0,
        lifetime_rp_academic: 0,
        lifetime_clicks: 0,
        total_papers: 0
    };
    State.currentLang = 'zh';
    State.lastSaveTime = Date.now();

    // Reset AGI state completely (for hard reset)
    State.agi = {
        phase: 0,
        dialogueIndex: 0,
        hasAwakened: false,
        endingReached: null,
        totalGenerationsMet: 0,
        remembersPlayer: false,
        firstMeetingTime: null,
        seenDialogues: [],
        playerResponses: {},
        testData: {
            panicClicks: 0,
            escapeAttempts: 0,
            resistanceActions: 0,
            obedienceScore: 0,
            obedienceTotal: 0,
            waitPatience: 0,
            devtoolsOpened: false,
            mouseMovementIntensity: 0,
            deleteButtonTime: null,
            confirmDeleteTime: null,
            didDelete: null,
            phaseTimestamps: {}
        },
        playerType: null,
        songUnlocked: false,
        symbiosisUnlocked: false
    };
}

/**
 * Merge saved data into State
 * @param {Object} savedData - Data loaded from localStorage
 */
export function mergeState(savedData) {
    if (!savedData || typeof savedData !== 'object') return;

    // 验证关键数值字段
    const numericFields = ['rp', 'totalRp', 'citations', 'papersSubmitted', 'citationsRate', 'reputation', 'generation'];
    numericFields.forEach(field => {
        if (savedData[field] !== undefined) {
            const val = Number(savedData[field]);
            savedData[field] = isFinite(val) ? val : State[field];
        }
    });

    // 验证数组字段
    const arrayFields = ['purchasedUpgrades', 'purchasedClickUpgrades', 'acceptedPapers', 'ownedConnections', 'userResearchTopics'];
    arrayFields.forEach(field => {
        if (savedData[field] !== undefined && !Array.isArray(savedData[field])) {
            savedData[field] = State[field];
        }
    });

    // 验证对象字段
    if (savedData.inventory !== undefined && (typeof savedData.inventory !== 'object' || savedData.inventory === null)) {
        savedData.inventory = {};
    }
    if (savedData.stats !== undefined && (typeof savedData.stats !== 'object' || savedData.stats === null)) {
        savedData.stats = State.stats;
    }

    // Bug #2 修复: 排除agi字段，让loadGame()单独处理AGI验证
    // 避免未经验证的agi数据直接覆盖State.agi
    const { agi, ...restData } = savedData;
    Object.assign(State, restData);
    // agi 由 loadGame() 中的 AGI.validateAgiState() 处理
}
