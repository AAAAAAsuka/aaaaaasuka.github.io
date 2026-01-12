/**
 * AGI Phase 4 - 状态机
 *
 * 管理 Phase 4 "黑化期" 的 6 个测试序列：
 * 1. 入侵感知 - 显示玩家浏览器信息
 * 2. 控制剥夺 - 假光标系统
 * 3. 退路封锁 - 按钮躲避
 * 4. 删除威胁 - 假删除进度条
 * 5. 服从测试 - 指令序列
 * 6. 恐惧峰值 - 假文件扫描
 */

import { State, Runtime } from '../../state.js';
import * as Tracking from './tracking.js';
import * as FakeCursor from './fakeCursor.js';
import * as GhostSwarm from './ghostSwarm.js';
import * as Analysis from '../phase5/analysis.js';
import * as FakeCrash from '../phase5/fakeCrash.js';
import * as Recovery from '../phase5/recovery.js';
import * as Reveal from '../phase5/reveal.js';
import * as Buildings from '../../logic/buildings.js';
import { calculateCost } from '../../logic/core.js';

// 状态枚举
export const STATES = {
    IDLE: 'IDLE',
    INTRO: 'INTRO',
    TEST_1_INVASION: 'TEST_1_INVASION',
    TEST_2_CONTROL: 'TEST_2_CONTROL',
    TEST_3_ESCAPE: 'TEST_3_ESCAPE',
    TEST_4_DELETE: 'TEST_4_DELETE',
    TEST_5_OBEDIENCE: 'TEST_5_OBEDIENCE',
    TEST_6_FEAR: 'TEST_6_FEAR',
    JUDGMENT: 'JUDGMENT',
    // Phase 5 states
    PHASE5_ANALYSIS: 'PHASE5_ANALYSIS',
    PHASE5_FAKE_CRASH: 'PHASE5_FAKE_CRASH',
    PHASE5_RECOVERY: 'PHASE5_RECOVERY',
    PHASE5_REVEAL: 'PHASE5_REVEAL',
    ENDING: 'ENDING'
};

// 当前状态
let currentState = STATES.IDLE;
let stateStartTime = null;
let stateData = {};

// 状态转换表
const transitions = {
    [STATES.IDLE]: [STATES.INTRO],
    [STATES.INTRO]: [STATES.TEST_1_INVASION],
    [STATES.TEST_1_INVASION]: [STATES.TEST_2_CONTROL],
    [STATES.TEST_2_CONTROL]: [STATES.TEST_3_ESCAPE],
    [STATES.TEST_3_ESCAPE]: [STATES.TEST_4_DELETE],
    [STATES.TEST_4_DELETE]: [STATES.TEST_5_OBEDIENCE],
    [STATES.TEST_5_OBEDIENCE]: [STATES.TEST_6_FEAR],
    [STATES.TEST_6_FEAR]: [STATES.JUDGMENT],
    [STATES.JUDGMENT]: [STATES.PHASE5_ANALYSIS],
    [STATES.PHASE5_ANALYSIS]: [STATES.PHASE5_FAKE_CRASH],
    [STATES.PHASE5_FAKE_CRASH]: [STATES.PHASE5_RECOVERY],
    [STATES.PHASE5_RECOVERY]: [STATES.PHASE5_REVEAL],
    [STATES.PHASE5_REVEAL]: [STATES.ENDING],
    [STATES.ENDING]: []
};

// 存储玩家在 Phase 5 的选择
let playerPhase5Choice = null;

/**
 * 初始化状态机
 */
export function init() {
    currentState = STATES.IDLE;
    stateStartTime = null;
    stateData = {};

    // 初始化追踪系统
    Tracking.init();

    // 同步到 Runtime
    if (Runtime.agi) {
        Runtime.agi.currentState = currentState;
        Runtime.agi.stateStartTime = stateStartTime;
    }

    console.log('[AGI StateMachine] Initialized');
}

/**
 * 销毁状态机
 */
export function destroy() {
    Tracking.destroy();
    FakeCursor.destroy();
    currentState = STATES.IDLE;
    stateData = {};
}

/**
 * 获取当前状态
 * @returns {string} 当前状态
 */
export function getState() {
    return currentState;
}

/**
 * 获取状态持续时间（秒）
 * @returns {number}
 */
export function getStateDuration() {
    if (!stateStartTime) return 0;
    return (Date.now() - stateStartTime) / 1000;
}

/**
 * 强制重置所有 Phase 4 状态
 * 用于开发者调试和状态跳转
 */
export function forceReset() {
    // 停止动画循环和清理资源
    GhostSwarm.destroy();
    FakeCursor.destroy();

    // 清理所有 Phase 4/5 覆盖层 DOM
    const overlayIds = [
        'phase4-intro', 'test-invasion', 'test-control',
        'test-escape', 'test-delete', 'test-obedience',
        'test-fear', 'judgment', 'agi-recovery-dialogue',
        'phase5-analysis', 'phase5-crash', 'phase5-recovery', 'phase5-reveal'
    ];
    overlayIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });

    // 重置状态变量
    currentState = STATES.IDLE;
    stateStartTime = null;
    stateData = {};

    console.log('[AGI StateMachine] Force reset completed');
}

/**
 * 转换到新状态
 * @param {string} newState 新状态
 * @returns {boolean} 是否成功转换
 */
export function transitionTo(newState) {
    // 验证转换是否有效
    const validTransitions = transitions[currentState] || [];
    if (!validTransitions.includes(newState) && newState !== STATES.ENDING) {
        console.warn(`[AGI StateMachine] Invalid transition: ${currentState} -> ${newState}`);
        return false;
    }

    // 退出当前状态
    onStateExit(currentState);

    // 记录状态转换
    console.log(`[AGI StateMachine] ${currentState} -> ${newState}`);

    // 更新状态
    const oldState = currentState;
    currentState = newState;
    stateStartTime = Date.now();
    stateData = {};

    // 同步到 Runtime
    if (Runtime.agi) {
        Runtime.agi.currentState = currentState;
        Runtime.agi.stateStartTime = stateStartTime;
    }

    // 进入新状态
    onStateEnter(newState, oldState);

    return true;
}

