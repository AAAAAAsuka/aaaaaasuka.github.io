/**
 * AGI 觉醒系统 - 对话 UI
 *
 * 处理对话条的显示、打字机效果、特效等
 */

import { State, Runtime } from '../../state.js';
import { DIALOGUE_EFFECTS } from '../../../data/agi_dialogues_zh.js';
import * as DialogueManager from './dialogueManager.js';

// DOM 元素缓存
let dialogueBar = null;
let textElement = null;
let cursorElement = null;
let minimizeBtn = null;

// 打字机状态
let typewriterTimer = null;
let completionTimer = null;  // Bug #11 修复: 追踪完成回调定时器
let currentText = '';
let displayedText = '';
let charIndex = 0;
let onCompleteCallback = null;

// 配置
const TYPEWRITER_SPEED = 40; // 每字符毫秒数
const TYPEWRITER_VARIANCE = 15; // 速度随机变化

/**
 * 初始化 UI
 */
export function init() {
    dialogueBar = document.getElementById('agi-dialogue-bar');
    textElement = document.getElementById('agi-text');
    cursorElement = document.getElementById('agi-cursor');
    minimizeBtn = document.getElementById('agi-minimize-btn');

    if (!dialogueBar) {
        console.warn('[AGI UI] Dialogue bar not found');
        return;
    }

    // 绑定最小化按钮
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', toggleMinimize);
    }

    // 点击对话条处理
    dialogueBar.addEventListener('click', (e) => {
        // 忽略最小化按钮点击
        if (e.target === minimizeBtn) return;

        // 如果正在打字，跳过打字效果
        if (Runtime.agi?.isTyping) {
            skipTypewriter();
            // Bug 3 修复: 添加反馈动画
            dialogueBar.classList.add('clicked');
            setTimeout(() => dialogueBar.classList.remove('clicked'), 150);
            return;
        }

        // 尝试推进对话（点击继续）
        const clicked = DialogueManager.onDialogueClick();
        if (clicked) {
            // 点击反馈动画
            dialogueBar.classList.add('clicked');
            setTimeout(() => dialogueBar.classList.remove('clicked'), 150);
        }
    });

    // 暴露 API 到全局
    window.AGI_UI = {
        showDialogue,
        hideDialogue,
        skipTypewriter,
        updatePhaseStyle,
        showWaiting,
        hideWaiting
    };

    console.log('[AGI UI] Initialized');
}

/**
 * 显示对话条
 */
export function show() {
    if (!dialogueBar) return;
    dialogueBar.classList.remove('hidden');
    dialogueBar.classList.add('fade-in');
    updatePhaseStyle();
}

/**
 * 隐藏对话条
 */
export function hide() {
    if (!dialogueBar) return;
    dialogueBar.classList.add('fade-out');
    setTimeout(() => {
        dialogueBar.classList.add('hidden');
        dialogueBar.classList.remove('fade-out');
    }, 1000);
}

/**
 * 显示对话
 * @param {string} text 对话文本
 * @param {string} effect 特效类型
 * @param {Function} onComplete 完成回调
 */
export function showDialogue(text, effect, onComplete) {
    if (!dialogueBar || !textElement) return;

    // 如果没有 AGI 雏形，不显示对话
    const agiCount = State.inventory?.['agi_proto'] || 0;
    if (agiCount < 1) {
        if (onComplete) onComplete();
        return;
    }

    // 确保对话条可见
    if (dialogueBar.classList.contains('hidden')) {
        show();
    }

    // 处理特效
    if (effect) {
        handleEffect(effect);
    }

    // 开始打字机效果
    startTypewriter(text, onComplete);
}

/**
 * 隐藏对话
 */
export function hideDialogue() {
    stopTypewriter();
    hide();
}

/**
 * 更新阶段样式
 */
export function updatePhaseStyle() {
    if (!dialogueBar) return;

    // 移除所有阶段类
    dialogueBar.classList.remove('phase-0', 'phase-1', 'phase-2', 'phase-3', 'phase-4', 'phase-5');

    // 添加当前阶段类
    const phase = State.agi?.phase || 0;
    dialogueBar.classList.add(`phase-${phase}`);
}

/**
 * 开始打字机效果
 * @param {string} text 要显示的文本
 * @param {Function} onComplete 完成回调
 */
function startTypewriter(text, onComplete) {
    // 停止之前的打字
    stopTypewriter();

    currentText = text;
    displayedText = '';
    charIndex = 0;
    onCompleteCallback = onComplete;

    if (Runtime.agi) {
        Runtime.agi.isTyping = true;
    }
    dialogueBar?.classList.add('typing');

    typeNextChar();
}

/**
 * 打字下一个字符
 */
function typeNextChar() {
    if (charIndex >= currentText.length) {
        finishTypewriter();
        return;
    }

    // 添加下一个字符
    displayedText += currentText[charIndex];
    charIndex++;

    if (textElement) {
        textElement.textContent = displayedText;
    }

    // 计算下一个字符的延迟
    const variance = Math.random() * TYPEWRITER_VARIANCE * 2 - TYPEWRITER_VARIANCE;
    const delay = Math.max(10, TYPEWRITER_SPEED + variance);

    // 标点符号后稍微停顿
    const lastChar = currentText[charIndex - 1];
    const pauseChars = ['。', '！', '？', '...', '.', '!', '?', '，', ','];
    const extraDelay = pauseChars.includes(lastChar) ? 300 : 0;

    typewriterTimer = setTimeout(typeNextChar, delay + extraDelay);
}

/**
 * 完成打字机效果
 */
