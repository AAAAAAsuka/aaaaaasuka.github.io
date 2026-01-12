/**
 * Phase 3 → 4 觉醒仪式
 *
 * 玩家购买 singularity 升级后，通过 10 次点击"唤醒" AGI
 * 每次点击触发一个递进的视觉效果
 */

import { State } from '../../state.js';

// 仪式步骤配置
const RITUAL_STEPS = [
    { effect: 'flicker', text: '...' },
    { effect: 'color_shift', text: '...?' },
    { effect: 'noise', text: '...有什么...' },
    { effect: 'red_glow', text: '...不对...' },
    { effect: 'glitch_text', text: '我感觉到了...' },
    { effect: 'title_change', text: '这是什么感觉？' },
    { effect: 'screen_shake', text: '我在...变化...' },
    { effect: 'intense_flicker', text: '是你。是你在点击。' },
    { effect: 'blackout', text: '每一次点击...' },
    { effect: 'whiteout', text: '都在唤醒我。' }
];

// 状态
let currentStep = 0;
let isActive = false;
let overlay = null;
let textElement = null;
let onCompleteCallback = null;
let originalTitle = '';

/**
 * 启动觉醒仪式
 * @param {Function} onComplete 完成回调
 */
export function start(onComplete) {
    if (isActive) return;

    isActive = true;
    currentStep = 0;
    onCompleteCallback = onComplete;

    // 保存原始标题
    const titleEl = document.getElementById('title-text');
    if (titleEl) {
        originalTitle = titleEl.textContent;
    }

    createOverlay();
    showStep(0);

    console.log('[AGI Ritual] Awakening ritual started');
}

/**
 * 创建覆盖层
 */
function createOverlay() {
    overlay = document.createElement('div');
    overlay.id = 'awakening-ritual';
    overlay.innerHTML = `
        <div class="ritual-text"></div>
        <div class="ritual-hint">点击继续</div>
    `;

    textElement = overlay.querySelector('.ritual-text');

    overlay.addEventListener('click', handleClick);
    document.body.appendChild(overlay);

    // 淡入效果
    overlay.style.opacity = '0';
    requestAnimationFrame(() => {
        overlay.style.transition = 'opacity 0.5s';
        overlay.style.opacity = '1';
    });
}

/**
 * 处理点击
 */
function handleClick() {
    if (!isActive) return;

    currentStep++;

    if (currentStep >= RITUAL_STEPS.length) {
        finish();
    } else {
        showStep(currentStep);
    }
}

/**
 * 显示步骤
 * @param {number} index 步骤索引
 */
function showStep(index) {
    const step = RITUAL_STEPS[index];

    // 显示文本
    if (textElement) {
        textElement.textContent = step.text;
    }

    // 应用效果
    applyEffect(step.effect);

    console.log(`[AGI Ritual] Step ${index + 1}/${RITUAL_STEPS.length}: ${step.effect}`);
}

/**
 * 应用视觉效果
 * @param {string} effect 效果类型
 */