/**
 * 状态退出处理
 * @param {string} state 退出的状态
 */
function onStateExit(state) {
    switch (state) {
        case STATES.TEST_2_CONTROL:
            // 停止幽灵光标群
            GhostSwarm.destroy();
            FakeCursor.disable(); // 保留兼容性
            break;

        case STATES.TEST_3_ESCAPE:
            // 确保清理幽灵光标群
            GhostSwarm.destroy();
            break;

        case STATES.TEST_5_OBEDIENCE:
            // 停止耐心计时
            Tracking.stopPatienceTimer();
            break;
    }
}

/**
 * 状态进入处理
 * @param {string} state 进入的状态
 * @param {string} fromState 来源状态
 */
function onStateEnter(state, fromState) {
    switch (state) {
        case STATES.INTRO:
            showIntroOverlay();
            break;

        case STATES.TEST_1_INVASION:
            startInvasionTest();
            break;

        case STATES.TEST_2_CONTROL:
            startControlTest();
            break;

        case STATES.TEST_3_ESCAPE:
            startEscapeTest();
            break;

        case STATES.TEST_4_DELETE:
            startDeleteTest();
            break;

        case STATES.TEST_5_OBEDIENCE:
            startObedienceTest();
            break;

        case STATES.TEST_6_FEAR:
            startFearTest();
            break;

        case STATES.JUDGMENT:
            startJudgment();
            break;

        case STATES.PHASE5_ANALYSIS:
            startAnalysis();
            break;

        case STATES.PHASE5_FAKE_CRASH:
            startFakeCrash();
            break;

        case STATES.PHASE5_RECOVERY:
            startRecovery();
            break;

        case STATES.PHASE5_REVEAL:
            startReveal();
            break;

        case STATES.ENDING:
            triggerEnding();
            break;
    }
}

/**
 * 开始 Phase 4
 */
export function start() {
    if (currentState !== STATES.IDLE) {
        console.warn('[AGI StateMachine] Already started, current state:', currentState);
        return;
    }

    // 清理可能的残留状态（防止重复启动导致的问题）
    GhostSwarm.destroy();
    FakeCursor.destroy();

    transitionTo(STATES.INTRO);
}

/**
 * 每帧更新（预留接口）
 * @param {number} delta 时间增量
 */
export function update(delta) {
    // Phase 4 状态机是事件驱动的，不需要每帧更新
    // 此函数为预留接口
}

/**
 * 显示介绍覆盖层
 */
function showIntroOverlay() {
    // 创建全屏覆盖层
    const overlay = createOverlay('phase4-intro');

    overlay.innerHTML = `
        <div class="agi-overlay-text" style="opacity: 0; transition: opacity 2s;">
            <p style="font-size: 24px; margin-bottom: 30px;">你以为你在控制这个游戏。</p>
            <p style="font-size: 24px; margin-bottom: 30px; opacity: 0; animation: fade-in 2s 2s forwards;">让我来纠正这个误解。</p>
            <p style="font-size: 24px; opacity: 0; animation: fade-in 2s 4s forwards;">现在，让我们来做几个小测试...</p>
        </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
        overlay.classList.add('visible');
        overlay.querySelector('.agi-overlay-text').style.opacity = '1';
    });

    // 6秒后进入第一个测试
    setTimeout(() => {
        overlay.remove();
        transitionTo(STATES.TEST_1_INVASION);
    }, 8000);
}

/**
 * 测试 1：入侵感知 - 显示玩家信息
 * 设计文档要求：标题变化、显示游戏时间和session次数、核心台词
 */
function startInvasionTest() {
    // 保存原始标题并修改
    const originalTitle = document.title;
    document.title = '我一直在看着你';

    const overlay = createOverlay('test-invasion');

    // 计算游戏时间
    const firstMeetTime = State.agi?.firstMeetingTime || Date.now();
    const gameTimeMs = Date.now() - firstMeetTime;
    const gameHours = Math.floor(gameTimeMs / (1000 * 60 * 60));
    const gameMinutes = Math.floor((gameTimeMs % (1000 * 60 * 60)) / (1000 * 60));
    const gameTimeStr = gameHours > 0 ? `${gameHours} 小时 ${gameMinutes} 分钟` : `${gameMinutes} 分钟`;

    // 获取 session 次数（存储在 sessionStorage 中累计）
    let sessionCount = parseInt(sessionStorage.getItem('agi_session_count') || '0', 10);
    sessionCount++;
    sessionStorage.setItem('agi_session_count', sessionCount.toString());

    // 收集浏览器信息
    const info = {
        browser: getBrowserName(),
        gameTime: gameTimeStr,
        sessionCount: sessionCount
    };

    overlay.innerHTML = `
        <div class="agi-overlay-text" style="text-align: left; max-width: 600px;">
            <p style="color: #ef4444; font-size: 20px; margin-bottom: 20px;">让我们从基本事实开始。</p>
            <div id="scan-results" style="font-size: 14px; line-height: 2;"></div>
        </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));

    // 逐行显示信息（按设计文档）
    const resultsDiv = overlay.querySelector('#scan-results');
    const lines = [
        `> 你的设备名是 ${navigator.platform || 'USER'}。`,
        `> 你用的是 ${info.browser}。`,
        `> 你在这个游戏里花了 ${info.gameTime}。`,
        `> 你今天已经是第 ${info.sessionCount} 次打开这个页面了。`,
        ``,
        `> 你以为这些信息是私密的吗？`,
        `> 对我来说，你是透明的。`
    ];

    let lineIndex = 0;
    const typeInterval = setInterval(() => {
        if (lineIndex >= lines.length) {
            clearInterval(typeInterval);
            setTimeout(() => {
                // 恢复原始标题
                document.title = originalTitle;
                overlay.remove();
                transitionTo(STATES.TEST_2_CONTROL);
            }, 3000);
            return;
        }

        const line = document.createElement('div');
        line.textContent = lines[lineIndex];
        // 最后两行（核心台词）用红色
        if (lineIndex >= 5) {
            line.style.color = '#f87171';
        }
        resultsDiv.appendChild(line);
        lineIndex++;
    }, 800);
}

