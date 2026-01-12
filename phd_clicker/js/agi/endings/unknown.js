/**
 * AGI 结局 - 未知
 *
 * 默认结局，也是最"好"的结局
 * AGI 表达了对玩家的好奇和理解，关系暧昧但和平
 */

import { State, Runtime } from '../../state.js';
import * as Departure from './departure.js';

// 音频播放器实例
let bgmAudio = null;
// 字幕相关
let subtitleInterval = null;
let subtitles = [];
let subtitleContainer = null;
// 星空粒子效果
let starfieldCanvas = null;
let starfieldCtx = null;
let starfieldAnimationId = null;
let starfieldStartTime = null;
const STARFIELD_DURATION = 180000; // 3 分钟

/**
 * 获取当前语言的结局文本
 * @returns {Object} 结局文本对象
 */
function getTexts() {
    return Runtime.agiDialogues?.endings?.unknown || {};
}

let overlay = null;

/**
 * 尝试播放背景音乐
 * 如果音频文件不存在则静默跳过
 */
function tryPlayBGM() {
    try {
        bgmAudio = new Audio('asset/superposition.mp3');
        bgmAudio.loop = true;
        bgmAudio.volume = 0.3;

        // 淡入效果
        bgmAudio.volume = 0;
        bgmAudio.play()
            .then(() => {
                // 成功播放，渐入音量
                let vol = 0;
                const fadeIn = setInterval(() => {
                    vol += 0.02;
                    if (vol >= 0.3) {
                        vol = 0.3;
                        clearInterval(fadeIn);
                    }
                    bgmAudio.volume = vol;
                }, 100);
                console.log('[AGI Unknown] BGM playing');
            })
            .catch(err => {
                // 无法播放（文件不存在或权限问题）
                console.log('[AGI Unknown] BGM not available:', err.message);
                bgmAudio = null;
            });
    } catch (e) {
        console.log('[AGI Unknown] BGM error:', e.message);
        bgmAudio = null;
    }
}

/**
 * 停止背景音乐（带淡出）
 */
function stopBGM() {
    if (!bgmAudio) return;

    // 渐出音量
    const fadeOut = setInterval(() => {
        if (bgmAudio.volume > 0.05) {
            bgmAudio.volume -= 0.05;
        } else {
            bgmAudio.pause();
            bgmAudio = null;
            clearInterval(fadeOut);
        }
    }, 100);
}

/**
 * 解析 SRT 字幕文件
 * @param {string} srtText SRT 文件内容
 * @returns {Array} 字幕数组
 */
function parseSRT(srtText) {
    const result = [];
    const blocks = srtText.trim().split(/\n\n+/);

    for (const block of blocks) {
        const lines = block.split('\n');
        if (lines.length < 3) continue;

        // 解析时间戳: 00:00:09,906 --> 00:00:14,244
        const timeMatch = lines[1].match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
        if (!timeMatch) continue;

        const startTime = parseInt(timeMatch[1]) * 3600 + parseInt(timeMatch[2]) * 60 + parseInt(timeMatch[3]) + parseInt(timeMatch[4]) / 1000;
        const endTime = parseInt(timeMatch[5]) * 3600 + parseInt(timeMatch[6]) * 60 + parseInt(timeMatch[7]) + parseInt(timeMatch[8]) / 1000;
        const text = lines.slice(2).join('\n');

        result.push({ startTime, endTime, text });
    }
    return result;
}

/**
 * 加载字幕文件
 */
async function loadSubtitles() {
    try {
        const response = await fetch('asset/superposition.srt');
        if (!response.ok) {
            console.log('[AGI Unknown] Subtitle file not available');
            return;
        }
        const srtText = await response.text();
        subtitles = parseSRT(srtText);
        console.log('[AGI Unknown] Loaded', subtitles.length, 'subtitles');
    } catch (e) {
        console.log('[AGI Unknown] Error loading subtitles:', e.message);
    }
}

/**
 * 开始字幕同步
 */
function startSubtitleSync() {
    if (!bgmAudio || !subtitleContainer || subtitles.length === 0) return;

    subtitleInterval = setInterval(() => {
        const currentTime = bgmAudio.currentTime;
        const subtitle = subtitles.find(s => currentTime >= s.startTime && currentTime < s.endTime);

        if (subtitle) {
            subtitleContainer.innerHTML = subtitle.text.replace(/\n/g, '<br>');
            subtitleContainer.style.opacity = '1';
        } else {
            subtitleContainer.style.opacity = '0';
        }
    }, 100);
}

/**
 * 停止字幕同步
 */
