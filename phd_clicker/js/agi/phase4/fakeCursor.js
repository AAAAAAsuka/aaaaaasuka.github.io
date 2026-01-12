/**
 * AGI Phase 4 - 假光标系统
 *
 * 隐藏真实鼠标光标，显示一个会"抖动"或"漂移"的假光标
 * 制造控制被剥夺的恐惧感
 */

import { Runtime } from '../../state.js';

// 假光标元素
let fakeCursorEl = null;
let isEnabled = false;
let animationFrame = null;

// 漂移配置
const CONFIG = {
    offsetRange: 50,      // 最大偏移像素
    driftSpeed: 0.02,     // 漂移速度
    noiseScale: 0.01,     // 噪声缩放
    updateInterval: 16    // 更新间隔（约60fps）
};

// 漂移状态
let driftPhase = 0;
let targetOffset = { x: 0, y: 0 };
let currentOffset = { x: 0, y: 0 };

/**
 * 初始化假光标系统
 */
export function init() {
    // 创建假光标元素
    if (!fakeCursorEl) {
        fakeCursorEl = document.createElement('div');
        fakeCursorEl.id = 'agi-fake-cursor';
        fakeCursorEl.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" fill="#fff" stroke="#000" stroke-width="1"/>
            </svg>
        `;
        fakeCursorEl.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 2147499999;
            width: 24px;
            height: 24px;
            display: none;
            transition: none;
        `;
        document.body.appendChild(fakeCursorEl);
    }

    console.log('[AGI FakeCursor] Initialized');
}

/**
 * 销毁假光标系统
 */
export function destroy() {
    disable();
    if (fakeCursorEl) {
        fakeCursorEl.remove();
        fakeCursorEl = null;
    }
}

/**
 * 启用假光标
 */
export function enable() {
    if (isEnabled) return;

    init(); // 确保已初始化

    isEnabled = true;

    // 隐藏真实光标
    document.body.classList.add('agi-fake-cursor-active');

    // 显示假光标
    fakeCursorEl.style.display = 'block';

    // 初始化漂移
    driftPhase = Math.random() * Math.PI * 2;
    targetOffset = { x: 0, y: 0 };
    currentOffset = { x: 0, y: 0 };

    // 开始更新循环
    startUpdateLoop();

    // 同步到 Runtime
    if (Runtime.agi) {
        Runtime.agi.fakeCursorEnabled = true;
    }

    console.log('[AGI FakeCursor] Enabled');
}

/**
 * 禁用假光标
 */
export function disable() {
    if (!isEnabled) return;

    isEnabled = false;

    // 恢复真实光标
    document.body.classList.remove('agi-fake-cursor-active');

    // 隐藏假光标
    if (fakeCursorEl) {
        fakeCursorEl.style.display = 'none';
    }

    // 停止更新循环
    stopUpdateLoop();

    // 同步到 Runtime
    if (Runtime.agi) {
        Runtime.agi.fakeCursorEnabled = false;
    }

    console.log('[AGI FakeCursor] Disabled');
}

/**
 * 切换假光标状态
 */
export function toggle() {
    if (isEnabled) {
        disable();
    } else {
        enable();
    }
}

/**
 * 开始更新循环
 */
function startUpdateLoop() {
    function update() {
        if (!isEnabled) return;

        updateDrift();
        updatePosition();

        animationFrame = requestAnimationFrame(update);
    }

    animationFrame = requestAnimationFrame(update);
}

/**
 * 停止更新循环
 */
function stopUpdateLoop() {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
}

/**
 * 更新漂移偏移
 */
function updateDrift() {
    // 使用正弦波 + 噪声产生自然的漂移
    driftPhase += CONFIG.driftSpeed;

    // 计算新的目标偏移
    const noiseX = Math.sin(driftPhase * 1.3) * 0.5 + Math.sin(driftPhase * 2.7) * 0.3;
    const noiseY = Math.cos(driftPhase * 1.1) * 0.5 + Math.cos(driftPhase * 2.3) * 0.3;

    targetOffset.x = noiseX * CONFIG.offsetRange;
    targetOffset.y = noiseY * CONFIG.offsetRange;

    // 平滑插值到目标偏移
    const lerp = 0.1;
    currentOffset.x += (targetOffset.x - currentOffset.x) * lerp;
    currentOffset.y += (targetOffset.y - currentOffset.y) * lerp;

    // 同步到 Runtime
    if (Runtime.agi) {
        Runtime.agi.fakeCursorOffset = { ...currentOffset };
    }
}

/**
 * 更新光标位置
 */
function updatePosition() {
    if (!fakeCursorEl) return;

    // 获取真实鼠标位置
    const realPos = Runtime.agi?.realMousePos || { x: 0, y: 0 };

    // 计算假光标位置（真实位置 + 漂移偏移）
    const fakeX = realPos.x + currentOffset.x;
    const fakeY = realPos.y + currentOffset.y;

    // 更新假光标元素位置
    fakeCursorEl.style.left = `${fakeX}px`;
    fakeCursorEl.style.top = `${fakeY}px`;
}

/**
 * 设置漂移强度
 * @param {number} intensity 0-1 的强度值
 */
export function setIntensity(intensity) {
    CONFIG.offsetRange = 20 + intensity * 80; // 20-100 像素
    CONFIG.driftSpeed = 0.01 + intensity * 0.04; // 0.01-0.05
}

/**
 * 添加突然跳动
 * @param {number} distance 跳动距离
 */
export function jolt(distance = 100) {
    const angle = Math.random() * Math.PI * 2;
    currentOffset.x += Math.cos(angle) * distance;
    currentOffset.y += Math.sin(angle) * distance;
}

/**
 * 检查假光标是否启用
 * @returns {boolean}
 */
export function isActive() {
    return isEnabled;
}

// 导出调试工具
if (typeof window !== 'undefined') {
    window.AGI_CURSOR_DEBUG = {
        enable,
        disable,
        toggle,
        jolt,
        setIntensity,
        isActive
    };
}