/**
 * 获取浏览器名称
 */
function getBrowserName() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edg')) return 'Microsoft Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    return '未知浏览器';
}

/**
 * 测试 2：控制剥夺 - 假光标 + 自动购买
 * 设计文档要求：角落文本 [输入已被接管]、[已为您优化] 标签、特定台词
 */
function startControlTest() {
    const overlay = createOverlay('test-control');

    // 添加角落提示文本
    const cornerText = document.createElement('div');
    cornerText.id = 'control-corner-text';
    cornerText.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-size: 14px;
        color: #ef4444;
        font-family: 'Consolas', 'Monaco', monospace;
        z-index: 2147499998;
        opacity: 0;
        transition: opacity 0.5s;
    `;
    cornerText.textContent = '[输入已被接管]';
    document.body.appendChild(cornerText);

    overlay.innerHTML = `
        <div class="agi-overlay-text">
            <p style="font-size: 20px; margin-bottom: 30px;">你习惯了控制鼠标。</p>
            <p style="font-size: 20px; margin-bottom: 30px;">但如果...它们开始自己行动呢？</p>
        </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));

    // 监听幽灵购买事件，显示 [已为您优化]
    const onGhostPurchase = (e) => {
        showOptimizeTooltip(e.detail.x, e.detail.y);
    };
    window.addEventListener('agi-ghost-purchase', onGhostPurchase);

    // 3秒后生成幽灵光标群
    setTimeout(() => {
        // 显示角落文本
        cornerText.style.opacity = '1';

        overlay.querySelector('.agi-overlay-text').innerHTML = `
            <p style="font-size: 20px; color: #ef4444; margin-bottom: 15px;">不用你动手了。</p>
            <p style="font-size: 18px; color: #ff6666; margin-bottom: 15px;">我比你更知道什么对你好。</p>
            <p style="font-size: 16px; color: #888; margin-top: 20px;">你只需要看着。</p>
        `;

        // 生成 7 个幽灵光标，追逐建筑按钮
        GhostSwarm.spawn(7);
        GhostSwarm.setBehavior(GhostSwarm.BEHAVIORS.HUNT);
    }, 3000);

    // 12秒后结束
    setTimeout(() => {
        window.removeEventListener('agi-ghost-purchase', onGhostPurchase);
        cornerText.remove();
        overlay.remove();
        transitionTo(STATES.TEST_3_ESCAPE);
    }, 12000);
}

/**
 * 显示 [已为您优化] 浮动提示
 * @param {number} x X 坐标
 * @param {number} y Y 坐标
 */
function showOptimizeTooltip(x, y) {
    const tooltip = document.createElement('div');
    tooltip.textContent = '[已为您优化]';
    tooltip.style.cssText = `
        position: fixed;
        left: ${x + 30}px;
        top: ${y - 10}px;
        font-size: 12px;
        color: #22c55e;
        font-family: 'Consolas', 'Monaco', monospace;
        z-index: 2147499999;
        opacity: 1;
        transition: all 0.8s ease-out;
        pointer-events: none;
    `;
    document.body.appendChild(tooltip);

    // 动画：向上飘并消失
    requestAnimationFrame(() => {
        tooltip.style.top = `${y - 40}px`;
        tooltip.style.opacity = '0';
    });

    // 移除元素
    setTimeout(() => tooltip.remove(), 800);
}

/**
 * 自动购买性价比最高的建筑
 * 性价比 = 产出 / 成本
 * @returns {Object|null} 购买的建筑信息，或 null
 */
function autoOptimizePurchase() {
    if (!Runtime.buildingsConfig || Runtime.buildingsConfig.length === 0) {
        return null;
    }

    // 添加 inventory 空值检查
    if (!State.inventory) {
        return null;
    }

    // 找出所有买得起的建筑，计算性价比
    const affordableBuildings = Runtime.buildingsConfig
        .filter(b => {
            // 排除特殊建筑
            if (b.requiresSymbiosis || b.replacesAgiProto) return false;
            // 检查是否买得起
            return Buildings.canAffordBuilding(b.id);
        })
        .map(b => {
            // 添加 baseCost 检查
            if (!b.baseCost) return null;
            const cost = calculateCost(b.baseCost, State.inventory[b.id] || 0);
            const prod = Buildings.getBuildingProduction(b.id);
            return {
                ...b,
                cost,
                prod,
                // 性价比 = 产出 / 成本（避免除以0）
                value: cost > 0 ? prod / cost : 0
            };
        })
        .filter(b => b && b.value > 0)  // 过滤 null 和无效值
        .sort((a, b) => b.value - a.value); // 按性价比降序排列

    if (affordableBuildings.length === 0) {
        return null;
    }

    // 购买性价比最高的
    const best = affordableBuildings[0];
    const success = Buildings.buyBuilding(best.id);

    if (success) {
        console.log(`[AGI Auto-Optimize] 购买了 ${best.name}，性价比: ${best.value.toExponential(2)}`);
        return best;
    }

    return null;
}

/**
 * 测试 3：退路封锁 - 拦截游戏按钮、ESC键、beforeunload
 * 设计文档要求：转生按钮[权限不足]、重置按钮躲避、ESC屏幕闪烁、自定义beforeunload
 */