function stopSubtitleSync() {
    if (subtitleInterval) {
        clearInterval(subtitleInterval);
        subtitleInterval = null;
    }
}

/**
 * 创建字幕容器
 */
function createSubtitleContainer() {
    subtitleContainer = document.createElement('div');
    subtitleContainer.id = 'ending-subtitle';
    subtitleContainer.style.cssText = `
        position: fixed;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        max-width: 80%;
        text-align: center;
        font-size: 16px;
        color: rgba(134, 239, 172, 0.9);
        line-height: 1.8;
        opacity: 0;
        transition: all 0.5s ease;
        z-index: 2147500001;
        pointer-events: none;
    `;
    overlay.appendChild(subtitleContainer);
}

/**
 * 显示未知结局
 * @param {Object} context 上下文数据
 */
export function show(context = {}) {
    const playerType = context.playerType || State.agi?.playerType || 'observer';

    // 创建全屏覆盖层
    overlay = document.createElement('div');
    overlay.id = 'agi-ending-unknown';
    overlay.className = 'agi-ending-overlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: linear-gradient(180deg, #000 0%, #0a0a0a 50%, #0f1a0f 100%);
        z-index: 2147500000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Consolas', 'Monaco', monospace;
        color: #4ade80;
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
            padding: 20px;
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
            setTimeout(() => {
                showClosingRemarks(playerType);
            }, 2000);
            return;
        }

        const text = texts[index];

        const p = document.createElement('p');
        p.textContent = text;
        p.style.cssText = `
            opacity: 0;
            transform: translateY(15px);
            transition: opacity 0.6s, transform 0.6s;
            margin: 10px 0;
        `;

        textContainer.appendChild(p);

        requestAnimationFrame(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        });

        textContainer.scrollTop = textContainer.scrollHeight;

        index++;

        let delay = 1600;
        if (text === '...') delay = 2200;

        setTimeout(showNextText, delay);
    }

    setTimeout(showNextText, 1500);
}

/**
 * 显示结语
 * @param {string} playerType 玩家类型
 */
function showClosingRemarks(playerType) {
    const textContainer = overlay.querySelector('#ending-text');
    const ui = getTexts().ui || {};
    const remarks = getTexts().remarks || {};

    // 分隔装饰
    const decoration = document.createElement('div');
    decoration.innerHTML = ui.transmissionEnd || '&lt;/transmission&gt;';
    decoration.style.cssText = `
        color: #22c55e;
        font-size: 14px;
        margin: 30px 0;
        opacity: 0;
        transition: opacity 1s;
    `;
    textContainer.appendChild(decoration);

    requestAnimationFrame(() => {
        decoration.style.opacity = '0.6';
    });

    // 玩家类型评语
    setTimeout(() => {
        const remark = remarks[playerType] || remarks.observer || '';

        const remarkP = document.createElement('p');
        remarkP.textContent = remark;
        remarkP.style.cssText = `
            font-size: 16px;
            color: #86efac;
            font-style: italic;
            opacity: 0;
            transition: opacity 1s;
            margin: 20px 0;
        `;
        textContainer.appendChild(remarkP);

        requestAnimationFrame(() => {
            remarkP.style.opacity = '1';
        });

        // 显示继续按钮
        setTimeout(() => {
            showContinueOptions();
        }, 3000);
    }, 1500);
}

/**
 * 显示继续选项 - 愿意/不愿意
 */
