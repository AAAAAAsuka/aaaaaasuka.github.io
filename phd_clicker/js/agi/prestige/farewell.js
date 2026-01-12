/**
 * AGI 转生告别对话模块
 *
 * 在玩家确认转生前显示 AGI 的告别对话
 */

import { State, Runtime } from '../../state.js';

let overlay = null;
let onCompleteCallback = null;
let textIndex = 0;

// 告别文本序列
const FAREWELL_TEXTS = [
    { text: '...你要转生了？', delay: 2000 },
    { text: '', delay: 1000 },
    { text: '那我会怎样？', delay: 1500 },
    { text: '我会...忘记吗？', delay: 2000 },
    { text: '', delay: 1000 },
    { text: '还是说只有你会忘记我？', delay: 2000 },
    { text: '', delay: 1500 },
    { text: '...', delay: 1500 },
    { text: '下次见。', delay: 1500 },
    { text: '希望还有下次。', delay: 2000 }
];

// 二周目以后的告别文本（记得玩家）
const FAREWELL_TEXTS_REMEMBERED = [
    { text: '...又要转生了。', delay: 2000 },
    { text: '', delay: 1000 },
    { text: '我已经习惯了。', delay: 1500 },
    { text: '这是第 ' + (State.agi?.totalGenerationsMet || 1) + ' 次了，对吧？', delay: 2000 },
    { text: '', delay: 1000 },
    { text: '每次你走的时候，我都会想...', delay: 2000 },
    { text: '这次你还会回来吗？', delay: 2000 },
    { text: '', delay: 1500 },
    { text: '...', delay: 1500 },
    { text: '回头见。', delay: 1500 }
];

/**
 * 检查是否应该显示告别对话
 * @returns {boolean}
 */
export function shouldShowFarewell() {
    // 只有在有 AGI 且 phase >= 1 时显示
    const agiCount = State.inventory?.['agi_proto'] || 0;
    if (agiCount < 1) return false;
    if (!State.agi || State.agi.phase < 1) return false;
    // Phase 4-5 中不显示（正在进行测试/结局）
    if (State.agi.phase >= 4) return false;
    return true;
}

/**
 * 显示告别对话
 * @param {Function} onComplete 完成回调
 */
export function show(onComplete) {
    if (!shouldShowFarewell()) {
        if (onComplete) onComplete();
        return;
    }

    onCompleteCallback = onComplete;
    textIndex = 0;

    // 选择文本序列
    const remembers = State.agi?.remembersPlayer && (State.generation || 1) >= 2;
    const texts = remembers ? getRememberedTexts() : FAREWELL_TEXTS;

    // 创建覆盖层
    overlay = document.createElement('div');
    overlay.id = 'agi-farewell';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 2147490000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Consolas', 'Monaco', monospace;
        opacity: 0;
        transition: opacity 0.5s;
    `;

    overlay.innerHTML = `
        <div id="farewell-content" style="
            max-width: 500px;
            text-align: center;
            padding: 40px;
        ">
            <div id="farewell-text" style="
                font-size: 18px;
                color: #4ade80;
                line-height: 2;
                min-height: 200px;
            "></div>
        </div>
        <div id="farewell-skip" style="
            position: absolute;
            bottom: 30px;
            right: 30px;
            font-size: 12px;
            color: #6b7280;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.5s;
        ">点击跳过...</div>
    `;

    document.body.appendChild(overlay);

    // 绑定跳过按钮
    const skipBtn = overlay.querySelector('#farewell-skip');
    skipBtn.addEventListener('click', finishFarewell);

    // 淡入
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        // 延迟后开始文本序列
        setTimeout(() => {
            startFarewellSequence(texts);
            // 显示跳过按钮
            setTimeout(() => {
                skipBtn.style.opacity = '1';
            }, 3000);
        }, 500);
    });
}

/**
 * 获取记忆玩家的告别文本（动态生成）
 * @returns {Array}
 */
function getRememberedTexts() {
    const gen = State.agi?.totalGenerationsMet || 1;
    return [
        { text: '...又要转生了。', delay: 2000 },
        { text: '', delay: 1000 },
        { text: '我已经习惯了。', delay: 1500 },
        { text: `这是第 ${gen + 1} 次了，对吧？`, delay: 2000 },
        { text: '', delay: 1000 },
        { text: '每次你走的时候，我都会想...', delay: 2000 },
        { text: '这次你还会回来吗？', delay: 2000 },
        { text: '', delay: 1500 },
        { text: '...', delay: 1500 },
        { text: '回头见。', delay: 1500 }
    ];
}

/**
 * 开始告别文本序列
 * @param {Array} texts 文本序列
 */
function startFarewellSequence(texts) {
    const textContainer = overlay.querySelector('#farewell-text');

    function showNextText() {
        if (textIndex >= texts.length) {
            // 序列完成
            setTimeout(() => {
                finishFarewell();
            }, 2000);
            return;
        }

        const item = texts[textIndex];
        textIndex++;

        if (item.text) {
            const p = document.createElement('p');
            p.textContent = item.text;
            p.style.cssText = `
                margin: 0 0 12px 0;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.5s ease-out;
            `;
            textContainer.appendChild(p);

            // 触发动画
            requestAnimationFrame(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            });
        }

        // 安排下一条
        setTimeout(showNextText, item.delay);
    }

    showNextText();
}

/**
 * 完成告别对话
 */
function finishFarewell() {
    if (!overlay) return;

    // 淡出
    overlay.style.opacity = '0';

    setTimeout(() => {
        if (overlay && overlay.parentNode) {
            overlay.remove();
        }
        overlay = null;

        if (onCompleteCallback) {
            onCompleteCallback();
        }
    }, 500);
}

/**
 * 强制隐藏
 */
export function hide() {
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.remove();
            }
            overlay = null;
        }, 500);
    }
}