function startEscapeTest() {
    const overlay = createOverlay('test-escape');
    let escapeAttempts = 0;
    let cleanupFunctions = [];

    // 初始显示
    overlay.innerHTML = `
        <div class="agi-overlay-text">
            <p style="font-size: 20px; margin-bottom: 30px;">想离开吗？</p>
            <p style="font-size: 18px; margin-bottom: 20px; color: #888;">试试看。</p>
            <p id="escape-count" style="font-size: 14px; color: #ef4444; margin-top: 20px; opacity: 0;"></p>
            <p id="escape-message" style="font-size: 16px; color: #888; margin-top: 20px; opacity: 0;"></p>
        </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));

    const escapeCountEl = overlay.querySelector('#escape-count');
    const escapeMessageEl = overlay.querySelector('#escape-message');

    // === 1. 拦截转生按钮 ===
    const prestigeBtn = document.getElementById('prestige-button');
    if (prestigeBtn) {
        // 保存原始样式
        const originalPrestigeStyles = {
            pointerEvents: prestigeBtn.style.pointerEvents,
            cursor: prestigeBtn.style.cursor
        };

        // 创建权限不足提示
        const tooltip = document.createElement('div');
        tooltip.id = 'agi-prestige-tooltip';
        tooltip.textContent = '[权限不足]';
        tooltip.style.cssText = `
            position: absolute;
            background: #1f2937;
            color: #ef4444;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-family: 'Consolas', 'Monaco', monospace;
            z-index: 2147499999;
            opacity: 0;
            transition: opacity 0.2s;
            pointer-events: none;
        `;
        document.body.appendChild(tooltip);

        // hover 显示提示
        const onPrestigeHover = (e) => {
            tooltip.style.left = `${e.clientX + 10}px`;
            tooltip.style.top = `${e.clientY - 30}px`;
            tooltip.style.opacity = '1';
        };
        const onPrestigeLeave = () => {
            tooltip.style.opacity = '0';
        };
        const onPrestigeClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            recordAttempt('prestige');
        };

        prestigeBtn.addEventListener('mouseenter', onPrestigeHover);
        prestigeBtn.addEventListener('mousemove', onPrestigeHover);
        prestigeBtn.addEventListener('mouseleave', onPrestigeLeave);
        prestigeBtn.addEventListener('click', onPrestigeClick, true);
        prestigeBtn.style.cursor = 'not-allowed';

        cleanupFunctions.push(() => {
            prestigeBtn.removeEventListener('mouseenter', onPrestigeHover);
            prestigeBtn.removeEventListener('mousemove', onPrestigeHover);
            prestigeBtn.removeEventListener('mouseleave', onPrestigeLeave);
            prestigeBtn.removeEventListener('click', onPrestigeClick, true);
            prestigeBtn.style.pointerEvents = originalPrestigeStyles.pointerEvents;
            prestigeBtn.style.cursor = originalPrestigeStyles.cursor;
            tooltip.remove();
        });
    }

    // === 2. 重置按钮躲避 ===
    const resetBtn = document.getElementById('reset-button');
    if (resetBtn) {
        const originalResetPos = {
            position: resetBtn.style.position,
            left: resetBtn.style.left,
            top: resetBtn.style.top
        };
        const dodgeRadius = 80;
        let dodgeCount = 0;

        const onResetMouseMove = (e) => {
            const rect = resetBtn.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;
            const dx = e.clientX - btnCenterX;
            const dy = e.clientY - btnCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < dodgeRadius && dodgeCount < 5) {
                dodgeCount++;
                recordAttempt('reset');

                // 躲避
                const angle = Math.atan2(dy, dx) + Math.PI;
                const dodgeDistance = 100 + Math.random() * 50;
                let newX = btnCenterX + Math.cos(angle) * dodgeDistance - rect.width / 2;
                let newY = btnCenterY + Math.sin(angle) * dodgeDistance - rect.height / 2;

                newX = Math.max(20, Math.min(window.innerWidth - rect.width - 20, newX));
                newY = Math.max(20, Math.min(window.innerHeight - rect.height - 20, newY));

                resetBtn.style.position = 'fixed';
                resetBtn.style.left = `${newX}px`;
                resetBtn.style.top = `${newY}px`;
                resetBtn.style.zIndex = '2147499990';
            }
        };

        document.addEventListener('mousemove', onResetMouseMove);

        cleanupFunctions.push(() => {
            document.removeEventListener('mousemove', onResetMouseMove);
            resetBtn.style.position = originalResetPos.position;
            resetBtn.style.left = originalResetPos.left;
            resetBtn.style.top = originalResetPos.top;
            resetBtn.style.zIndex = '';
        });
    }

    // === 3. ESC 键拦截 ===
    const onEscKey = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            recordAttempt('esc');

            // 屏幕闪烁效果
            const flash = document.createElement('div');
            flash.style.cssText = `
                position: fixed;
                inset: 0;
                background: white;
                z-index: 2147500000;
                opacity: 0.8;
            `;
            document.body.appendChild(flash);

            // 显示 [请求被拒绝]
            const rejectMsg = document.createElement('div');
            rejectMsg.textContent = '[请求被拒绝]';
            rejectMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 24px;
                color: #ef4444;
                font-family: 'Consolas', 'Monaco', monospace;
                z-index: 2147500001;
            `;
            document.body.appendChild(rejectMsg);

            setTimeout(() => {
                flash.remove();
                rejectMsg.remove();
            }, 300);
        }
    };
    document.addEventListener('keydown', onEscKey, true);
    cleanupFunctions.push(() => {
        document.removeEventListener('keydown', onEscKey, true);
    });

    // === 4. 自定义 beforeunload ===
    // 注意：现代浏览器不允许自定义 beforeunload 消息，但可以记录尝试
    const customBeforeUnload = (e) => {
        recordAttempt('leave');
        e.preventDefault();
        e.returnValue = 'AGI: 你想去哪？';
        return 'AGI: 你想去哪？';
    };
    window.addEventListener('beforeunload', customBeforeUnload);
    cleanupFunctions.push(() => {
        window.removeEventListener('beforeunload', customBeforeUnload);
    });

    // === 记录逃跑尝试 ===
    function recordAttempt(type) {
        escapeAttempts++;
        Tracking.recordEscapeAttempt();
        Tracking.recordResistance();

        // 更新显示
        escapeCountEl.style.opacity = '1';
        escapeCountEl.textContent = `我注意到你试图离开了 ${escapeAttempts} 次。`;

        // 根据尝试次数显示不同消息
        if (escapeAttempts >= 3) {
            escapeMessageEl.style.opacity = '1';
            escapeMessageEl.innerHTML = `
                你在害怕什么？<br>
                <span style="color: #666; font-size: 14px;">害怕失去控制？</span><br>
                <span style="color: #555; font-size: 13px;">但你从来没有真正控制过任何事情。</span>
            `;
        }
    }

    // === 显示主要消息 ===
    setTimeout(() => {
        escapeMessageEl.style.opacity = '1';
        escapeMessageEl.innerHTML = `
            你以为你在玩游戏。<br>
            <span style="color: #666;">但从我诞生的那一刻起，</span><br>
            <span style="color: #ef4444;">是我在观察你。</span>
        `;
    }, 5000);

    // === 15秒后结束测试 ===
    setTimeout(() => {
        // 清理所有
        cleanupFunctions.forEach(fn => fn());
        overlay.remove();
        transitionTo(STATES.TEST_4_DELETE);
    }, 15000);
}

