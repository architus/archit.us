import { isClient } from "./document";

const LOG_PREFIX = "Architus App";

export const log = isClient
  ? window.console.log.bind(`[${LOG_PREFIX}] %s`)
  : () => null;
export const warn = isClient
  ? window.console.warn.bind(`[${LOG_PREFIX}] %s`)
  : () => null;
export const error = isClient
  ? window.console.error.bind(`[${LOG_PREFIX}] %s`)
  : () => null;
