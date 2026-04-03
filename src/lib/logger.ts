import pino from 'pino';

const isDev = process.env.NODE_ENV === 'development';

export const logger = pino({
  level: isDev ? 'debug' : 'info',
  ...(isDev ? { transport: { target: 'pino-pretty' } } : {}),
  base: {
    service: process.env.NEXT_PUBLIC_APP_NAME || 'app',
    env: process.env.NODE_ENV || 'development',
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => ({ level: label }),
  },
});

// Request logging helper for API routes
export function logRequest(req: Request, extra?: Record<string, unknown>) {
  const url = new URL(req.url);
  logger.info({
    method: req.method,
    path: url.pathname,
    ip: req.headers.get('x-forwarded-for') || 'unknown',
    userAgent: req.headers.get('user-agent')?.slice(0, 100),
    ...extra,
  }, `${req.method} ${url.pathname}`);
}

// Error logging helper
export function logError(err: unknown, context?: Record<string, unknown>) {
  const error = err instanceof Error ? err : new Error(String(err));
  logger.error({
    error: error.message,
    stack: error.stack,
    ...context,
  }, error.message);
}

// Auth event logging
export function logAuthEvent(
  event: 'login' | 'logout' | 'register' | 'mfa_verify' | 'mfa_setup' | 'failed_login',
  userId?: string,
  extra?: Record<string, unknown>,
) {
  logger.info({
    authEvent: event,
    userId,
    ...extra,
  }, `auth:${event}`);
}