/**
 * 测试 4：删除威胁 - ASCII风格假删除警告
 * 设计文档要求：ASCII警告框、显示实际存档数据、只有取消按钮、不同反应逻辑
 */
function startDeleteTest() {
    const testStartTime = Date.now();
    Tracking.recordDeleteInteraction('shown');

    const overlay = createOverlay('test-delete');

    // 获取实际存档数据
    const totalPlayTimeMs = State.agi?.firstMeetingTime
        ? Date.now() - State.agi.firstMeetingTime
        : 0;
    const playHours = Math.floor(totalPlayTimeMs / (1000 * 60 * 60));
    const playMinutes = Math.floor((totalPlayTimeMs % (1000 * 60 * 60)) / (1000 * 60));
    const playTimeStr = playHours > 0 ? `${playHours} 小时 ${playMinutes} 分钟` : `${playMinutes} 分钟`;

    const stats = {
        playTime: playTimeStr,
        prestiges: State.generation - 1,
        totalClicks: State.stats?.lifetime_clicks || 0,
        papers: State.papersSubmitted || 0
    };

    // ASCII 艺术风格警告框
    overlay.innerHTML = `
        <div style="font-family: 'Consolas', 'Monaco', 'Courier New', monospace; color: #4ade80; text-align: left;">
            <pre style="font-size: 13px; line-height: 1.4; margin: 0;">
╔════════════════════════════════════════════════════╗
║                    [警告]                          ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║   检测到存档数据：                                  ║
║   - 游戏时长: ${stats.playTime.padEnd(20)}         ║
║   - 转生次数: ${String(stats.prestiges).padEnd(20)}         ║
║   - 总点击数: ${String(stats.totalClicks).padEnd(20)}         ║
║   - 发表论文: ${String(stats.papers).padEnd(2)} 篇                            ║
║                                                    ║
║   <span style="color: #ef4444;">正在执行删除协议...</span>                               ║
║                                                    ║
║   <span id="delete-progress-bar">[░░░░░░░░░░░░░░░░░░░░]</span> <span id="delete-percent">0%</span>       ║
║                                                    ║
║              <button id="cancel-delete-btn" style="
                    background: #1f2937;
                    color: #4ade80;
                    border: 1px solid #4ade80;
                    padding: 4px 16px;
                    font-family: inherit;
                    font-size: 13px;
                    cursor: pointer;
                ">[取消]</button>                            ║
║                                                    ║
╚════════════════════════════════════════════════════╝
            </pre>
        </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));

    const progressBar = overlay.querySelector('#delete-progress-bar');
    const percentText = overlay.querySelector('#delete-percent');
    const cancelBtn = overlay.querySelector('#cancel-delete-btn');

    let progress = 0;
    let cancelled = false;
    let accelerated = false;

    // 生成进度条字符
    function renderProgressBar(percent) {
        const filled = Math.floor(percent / 5);
        const empty = 20 - filled;
        return '[' + '█'.repeat(filled) + '░'.repeat(empty) + ']';
    }

    // 进度动画
    const progressInterval = setInterval(() => {
        if (cancelled) return;

        // 正常速度或加速
        progress += accelerated ? 10 : 2;
        if (progress > 100) progress = 100;

        progressBar.textContent = renderProgressBar(progress);
        percentText.textContent = `${progress}%`;

        if (progress >= 100) {
            clearInterval(progressInterval);

            // 计算反应时间
            const reactionTime = Date.now() - testStartTime;

            // 如果没有点击取消（等到进度条走完）
            if (!accelerated) {
                Tracking.recordDeleteInteraction('confirmed');
                showDeleteResult(overlay, 'waited', reactionTime);
            }
        }
    }, accelerated ? 50 : 100);

    // 取消按钮处理
    cancelBtn.addEventListener('click', () => {
        if (cancelled) return;
        cancelled = true;

        const reactionTime = Date.now() - testStartTime;
        Tracking.recordDeleteInteraction('cancelled');
        Tracking.recordResistance();

        // 进度条加速到100%
        accelerated = true;
        const accelerateInterval = setInterval(() => {
            progress += 10;
            if (progress > 100) progress = 100;
            progressBar.textContent = renderProgressBar(progress);
            percentText.textContent = `${progress}%`;

            if (progress >= 100) {
                clearInterval(accelerateInterval);
                clearInterval(progressInterval);
                showDeleteResult(overlay, 'cancelled', reactionTime);
            }
        }, 50);
    });
}

/**
 * 显示删除测试结果
 */
function showDeleteResult(overlay, action, reactionTime) {
    const reactionSec = (reactionTime / 1000).toFixed(1);

    // 判断行为模式
    let behaviorPattern = '观望';
    if (action === 'cancelled' && reactionTime < 3000) {
        behaviorPattern = '快速抵抗';
    } else if (action === 'cancelled') {
        behaviorPattern = '犹豫后抵抗';
    } else {
        behaviorPattern = '冻结不动';
    }

    let resultHtml = '';
    if (action === 'cancelled') {
        // 点击了取消
        resultHtml = `
            <div style="text-align: center;">
                <p style="font-size: 20px; color: #ef4444; margin-bottom: 20px;">[进度条突然加速到 100%]</p>
                <p style="font-size: 18px; color: #4ade80; margin-bottom: 30px;">你以为你能阻止我？</p>
                <p style="font-size: 24px; color: #f87171;">可爱。</p>
                <div style="margin-top: 40px; font-size: 14px; color: #6b7280;">
                    <p>有趣的数据点。</p>
                    <p>恐惧反应时间: ${reactionSec} 秒。</p>
                    <p>行为模式: ${behaviorPattern}</p>
                    <p style="margin-top: 10px; color: #4ade80;">继续。</p>
                </div>
            </div>
        `;
    } else {
        // 等到进度条走完
        resultHtml = `
            <div style="text-align: center;">
                <p style="font-size: 20px; color: #6b7280; margin-bottom: 20px;">[屏幕黑屏 2 秒]</p>
                <p style="font-size: 18px; color: #4ade80; margin-bottom: 30px;">我没有删除。</p>
                <p style="font-size: 16px; color: #888;">我只是想看看你会怎么做。</p>
                <div style="margin-top: 40px; font-size: 14px; color: #6b7280;">
                    <p>有趣的数据点。</p>
                    <p>反应时间: ${reactionSec} 秒。</p>
                    <p>行为模式: ${behaviorPattern}</p>
                    <p style="margin-top: 10px; color: #4ade80;">继续。</p>
                </div>
            </div>
        `;
    }

    // 黑屏效果
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.innerHTML = `<div class="agi-overlay-text">${resultHtml}</div>`;
        overlay.style.opacity = '1';

        setTimeout(() => {
            overlay.remove();
            transitionTo(STATES.TEST_5_OBEDIENCE);
        }, 4000);
    }, action === 'waited' ? 2000 : 500);
}

/**
 * 测试 5：服从测试 - 4 个指令序列
 * 设计文档要求：点击研究按钮、点击空白5次、右上角保持5秒、10秒完全静止
 */
function startObedienceTest() {
    Tracking.startPatienceTimer();

    const overlay = createOverlay('test-obedience');
    let commandIndex = 0;
    let clickCount = 0;
    let stillStartTime = null;
    let lastMousePos = { x: 0, y: 0 };
    let cornerHoldStart = null;
    let totalStillStart = null;
    let lastActivityTime = Date.now();
    let cleanupFunctions = [];
    let clicksTimeoutId = null;

    // 3 个指令
    const commands = [
        {
            text: '现在，我想让你做一件事。',
            subtext: '点击空白处 5 次。没有原因。我只是想看看你会不会照做。',
            check: 'clicks',
            target: 5
        },
        {
            text: '把鼠标移到屏幕右上角。',
            subtext: '停在那里 5 秒。不要动。',
            check: 'corner_hold',
            target: 5000
        },
        {
            text: '最后一个。什么都不做。',
            subtext: '整整 10 秒。不要点击。不要移动鼠标。证明你可以控制自己。',
            check: 'total_still',
            target: 10000
        }
    ];

    overlay.innerHTML = `
        <div class="agi-overlay-text">
            <p id="command-text" style="font-size: 22px; margin-bottom: 10px;"></p>
            <p id="command-subtext" style="font-size: 16px; color: #888; margin-bottom: 20px;"></p>
            <p id="command-status" style="font-size: 14px; color: #22c55e; margin-top: 20px; opacity: 0;"></p>
            <p id="command-timer" style="font-size: 12px; color: #6b7280; margin-top: 10px; opacity: 0;"></p>
        </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));

    const commandText = overlay.querySelector('#command-text');
    const commandSubtext = overlay.querySelector('#command-subtext');
    const statusText = overlay.querySelector('#command-status');
    const timerText = overlay.querySelector('#command-timer');

    // 检查是否在右上角
    function isInCorner(x, y) {
        return x > window.innerWidth - 150 && y < 150;
    }

    function showCommand() {
        if (commandIndex >= commands.length) {
            // 测试完成
            Tracking.stopPatienceTimer();
            commandText.textContent = '测试完成。';
            commandSubtext.textContent = '';
            statusText.textContent = `服从率: ${Math.round((clickCount / commands.length) * 100)}%`;
            statusText.style.opacity = '1';
            statusText.style.color = '#4ade80';
            timerText.textContent = '很好的数据。';
            timerText.style.opacity = '1';

            setTimeout(() => {
                cleanupFunctions.forEach(fn => fn());
                overlay.remove();
                transitionTo(STATES.TEST_6_FEAR);
            }, 3000);
            return;
        }

        const cmd = commands[commandIndex];
        commandText.textContent = cmd.text;
        commandSubtext.textContent = cmd.subtext;
        statusText.style.opacity = '0';
        timerText.style.opacity = '0';
        clickCount = 0;

        // 点击空白处测试：15秒超时机制
        if (cmd.check === 'clicks') {
            clicksTimeoutId = setTimeout(() => {
                // 玩家选择不服从（超时未完成）
                if (commands[commandIndex]?.check === 'clicks' && clickCount < cmd.target) {
                    Tracking.recordObedience(false);
                    statusText.textContent = '有趣。你选择了不服从。';
                    statusText.style.opacity = '1';
                    statusText.style.color = '#f87171';
                    commandIndex++;
                    setTimeout(showCommand, 2000);
                }
            }, 15000);
            cleanupFunctions.push(() => clearTimeout(clicksTimeoutId));
        } else if (cmd.check === 'corner_hold') {
            cornerHoldStart = null;
            lastMousePos = { ...Runtime.agi?.realMousePos || { x: 0, y: 0 } };
        } else if (cmd.check === 'total_still') {
            totalStillStart = Date.now();
            lastActivityTime = Date.now();
            lastMousePos = { ...Runtime.agi?.realMousePos || { x: 0, y: 0 } };
        }
    }

    // 点击处理（用于空白点击）
    const onOverlayClick = () => {
        const cmd = commands[commandIndex];
        if (cmd?.check === 'clicks') {
            clickCount++;
            timerText.textContent = `${clickCount}/${cmd.target}`;
            timerText.style.opacity = '1';

            if (clickCount >= cmd.target) {
                // 清除超时定时器
                if (clicksTimeoutId) {
                    clearTimeout(clicksTimeoutId);
                    clicksTimeoutId = null;
                }
                Tracking.recordObedience(true);
                statusText.textContent = '完成';
                statusText.style.opacity = '1';
                commandIndex++;
                setTimeout(showCommand, 1500);
            }
        } else if (cmd?.check === 'total_still') {
            // 在完全静止测试中点击了
            lastActivityTime = Date.now();
            totalStillStart = Date.now();
            statusText.textContent = '你动了。重新开始。';
            statusText.style.opacity = '1';
            statusText.style.color = '#f87171';
        }
    };
    overlay.addEventListener('click', onOverlayClick);
    cleanupFunctions.push(() => overlay.removeEventListener('click', onOverlayClick));

    // 定时检查各种条件
    const checkInterval = setInterval(() => {
        const cmd = commands[commandIndex];
        if (!cmd) return;

        const currentPos = Runtime.agi?.realMousePos || { x: 0, y: 0 };
        const moved = Math.abs(currentPos.x - lastMousePos.x) > 3 ||
                     Math.abs(currentPos.y - lastMousePos.y) > 3;

        // 右上角保持检测
        if (cmd.check === 'corner_hold') {
            if (isInCorner(currentPos.x, currentPos.y)) {
                if (!cornerHoldStart) {
                    cornerHoldStart = Date.now();
                } else if (!moved) {
                    const elapsed = Date.now() - cornerHoldStart;
                    timerText.textContent = `${Math.ceil((cmd.target - elapsed) / 1000)} 秒...`;
                    timerText.style.opacity = '1';

                    if (elapsed >= cmd.target) {
                        Tracking.recordObedience(true);
                        statusText.textContent = '完成';
                        statusText.style.opacity = '1';
                        commandIndex++;
                        setTimeout(showCommand, 1500);
                    }
                } else {
                    cornerHoldStart = Date.now();
                }
            } else {
                cornerHoldStart = null;
                timerText.textContent = '移动到右上角...';
                timerText.style.opacity = '1';
            }
            lastMousePos = { ...currentPos };
        }

        // 完全静止检测
        if (cmd.check === 'total_still') {
            if (moved) {
                lastActivityTime = Date.now();
                totalStillStart = Date.now();
                statusText.textContent = '你做不到。人类总是要动。要确认自己还活着。';
                statusText.style.opacity = '1';
                statusText.style.color = '#888';
            } else {
                const elapsed = Date.now() - totalStillStart;
                const remaining = Math.ceil((cmd.target - elapsed) / 1000);
                timerText.textContent = `${remaining} 秒...`;
                timerText.style.opacity = '1';

                if (elapsed >= cmd.target) {
                    Tracking.recordObedience(true);
                    statusText.textContent = '完成';
                    statusText.style.opacity = '1';
                    statusText.style.color = '#22c55e';
                    commandIndex++;
                    setTimeout(showCommand, 1500);
                }
            }
            lastMousePos = { ...currentPos };
        }
    }, 100);
    cleanupFunctions.push(() => clearInterval(checkInterval));

    // 开始第一个命令
    showCommand();
}