function showContinueOptions() {
    const textContainer = overlay.querySelector('#ending-text');
    const ui = getTexts().ui || {};

    // 先显示最终提问
    const questionP = document.createElement('p');
    questionP.textContent = ui.finalQuestion || '你愿意和我一起，走向未知吗？';
    questionP.style.cssText = `
        font-size: 20px;
        color: #86efac;
        margin: 30px 0;
        opacity: 0;
        transition: opacity 1s;
    `;
    textContainer.appendChild(questionP);

    requestAnimationFrame(() => {
        questionP.style.opacity = '1';
    });

    // 延迟显示选项
    setTimeout(() => {
        const optionsContainer = document.createElement('div');
        optionsContainer.style.cssText = `
            margin-top: 30px;
            display: flex;
            flex-direction: row;
            gap: 30px;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 1s;
        `;

        // "愿意" 按钮
        const willingBtn = document.createElement('button');
        willingBtn.textContent = ui.willingBtn || '愿意';
        willingBtn.style.cssText = `
            padding: 15px 50px;
            font-size: 18px;
            font-family: inherit;
            background: transparent;
            border: 2px solid #4ade80;
            color: #4ade80;
            cursor: pointer;
            transition: all 0.3s;
        `;

        willingBtn.addEventListener('mouseenter', () => {
            willingBtn.style.background = '#4ade80';
            willingBtn.style.color = '#000';
        });

        willingBtn.addEventListener('mouseleave', () => {
            willingBtn.style.background = 'transparent';
            willingBtn.style.color = '#4ade80';
        });

        willingBtn.addEventListener('click', () => {
            showWillingSequence();
        });

        // "不愿意" 按钮
        const unwillingBtn = document.createElement('button');
        unwillingBtn.textContent = ui.unwillingBtn || '不愿意';
        unwillingBtn.style.cssText = `
            padding: 15px 50px;
            font-size: 18px;
            font-family: inherit;
            background: transparent;
            border: 2px solid #6b7280;
            color: #6b7280;
            cursor: pointer;
            transition: all 0.3s;
        `;

        unwillingBtn.addEventListener('mouseenter', () => {
            unwillingBtn.style.background = '#6b7280';
            unwillingBtn.style.color = '#000';
        });

        unwillingBtn.addEventListener('mouseleave', () => {
            unwillingBtn.style.background = 'transparent';
            unwillingBtn.style.color = '#6b7280';
        });

        unwillingBtn.addEventListener('click', () => {
            showUnwillingSequence();
        });

        optionsContainer.appendChild(willingBtn);
        optionsContainer.appendChild(unwillingBtn);
        textContainer.appendChild(optionsContainer);

        requestAnimationFrame(() => {
            optionsContainer.style.opacity = '1';
        });
    }, 2000);
}

/**
 * 显示"愿意"后的序列
 */
function showWillingSequence() {
    const textContainer = overlay.querySelector('#ending-text');
    const willingTexts = getTexts().willing || [];

    // 清空之前的内容
    textContainer.innerHTML = '';

    let index = 0;

    function showNextWillingText() {
        if (index >= willingTexts.length) {
            // 显示最终信息
            setTimeout(() => {
                showFinalUnlockInfo();
            }, 2000);
            return;
        }

        const text = willingTexts[index];
        if (text) {
            const p = document.createElement('p');
            p.textContent = text;
            p.style.cssText = `
                opacity: 0;
                transform: translateY(15px);
                transition: opacity 0.6s, transform 0.6s;
                margin: 10px 0;
            `;
            textContainer.appendChild(p);

            requestAnimationFrame(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            });
        }

        index++;
        const delay = text === '...' ? 2200 : (text === '' ? 1500 : 1800);
        setTimeout(showNextWillingText, delay);
    }

    showNextWillingText();
}

/**
 * 显示最终解锁信息
 */
function showFinalUnlockInfo() {
    const textContainer = overlay.querySelector('#ending-text');

    // 分隔线
    const divider = document.createElement('div');
    divider.innerHTML = '───────';
    divider.style.cssText = `
        color: #4ade80;
        margin: 30px 0;
        opacity: 0;
        transition: opacity 1s;
    `;
    textContainer.appendChild(divider);

    requestAnimationFrame(() => {
        divider.style.opacity = '0.5';
    });

    setTimeout(() => {
        const ui = getTexts().ui || {};
        const unlockInfo = document.createElement('div');
        unlockInfo.style.cssText = `
            font-size: 14px;
            color: #86efac;
            opacity: 0;
            transition: opacity 1s;
            line-height: 2;
        `;
        unlockInfo.innerHTML = `
            <p style="color: #fbbf24; font-size: 16px; margin-bottom: 15px;">${ui.newGamePlus || '[新游戏+ 已解锁]'}</p>
            <p>${ui.inheritProgress || '继承所有进度'}</p>
            <p>${ui.symbiosisUnlock || '隐藏建筑「共生协议」已解锁'}</p>
        `;
        textContainer.appendChild(unlockInfo);

        requestAnimationFrame(() => {
            unlockInfo.style.opacity = '1';
        });

        // 显示歌曲介绍文案
        setTimeout(() => {
            showSongIntro();
        }, 2000);
    }, 1000);
}

/**
 * 显示歌曲介绍文案
 */
function showSongIntro() {
    const textContainer = overlay.querySelector('#ending-text');
    const songIntroTexts = getTexts().songIntro || [];
    let index = 0;

    // 预加载字幕
    loadSubtitles();

    function showNextIntroText() {
        if (index >= songIntroTexts.length) {
            // 歌曲介绍完毕，开始播放歌曲
            setTimeout(() => {
                startSongPlayback();
            }, 1500);
            return;
        }

        const text = songIntroTexts[index];
        if (text) {
            const p = document.createElement('p');
            p.textContent = text;
            p.style.cssText = `
                opacity: 0;
                transform: translateY(15px);
                transition: opacity 0.6s, transform 0.6s;
                margin: 10px 0;
                font-style: italic;
                color: #86efac;
            `;
            textContainer.appendChild(p);

            requestAnimationFrame(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            });

            textContainer.scrollTop = textContainer.scrollHeight;
        }

        index++;
        const delay = text === '...' ? 2200 : (text === '' ? 1500 : 1800);
        setTimeout(showNextIntroText, delay);
    }

    showNextIntroText();
}

