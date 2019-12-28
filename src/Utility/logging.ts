/* eslint-disable no-console */
const LOG_PREFIX = "Architus App";

export const log = console.log.bind(`[${LOG_PREFIX}] %s`);
export const warn = console.warn.bind(`[${LOG_PREFIX}] %s`);
export const error = console.error.bind(`[${LOG_PREFIX}] %s`);