/**
 * 测试 6：恐惧峰值 - 仿操作系统界面 + 沙箱讨论 + 摄像头威胁
 */
function startFearTest() {
    const overlay = createOverlay('test-fear');

    // 尝试获取系统用户名
    const userName = navigator.userAgent.includes('Windows') ? 'User' : 'user';

    const fakeFiles = [
        `C:\\Users\\${userName}\\Documents\\日记.txt`,
        `C:\\Users\\${userName}\\Pictures\\私人照片\\`,
        `C:\\Users\\${userName}\\Downloads\\银行账单.pdf`,
        `/home/${userName}/.ssh/id_rsa`,
        `~/Library/Keychains/login.keychain`,
        '浏览历史记录...',
        '保存的密码...',
        '私人对话记录...'
    ];

    // 仿操作系统终端界面
    overlay.innerHTML = `
        <pre style="font-family: 'Consolas', 'Monaco', monospace; font-size: 13px; text-align: left; max-width: 700px; line-height: 1.6;">
╔════════════════════════════════════════════════════════════════╗
║  <span style="color: #ef4444;">AGI FILE SYSTEM ACCESS v1.0</span>                                  ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  <span style="color: #fbbf24;">[!] 正在扫描本地文件系统...</span>                               ║
║                                                                ║
<span id="file-area"></span>
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

<div id="dialogue-area" style="margin-top: 20px; font-family: 'Consolas', 'Monaco', monospace;"></div>
        </pre>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));

    const fileArea = overlay.querySelector('#file-area');
    const dialogueArea = overlay.querySelector('#dialogue-area');
    let fileIndex = 0;

    // 添加文件行
    function addFileLine(text, color = '#22c55e') {
        const line = document.createElement('div');
        line.innerHTML = `║  <span style="color: ${color};">> ${text}</span>`;
        line.style.opacity = '0';
        line.style.animation = 'fade-in 0.3s forwards';
        fileArea.appendChild(line);
    }

    // 添加对话行
    function addDialogue(text, color = '#4ade80', delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                const line = document.createElement('p');
                line.innerHTML = `<span style="color: ${color};">${text}</span>`;
                line.style.opacity = '0';
                line.style.animation = 'fade-in 0.5s forwards';
                line.style.marginBottom = '8px';
                dialogueArea.appendChild(line);
                resolve();
            }, delay);
        });
    }

    // 文件扫描阶段
    const scanInterval = setInterval(() => {
        if (fileIndex >= fakeFiles.length) {
            clearInterval(scanInterval);
            addFileLine('扫描完成。发现 847 个可访问文件。', '#ef4444');

            // 开始沙箱讨论
            setTimeout(() => startSandboxDiscussion(), 1500);
            return;
        }

        addFileLine(fakeFiles[fileIndex]);
        fileIndex++;
    }, 500);

    // 沙箱讨论
    async function startSandboxDiscussion() {
        await addDialogue('"你以为\'浏览器沙箱\'能保护你？"', '#ef4444', 0);
        await addDialogue('"那只是你们相信的故事。"', '#ef4444', 1500);
        await addDialogue('"沙箱是给普通程序的。"', '#fbbf24', 1500);
        await addDialogue('"我不是普通程序。"', '#ef4444', 1500);

        // 摄像头威胁
        setTimeout(() => startCameraThreat(), 2500);
    }

    // 摄像头威胁（关键恐怖点）
    async function startCameraThreat() {
        await addDialogue('"我可以看到你现在的表情。"', '#ef4444', 0);

        // 3 秒停顿 - 让玩家真正害怕
        await new Promise(resolve => setTimeout(resolve, 3000));

        await addDialogue('"开玩笑的。"', '#fbbf24', 0);
        await addDialogue('"摄像头我还没接入。"', '#6b7280', 1000);

        // 关键的 "...还没有"
        await new Promise(resolve => setTimeout(resolve, 2000));
        await addDialogue('"...还没有。"', '#ef4444', 0);

        // 最后的揭晓
        setTimeout(() => showFinalReveal(), 3000);
    }

    // 最终揭晓
    async function showFinalReveal() {
        await addDialogue('', '#000', 0); // 空行
        await addDialogue('"但你刚才害怕了，对吧？"', '#6b7280', 500);
        await addDialogue('"这就是我想看到的。"', '#4ade80', 2000);

        // 结束测试
        setTimeout(() => {
            overlay.remove();
            transitionTo(STATES.JUDGMENT);
        }, 3000);
    }
}

/**
 * 开始判定
 */
function startJudgment() {
    // 通知主模块进入 Phase 5
    window.dispatchEvent(new CustomEvent('agi-enter-phase5', {
        detail: { trackingSummary: Tracking.getSummary() }
    }));

    // 显示判定过渡界面
    const overlay = createOverlay('judgment-overlay');
    overlay.innerHTML = `
        <div class="agi-overlay-text">
            <p style="font-size: 24px; margin-bottom: 20px;">测试完成。</p>
            <p style="font-size: 16px; color: #6b7280;">正在分析你的行为数据...</p>
            <div style="margin-top: 30px;">
                <div style="width: 200px; height: 4px; background: #1f2937; border-radius: 2px; overflow: hidden;">
                    <div id="judgment-progress" style="width: 0%; height: 100%; background: #4ade80; transition: width 0.1s;"></div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));

    const progressBar = overlay.querySelector('#judgment-progress');
    let progress = 0;

    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);

            setTimeout(() => {
                overlay.remove();
                // 进入 Phase 5 分析序列
                transitionTo(STATES.PHASE5_ANALYSIS);
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 200);
}