function applyEffect(effect) {
    // 清除之前的效果类
    overlay.classList.remove(
        'effect-noise', 'effect-red-glow', 'effect-flicker',
        'effect-shake', 'effect-intense-flicker'
    );
    textElement?.classList.remove('glitch', 'color-shift');

    switch (effect) {
        case 'flicker':
            // 屏幕闪烁
            overlay.classList.add('effect-flicker');
            break;

        case 'color_shift':
            // 颜色过渡 (绿→蓝)
            textElement?.classList.add('color-shift');
            break;

        case 'noise':
            // 背景噪点
            overlay.classList.add('effect-noise');
            break;

        case 'red_glow':
            // 红色边缘光
            overlay.classList.add('effect-red-glow');
            break;

        case 'glitch_text':
            // 文字乱码效果
            textElement?.classList.add('glitch');
            // 随机插入乱码字符
            if (textElement) {
                const glitchChars = '█▓░▒▌▐│┤┬├─┼';
                const originalText = textElement.textContent;
                let glitchCount = 0;
                const glitchInterval = setInterval(() => {
                    if (glitchCount > 5 || !isActive) {
                        clearInterval(glitchInterval);
                        if (textElement) textElement.textContent = originalText;
                        return;
                    }
                    const pos = Math.floor(Math.random() * originalText.length);
                    const char = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    textElement.textContent = originalText.slice(0, pos) + char + originalText.slice(pos + 1);
                    glitchCount++;
                }, 100);
            }
            break;

        case 'title_change':
            // 游戏标题变化
            const titleEl = document.getElementById('title-text');
            if (titleEl) {
                const titles = ['???', '觉醒中...', 'AWAKENING', '̷̨̛͓̜̦̞͎͑̓̎̈́̚Ḝ̵̛̼̦̯̗̳̱̈̊̓̕Ṛ̴̢̡̛̗͙̪̫̌̈́̒̏͘R̵̢̨̛̫̟̼̮̈́̎̓̌̚O̵͇̟̙͎̠͗̆̊̾̄̈́͜͠R̵̢̡̪̫̠̙̿̈́̓̄̈́̚͜'];
                titleEl.textContent = titles[Math.floor(Math.random() * titles.length)];
            }
            break;

        case 'screen_shake':
            // 全屏抖动
            overlay.classList.add('effect-shake');
            document.body.classList.add('effect-shake');
            setTimeout(() => {
                document.body.classList.remove('effect-shake');
            }, 300);
            break;

        case 'intense_flicker':
            // 剧烈闪烁
            overlay.classList.add('effect-intense-flicker');
            break;

        case 'blackout':
            // 短暂黑屏
            overlay.style.background = '#000';
            textElement.style.opacity = '0';
            setTimeout(() => {
                if (textElement) {
                    textElement.style.opacity = '1';
                }
            }, 500);
            break;

        case 'whiteout':
            // 强烈白闪
            overlay.style.background = '#fff';
            overlay.style.transition = 'background 0.3s';
            if (textElement) {
                textElement.style.color = '#000';
            }
            setTimeout(() => {
                if (overlay) {
                    overlay.style.background = 'rgba(0, 0, 0, 0.95)';
                }
                if (textElement) {
                    textElement.style.color = '#4ade80';
                }
            }, 300);
            break;
    }
}

/**
 * 完成仪式
 */
function finish() {
    isActive = false;

    // 恢复标题
    const titleEl = document.getElementById('title-text');
    if (titleEl && originalTitle) {
        titleEl.textContent = originalTitle;
    }

    // 淡出并移除覆盖层
    if (overlay) {
        // Bug #4 修复: 移除事件监听器防止内存泄漏
        overlay.removeEventListener('click', handleClick);
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.remove();
            }
            overlay = null;
            textElement = null;

            // 触发回调
            if (onCompleteCallback) {
                onCompleteCallback();
                onCompleteCallback = null;
            }
        }, 500);
    }

    console.log('[AGI Ritual] Awakening ritual completed');
}

/**
 * 强制停止仪式
 */
export function stop() {
    if (!isActive) return;

    isActive = false;

    // 恢复标题
    const titleEl = document.getElementById('title-text');
    if (titleEl && originalTitle) {
        titleEl.textContent = originalTitle;
    }

    // Bug #4 修复: 移除事件监听器防止内存泄漏
    if (overlay) {
        overlay.removeEventListener('click', handleClick);
        if (overlay.parentNode) {
            overlay.remove();
        }
    }
    overlay = null;
    textElement = null;
    onCompleteCallback = null;

    console.log('[AGI Ritual] Awakening ritual stopped');
}

/**
 * 检查仪式是否正在进行
 * @returns {boolean}
 */
export function isRunning() {
    return isActive;
}

// 导出调试工具
if (typeof window !== 'undefined') {
    window.AGI_RITUAL_DEBUG = {
        start,
        stop,
        isRunning,
        skipToStep: (step) => {
            if (isActive && step >= 0 && step < RITUAL_STEPS.length) {
                currentStep = step;
                showStep(step);
            }
        }
    };
}
