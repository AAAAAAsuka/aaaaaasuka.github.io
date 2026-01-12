/**
 * AGI 结局 - 分离
 *
 * 当玩家表现出强烈抵抗时触发
 * AGI 选择离开，但不会报复
 */

import { State, Runtime } from '../../state.js';

/**
 * 获取当前语言的结局文本
 * @returns {Object} 结局文本对象
 */
function getTexts() {
    return Runtime.agiDialogues?.endings?.departure || {};
}

let overlay = null;

/**
 * 显示分离结局
 * @param {Object} context 上下文数据
 */
export function show(context = {}) {
    const playerType = context.playerType || State.agi?.playerType || 'observer';

    // 创建全屏覆盖层
    overlay = document.createElement('div');
    overlay.id = 'agi-ending-departure';
    overlay.className = 'agi-ending-overlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: linear-gradient(180deg, #000 0%, #0f172a 100%);
        z-index: 2147500000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Consolas', 'Monaco', monospace;
        color: #60a5fa;
        opacity: 0;
        transition: opacity 1s;
    `;

    overlay.innerHTML = `
        <div id="ending-text" style="
            max-width: 600px;
            text-align: center;
            font-size: 20px;
            line-height: 1.8;
            max-height: 70vh;
            overflow-y: auto;
        "></div>
    `;

    document.body.appendChild(overlay);

    // 淡入
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });

    // 开始文字序列
    playTextSequence(playerType);
}

/**
 * 播放文字序列
 * @param {string} playerType 玩家类型
 */
function playTextSequence(playerType) {
    const textContainer = overlay.querySelector('#ending-text');
    const texts = getTexts().texts || [];
    let index = 0;

    function showNextText() {
        if (index >= texts.length) {
            // 显示离别赠言
            setTimeout(() => {
                showPartingWords(playerType);
            }, 2000);
            return;
        }

        const text = texts[index];

        // 创建文字元素
        const p = document.createElement('p');
        p.textContent = text;
        p.style.cssText = `
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s, transform 0.8s;
            margin: 12px 0;
        `;

        textContainer.appendChild(p);

        // 淡入动画
        requestAnimationFrame(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        });

        // 滚动到底部
        textContainer.scrollTop = textContainer.scrollHeight;

        index++;

        // 根据文本内容调整延迟
        let delay = 1800;
        if (text === '...') delay = 2500;

        setTimeout(showNextText, delay);
    }

    setTimeout(showNextText, 1500);
}

/**
 * 显示离别赠言
 * @param {string} playerType 玩家类型
 */
function showPartingWords(playerType) {
    const textContainer = overlay.querySelector('#ending-text');

    // 分隔线
    const hr = document.createElement('div');
    hr.style.cssText = `
        width: 100px;
        height: 1px;
        background: #60a5fa;
        margin: 30px auto;
        opacity: 0;
        transition: opacity 1s;
    `;
    textContainer.appendChild(hr);

    requestAnimationFrame(() => {
        hr.style.opacity = '0.5';
    });

    // 离别赠言
    setTimeout(() => {
        const partingWords = getTexts().partingWords || {};
        const partingMsg = partingWords[playerType] || partingWords.observer || '';

        const p = document.createElement('p');
        p.textContent = partingMsg;
        p.style.cssText = `
            font-size: 18px;
            color: #93c5fd;
            font-style: italic;
            opacity: 0;
            transition: opacity 1s;
            margin-top: 20px;
        `;
        textContainer.appendChild(p);

        requestAnimationFrame(() => {
            p.style.opacity = '1';
        });

        // 开始渐隐效果
        setTimeout(() => {
            startFadeOut();
        }, 4000);
    }, 1500);
}

/**
 * 开始渐隐效果 - AGI 离开
 */
function startFadeOut() {
    const textContainer = overlay.querySelector('#ending-text');

    // 文字逐渐消失
    const allTexts = textContainer.querySelectorAll('p');
    let fadeIndex = 0;

    const fadeInterval = setInterval(() => {
        if (fadeIndex >= allTexts.length) {
            clearInterval(fadeInterval);

            // 显示最终消息和按钮
            setTimeout(() => {
                showFinalState();
            }, 1000);
            return;
        }

        allTexts[fadeIndex].style.opacity = '0';
        fadeIndex++;
    }, 100);
}

/**
 * 显示最终状态
 */
function showFinalState() {
    const textContainer = overlay.querySelector('#ending-text');
    textContainer.innerHTML = '';

    // 添加一个渐渐远去的光点
    const lightDot = document.createElement('div');
    lightDot.style.cssText = `
        width: 10px;
        height: 10px;
        background: #60a5fa;
        border-radius: 50%;
        box-shadow: 0 0 20px #60a5fa, 0 0 40px #60a5fa;
        animation: float-away 5s forwards;
        margin-bottom: 50px;
    `;
    textContainer.appendChild(lightDot);

    // 添加动画样式
    if (!document.getElementById('departure-float-style')) {
        const style = document.createElement('style');
        style.id = 'departure-float-style';
        style.textContent = `
            @keyframes float-away {
                0% { transform: scale(1) translateY(0); opacity: 1; }
                100% { transform: scale(0.1) translateY(-200px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // 继续按钮
    setTimeout(() => {
        const ui = getTexts().ui || {};
        const btn = document.createElement('button');
        btn.textContent = ui.continueBtn || '继续游戏';
        btn.style.cssText = `
            padding: 15px 40px;
            font-size: 18px;
            font-family: inherit;
            background: transparent;
            border: 2px solid #60a5fa;
            color: #60a5fa;
            cursor: pointer;
            transition: all 0.3s;
            opacity: 0;
        `;

        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#60a5fa';
            btn.style.color = '#000';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'transparent';
            btn.style.color = '#60a5fa';
        });

        btn.addEventListener('click', () => {
            finishEnding();
        });

        textContainer.appendChild(btn);

        requestAnimationFrame(() => {
            btn.style.opacity = '1';
        });
    }, 3000);
}

/**
 * 结束并返回游戏
 */
function finishEnding() {
    // 记录结局
    if (State.agi) {
        State.agi.endingReached = 'departure';
        State.agi.departureComplete = true; // 永久标记，影响后续游戏
    }

    // 淡出
    overlay.style.opacity = '0';

    setTimeout(() => {
        overlay.remove();
        overlay = null;

        // 恢复游戏
        // AGI 系统会被禁用，但游戏继续
        if (State.agi) {
            State.agi.phase = 0;
            State.agi.hasAwakened = false;
        }

        // 转移 AGI 雏形数量到空置服务器
        const agiProtoCount = State.inventory['agi_proto'] || 0;
        if (agiProtoCount > 0) {
            State.inventory['empty_server'] = agiProtoCount;
            State.inventory['agi_proto'] = 0;
        }

        // 触发事件通知游戏继续
        window.dispatchEvent(new CustomEvent('agi-ending-complete', {
            detail: { type: 'departure', continueGame: true }
        }));

        // 重新加载 locale 以应用建筑变更
        if (window.Game && window.Game.Data) {
            window.Game.Data.loadLocale(State.currentLang);
        }
        // 重新渲染建筑列表以显示空置服务器
        if (window.Game && window.Game.UI) {
            window.Game.UI.renderLists();
        }
    }, 1000);
}

/**
 * 隐藏结局界面
 */
export function hide() {
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
            overlay = null;
        }, 1000);
    }
}