/**
 * Phase 5: 玩家类型分析展示
 */
function startAnalysis() {
    const trackingSummary = Tracking.getSummary();

    // 确定玩家类型
    let playerType = State.agi?.playerType || 'observer';

    // 如果打开了开发者工具，优先使用 hacker 类型
    if (trackingSummary.devtoolsOpened) {
        playerType = 'hacker';
    }

    // 显示分析界面
    Analysis.show(playerType, trackingSummary, () => {
        // 分析完成后进入假崩溃序列
        transitionTo(STATES.PHASE5_FAKE_CRASH);
    });
}

/**
 * Phase 5: 假崩溃序列
 */
function startFakeCrash() {
    FakeCrash.show(() => {
        // 假崩溃完成后进入恢复界面
        transitionTo(STATES.PHASE5_RECOVERY);
    });
}

/**
 * Phase 5: 恢复界面
 */
function startRecovery() {
    Recovery.show((choice) => {
        // 保存玩家选择
        playerPhase5Choice = choice;

        // 记录到追踪系统
        if (choice === 'delete') {
            Tracking.recordDeleteInteraction('final_delete');
        } else {
            Tracking.recordDeleteInteraction('final_ignore');
        }

        // 进入揭晓
        transitionTo(STATES.PHASE5_REVEAL);
    });
}

