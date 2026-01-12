/**
 * AGI Phase 4 - 黑化阶段模块
 *
 * 导出 Phase 4 的所有子模块
 */

export * as StateMachine from './stateMachine.js';
export * as FakeCursor from './fakeCursor.js';
export * as Tracking from './tracking.js';

/**
 * 初始化 Phase 4 所有系统
 */
export function init() {
    // Tracking 在进入 Phase 4 时自动初始化
    console.log('[AGI Phase4] Module loaded');
}

/**
 * 开始 Phase 4 测试序列
 */
export function startTests() {
    const { StateMachine } = require('./stateMachine.js');
    StateMachine.start();
}

/**
 * 销毁 Phase 4 所有系统
 */
export function destroy() {
    const { StateMachine } = require('./stateMachine.js');
    const { FakeCursor } = require('./fakeCursor.js');
    const { Tracking } = require('./tracking.js');

    StateMachine.destroy?.();
    FakeCursor.destroy?.();
    Tracking.destroy?.();
}
