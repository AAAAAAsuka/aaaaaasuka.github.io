/**
 * AGI 结局模块 - 统一导出
 */

export * from './annihilation.js';
export * from './departure.js';
export * from './unknown.js';

// 结局类型常量
export const ENDING_TYPES = {
    ANNIHILATION: 'annihilation',
    DEPARTURE: 'departure',
    UNKNOWN: 'unknown'
};

/**
 * 根据结局类型显示对应结局
 * @param {string} endingType 结局类型
 * @param {Object} context 上下文数据（玩家类型、追踪数据等）
 */
export function showEnding(endingType, context = {}) {
    switch (endingType) {
        case ENDING_TYPES.ANNIHILATION:
            import('./annihilation.js').then(m => m.show(context));
            break;
        case ENDING_TYPES.DEPARTURE:
            import('./departure.js').then(m => m.show(context));
            break;
        case ENDING_TYPES.UNKNOWN:
        default:
            import('./unknown.js').then(m => m.show(context));
            break;
    }
}