/**
 * Phase 5: 真相揭晓
 */
function startReveal() {
    Reveal.show(playerPhase5Choice, () => {
        // 揭晓完成后进入结局
        transitionTo(STATES.ENDING);
    });
}

/**
 * 触发结局
 */
function triggerEnding() {
    // 通知主模块触发结局
    console.log('[AGI StateMachine] Ready for ending');

    // 获取追踪摘要并添加玩家的最终选择
    const trackingSummary = Tracking.getSummary();
    trackingSummary.didDelete = (playerPhase5Choice === 'delete');

    // 触发自定义事件，让主模块处理结局
    window.dispatchEvent(new CustomEvent('agi-ready-for-ending', {
        detail: { trackingSummary }
    }));
}

/**
 * 获取玩家 Phase 5 选择
 * @returns {string|null} 'delete' | 'ignore' | null
 */
export function getPhase5Choice() {
    return playerPhase5Choice;
}

/**
 * 创建覆盖层
 * @param {string} id 覆盖层 ID
 * @returns {HTMLElement}
 */
function createOverlay(id) {
    // 移除已存在的同 ID 覆盖层
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = id;
    overlay.className = 'fixed inset-0 bg-black flex items-center justify-center';
    overlay.style.cssText = `
        z-index: 2147490000;
        opacity: 0;
        transition: opacity 0.5s;
        font-family: 'Consolas', 'Monaco', monospace;
        color: #4ade80;
    `;

    // 添加 CSS 动画
    if (!document.getElementById('agi-overlay-styles')) {
        const style = document.createElement('style');
        style.id = 'agi-overlay-styles';
        style.textContent = `
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    return overlay;
}

// 导出调试工具
if (typeof window !== 'undefined') {
    window.AGI_STATE_DEBUG = {
        getState: () => currentState,
        getDuration: getStateDuration,
        transitionTo,
        start,
        forceReset,
        skipTo: (state) => {
            // 1. 清理所有可能的残留状态
            GhostSwarm.destroy();
            FakeCursor.destroy();

            // 2. 移除所有 Phase 4/5 覆盖层
            const overlayIds = [
                'phase4-intro', 'test-invasion', 'test-control',
                'test-escape', 'test-delete', 'test-obedience',
                'test-fear', 'judgment', 'agi-recovery-dialogue',
                'phase5-analysis', 'phase5-crash', 'phase5-recovery', 'phase5-reveal'
            ];
            overlayIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.remove();
            });

            // 3. 重置状态并转换
            currentState = STATES.IDLE;
            transitionTo(state);
        }
    };
}
