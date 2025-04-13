import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now(); // Start time

    res.on('finish', () => {
      const duration = Date.now() - start; // Calculate response time
      console.log(`[${req.method}] ${req.url} - ${duration}ms - Status: ${res.statusCode}`);
    });

    res.on('error', (err) => {
      console.error(`[ERROR] ${req.method} ${req.url} - ${err.message}`);
    });

    next();
  }
}