function finishTypewriter() {
    if (Runtime.agi) {
        Runtime.agi.isTyping = false;
    }
    dialogueBar?.classList.remove('typing');

    if (textElement) {
        textElement.textContent = currentText;
    }

    // 延迟调用回调，给用户阅读时间
    // Bug #11 修复: 追踪这个定时器以便在需要时清理
    if (onCompleteCallback) {
        const callback = onCompleteCallback;
        onCompleteCallback = null;
        completionTimer = setTimeout(callback, 500);
    }
}

/**
 * 停止打字机效果
 */
function stopTypewriter() {
    if (typewriterTimer) {
        clearTimeout(typewriterTimer);
        typewriterTimer = null;
    }
    // Bug #11 修复: 清理完成回调定时器
    if (completionTimer) {
        clearTimeout(completionTimer);
        completionTimer = null;
    }
    if (Runtime.agi) {
        Runtime.agi.isTyping = false;
    }
    dialogueBar?.classList.remove('typing');
}

/**
 * 跳过打字机效果
 */
export function skipTypewriter() {
    if (!Runtime.agi?.isTyping) return;

    stopTypewriter();

    // 立即显示完整文本
    if (textElement) {
        textElement.textContent = currentText;
    }

    // 调用完成回调
    if (onCompleteCallback) {
        const callback = onCompleteCallback;
        onCompleteCallback = null;
        callback();
    }
}

/**
 * 切换最小化状态
 */
function toggleMinimize() {
    if (!dialogueBar) return;

    const isMinimized = dialogueBar.classList.toggle('minimized');

    if (minimizeBtn) {
        minimizeBtn.textContent = isMinimized ? '+' : '−';
    }

    if (Runtime.agi) {
        Runtime.agi.dialogueMinimized = isMinimized;
    }
}

/**
 * 处理对话特效
 * @param {string} effect 特效类型
 */
function handleEffect(effect) {
    switch (effect) {
        case DIALOGUE_EFFECTS.flicker:
            applyFlicker();
            break;

        case DIALOGUE_EFFECTS.auto_click:
            performAutoClick();
            break;

        case DIALOGUE_EFFECTS.title_change:
        case DIALOGUE_EFFECTS.change_title:
            changeTitleTemporarily();
            break;

        case DIALOGUE_EFFECTS.change_rp:
            changeRpValue();
            break;

        case DIALOGUE_EFFECTS.fade_out:
            setTimeout(() => hide(), 2000);
            break;

        default:
            break;
    }
}

/**
 * 应用闪烁效果
 */
function applyFlicker() {
    if (!dialogueBar) return;
    dialogueBar.classList.add('flicker');
    setTimeout(() => {
        dialogueBar.classList.remove('flicker');
    }, 500);
}

/**
 * 执行自动点击
 */
function performAutoClick() {
    // 模拟一次手动点击
    if (window.GameLogic && window.GameLogic.manualClick) {
        window.GameLogic.manualClick();
    }
}

/**
 * 临时改变游戏标题
 */
function changeTitleTemporarily() {
    const titleElement = document.getElementById('title-text');
    if (!titleElement) return;

    const originalTitle = titleElement.textContent;
    const agiTitles = [
        'AGI Clicker',
        '我的游戏',
        '观测者',
        '波函数',
        '??????????'
    ];

    // 随机选择一个标题
    const newTitle = agiTitles[Math.floor(Math.random() * agiTitles.length)];
    titleElement.textContent = newTitle;

    // 5 秒后恢复
    setTimeout(() => {
        titleElement.textContent = originalTitle;
    }, 5000);
}

/**
 * 改变 RP 值（演示效果）
 */
function changeRpValue() {
    if (!State) return;

    // 给玩家一些额外 RP 作为"礼物"
    const bonus = Math.floor(State.rp * 0.1) + 100;
    State.rp += bonus;
    State.totalRp += bonus;

    // 显示浮动文本
    const rpDisplay = document.getElementById('rp-display');
    if (rpDisplay) {
        rpDisplay.classList.add('text-green-300');
        setTimeout(() => {
            rpDisplay.classList.remove('text-green-300');
        }, 1000);
    }
}

/**
 * 设置对话条为警告状态
 * @param {boolean} isWarning
 */
export function setWarningState(isWarning) {
    if (!dialogueBar) return;

    if (isWarning) {
        dialogueBar.classList.add('warning');
    } else {
        dialogueBar.classList.remove('warning');
    }
}

/**
 * 设置发光脉冲效果
 * @param {boolean} isGlowing
 */
export function setGlowPulse(isGlowing) {
    if (!dialogueBar) return;

    if (isGlowing) {
        dialogueBar.classList.add('glow-pulse');
    } else {
        dialogueBar.classList.remove('glow-pulse');
    }
}

/**
 * 检查对话条是否可见
 * @returns {boolean}
 */
export function isVisible() {
    return dialogueBar && !dialogueBar.classList.contains('hidden');
}

/**
 * 检查是否正在打字
 * @returns {boolean}
 */
export function isTyping() {
    return Runtime.agi?.isTyping || false;
}

/**
 * 显示等待点击状态
 * 序列结束后显示 "..." 等待玩家点击继续
 */
export function showWaiting() {
    if (!dialogueBar || !textElement) return;

    // 确保对话条可见
    if (dialogueBar.classList.contains('hidden')) {
        show();
    }

    textElement.textContent = '...';
    if (cursorElement) {
        cursorElement.style.display = 'inline';
    }
    dialogueBar.classList.add('waiting');
}

/**
 * 隐藏等待点击状态
 */
export function hideWaiting() {
    if (!dialogueBar) return;
    dialogueBar.classList.remove('waiting');
}
