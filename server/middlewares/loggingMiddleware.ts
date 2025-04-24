import type { Request, Response, NextFunction } from 'express';

import logger from '../services/logger';

const loggingMiddleware = (
    req: Request,
    _: Response,
    next: NextFunction
): void => {
    // Gather log details
    const remoteAddr = req.ip || req.socket.remoteAddress || '-';
    const method = req.method;
    const url = req.originalUrl || req.url;
    const referrer = req.get('Referrer') || req.get('Referer') || '-';
    const userAgent = req.get('User-Agent') || '-';

    // Format log message
    const logMessage = `"${method} ${url}" "${remoteAddr}" "${referrer}" "${userAgent}"`;

    logger.info(logMessage);

    next();
}

export default loggingMiddleware;