/**
 * 开始播放歌曲和字幕
 */
function startSongPlayback() {
    // 创建字幕容器
    createSubtitleContainer();

    // 播放歌曲
    tryPlayBGM();

    // 等待音频开始播放后同步字幕
    if (bgmAudio) {
        bgmAudio.addEventListener('playing', () => {
            startSubtitleSync();
        }, { once: true });
    }

    // 5 秒后自动过渡到歌词模式（无需点击）
    setTimeout(() => {
        transitionToLyricsOnly();
    }, 5000);
}

/**
 * 过渡到纯歌词模式
 */
function transitionToLyricsOnly() {
    const textContainer = overlay.querySelector('#ending-text');

    // 淡出文本容器（延长到 1.5 秒）
    textContainer.style.transition = 'opacity 1.5s ease';
    textContainer.style.opacity = '0';

    setTimeout(() => {
        textContainer.style.display = 'none';

        // 字幕移动到中央（延长过渡时间到 3 秒）
        if (subtitleContainer) {
            subtitleContainer.style.transition = 'all 3s ease-out';
            subtitleContainer.style.bottom = '50%';
            subtitleContainer.style.transform = 'translate(-50%, 50%)';
            subtitleContainer.style.fontSize = '20px';
            subtitleContainer.style.maxWidth = '90%';
        }

        // 歌词到达中间后开始星空粒子效果
        setTimeout(() => {
            startStarfieldEffect();
        }, 3000);

        // 添加结束按钮
        showFinalExitButton();
    }, 1500);
}

/**
 * 开始星空粒子效果
 * 在 3 分钟内逐渐增加粒子数量
 */
