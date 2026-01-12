/**
 * Connections Logic Module
 * Contains connection purchase and management logic.
 * Extracted from Game.Logic in game.js
 *
 * Connections are persistent upgrades bought with Reputation
 * that provide permanent bonuses across prestiges.
 */

import { State, Runtime } from '../state.js';
import { hasConnection, updateAll } from './core.js';

/**
 * Get the price of a connection.
 * Price doubles for each connection already owned.
 * @param {string} id - Connection ID
 * @returns {number} Connection price in reputation
 */
export function getConnectionPrice(id) {
    const connections = Runtime.locale.connections || [];
    const conn = connections.find(c => c.id === id);
    if (!conn) return Infinity;

    const owned = State.ownedConnections.length;

    // Bug #6 修复: 防止超过JS安全整数范围导致的溢出
    // Number.MAX_SAFE_INTEGER = 2^53 - 1，超过52次方后精度丢失
    if (owned > 52) return Infinity;

    // Price doubles for each connection owned
    return conn.basePrice * Math.pow(2, owned);
}

/**
 * Check if player can afford a connection.
 * @param {string} id - Connection ID
 * @returns {boolean} True if player can afford the connection
 */
export function canAffordConnection(id) {
    if (hasConnection(id)) return false;
    const price = getConnectionPrice(id);
    return State.reputation >= price;
}

/**
 * Purchase a connection.
 * @param {string} id - Connection ID
 * @returns {boolean} True if purchase was successful
 */
export function buyConnection(id) {
    const connections = Runtime.locale.connections || [];
    const conn = connections.find(c => c.id === id);
    if (!conn) return false;

    if (hasConnection(id)) return false;

    const cost = getConnectionPrice(id);
    if (State.reputation < cost) return false;

    State.reputation -= cost;
    State.ownedConnections.push(id);
    updateAll();

    return true;
}

/**
 * Get all available connections.
 * @returns {Array} Array of connection configuration objects
 */
export function getAllConnections() {
    return Runtime.locale.connections || [];
}

/**
 * Get all owned connections.
 * @returns {Array} Array of owned connection IDs
 */
export function getOwnedConnections() {
    return State.ownedConnections;
}

/**
 * Get connection configuration by ID.
 * @param {string} id - Connection ID
 * @returns {Object|null} Connection configuration object
 */
export function getConnectionConfig(id) {
    const connections = Runtime.locale.connections || [];
    return connections.find(c => c.id === id) || null;
}

/**
 * Get count of owned connections.
 * @returns {number} Number of connections owned
 */
export function getOwnedConnectionsCount() {
    return State.ownedConnections.length;
}

/**
 * Get current connection price multiplier.
 * @returns {number} Price multiplier based on owned connections
 */
export function getPriceInflation() {
    return Math.pow(2, State.ownedConnections.length);
}

/**
 * Check if connections are available (unlocked after first prestige).
 * @returns {boolean} True if connections are unlocked
 */
export function areConnectionsUnlocked() {
    return State.generation > 1;
}
