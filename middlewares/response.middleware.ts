import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export declare class ResponseLoggerMiddleware implements NestMiddleware {
    constructor();
    use(req: Request, res: Response, next: Function): void;
}