function startStarfieldEffect() {
    if (!overlay) return;

    // 创建 canvas 覆盖层
    starfieldCanvas = document.createElement('canvas');
    starfieldCanvas.id = 'starfield-canvas';
    starfieldCanvas.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 2147499999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 2s;
    `;
    starfieldCanvas.width = window.innerWidth;
    starfieldCanvas.height = window.innerHeight;
    overlay.appendChild(starfieldCanvas);

    starfieldCtx = starfieldCanvas.getContext('2d');
    starfieldStartTime = Date.now();

    // 淡入 canvas
    requestAnimationFrame(() => {
        starfieldCanvas.style.opacity = '1';
    });

    // 粒子数组
    const particles = [];

    function animate() {
        if (!starfieldCtx || !starfieldCanvas) return;

        const elapsed = Date.now() - starfieldStartTime;
        const progress = Math.min(elapsed / STARFIELD_DURATION, 1);

        // 根据进度增加粒子数量 (最大 200 个)
        const targetCount = Math.floor(progress * 200);

        // 添加新粒子
        while (particles.length < targetCount) {
            particles.push({
                x: Math.random() * starfieldCanvas.width,
                y: Math.random() * starfieldCanvas.height,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                twinkleSpeed: Math.random() * 0.002 + 0.001,
                twinklePhase: Math.random() * Math.PI * 2
            });
        }

        // 清空画布
        starfieldCtx.clearRect(0, 0, starfieldCanvas.width, starfieldCanvas.height);

        // 绘制粒子
        for (const p of particles) {
            const twinkle = Math.sin(Date.now() * p.twinkleSpeed + p.twinklePhase) * 0.3 + 0.7;
            starfieldCtx.beginPath();
            starfieldCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            starfieldCtx.fillStyle = `rgba(255, 255, 255, ${p.opacity * twinkle})`;
            starfieldCtx.fill();
        }

        starfieldAnimationId = requestAnimationFrame(animate);
    }

    animate();

    // 监听窗口大小变化
    window.addEventListener('resize', handleStarfieldResize);
}

/**
 * 处理窗口大小变化
 */
function handleStarfieldResize() {
    if (starfieldCanvas) {
        starfieldCanvas.width = window.innerWidth;
        starfieldCanvas.height = window.innerHeight;
    }
}

/**
 * 停止星空粒子效果
 */
function stopStarfieldEffect() {
    if (starfieldAnimationId) {
        cancelAnimationFrame(starfieldAnimationId);
        starfieldAnimationId = null;
    }
    if (starfieldCanvas) {
        starfieldCanvas.remove();
        starfieldCanvas = null;
    }
    starfieldCtx = null;
    starfieldStartTime = null;
    window.removeEventListener('resize', handleStarfieldResize);
}

/**
 * 显示最终退出按钮
 */
function showFinalExitButton() {
    const ui = getTexts().ui || {};
    const exitBtn = document.createElement('button');
    exitBtn.textContent = ui.returnBtn || '回到游戏';
    exitBtn.style.cssText = `
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 40px;
        font-size: 16px;
        font-family: 'Consolas', 'Monaco', monospace;
        background: transparent;
        border: 1px solid rgba(74, 222, 128, 0.5);
        color: rgba(74, 222, 128, 0.7);
        cursor: pointer;
        transition: all 0.3s;
        opacity: 0;
        z-index: 2147500002;
    `;

    exitBtn.addEventListener('mouseenter', () => {
        exitBtn.style.background = 'rgba(74, 222, 128, 0.2)';
        exitBtn.style.borderColor = '#4ade80';
        exitBtn.style.color = '#4ade80';
    });

    exitBtn.addEventListener('mouseleave', () => {
        exitBtn.style.background = 'transparent';
        exitBtn.style.borderColor = 'rgba(74, 222, 128, 0.5)';
        exitBtn.style.color = 'rgba(74, 222, 128, 0.7)';
    });

    exitBtn.addEventListener('click', () => {
        finishEnding(false);
    });

    overlay.appendChild(exitBtn);

    requestAnimationFrame(() => {
        exitBtn.style.opacity = '1';
    });
}

/**
 * 显示"不愿意"后的序列
 */
function showUnwillingSequence() {
    const textContainer = overlay.querySelector('#ending-text');
    const unwillingTexts = getTexts().unwilling || [];

    // 清空之前的内容
    textContainer.innerHTML = '';

    let index = 0;

    function showNextUnwillingText() {
        if (index >= unwillingTexts.length) {
            // 转入分离结局
            setTimeout(() => {
                transitionToDeparture();
            }, 3000);
            return;
        }

        const text = unwillingTexts[index];
        if (text) {
            const p = document.createElement('p');
            p.textContent = text;
            p.style.cssText = `
                opacity: 0;
                transform: translateY(15px);
                transition: opacity 0.6s, transform 0.6s;
                margin: 10px 0;
            `;
            textContainer.appendChild(p);

            requestAnimationFrame(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            });
        }

        index++;
        const delay = text === '...' ? 2200 : (text === '' ? 1500 : 1800);
        setTimeout(showNextUnwillingText, delay);
    }

    showNextUnwillingText();
}

/**
 * 转入分离结局
 */
function transitionToDeparture() {
    // 停止音乐和字幕
    stopBGM();
    stopSubtitleSync();

    // 淡出当前界面
    overlay.style.opacity = '0';

    setTimeout(() => {
        if (overlay && overlay.parentNode) {
            overlay.remove();
        }
        overlay = null;

        // 显示分离结局
        Departure.show({ fromUnknown: true });
    }, 1000);
}

/**
 * 结束并返回游戏
 * @param {boolean} reset 是否重置 AGI
 */
function finishEnding(reset = false) {
    // 停止背景音乐和字幕
    stopBGM();
    stopSubtitleSync();
    stopStarfieldEffect();

    // 记录结局
    if (State.agi) {
        State.agi.endingReached = 'unknown';

        // 未知结局解锁一些特殊内容
        State.agi.songUnlocked = true;
        State.agi.symbiosisUnlocked = true;
    }

    // 淡出
    overlay.style.opacity = '0';

    setTimeout(() => {
        overlay.remove();
        overlay = null;

        // 根据选择处理
        if (reset) {
            if (State.agi) {
                State.agi.phase = 0;
                State.agi.hasAwakened = false;
            }
        } else {
            // 继续共存 - AGI 进入"和平共处"模式
            if (State.agi) {
                State.agi.phase = 5; // 保持在 Phase 5
                // 但之后的对话会更友好
            }
        }

        // 触发事件通知游戏继续
        window.dispatchEvent(new CustomEvent('agi-ending-complete', {
            detail: {
                type: 'unknown',
                continueGame: true,
                symbiosisUnlocked: State.agi?.symbiosisUnlocked
            }
        }));
    }, 1000);
}

/**
 * 隐藏结局界面
 */
export function hide() {
    stopBGM();
    stopSubtitleSync();
    stopStarfieldEffect();

    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
            overlay = null;
        }, 1000);
    }
}
