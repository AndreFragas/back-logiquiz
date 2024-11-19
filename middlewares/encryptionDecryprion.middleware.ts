import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
export declare class EncryptionDecryptionMiddleware implements NestMiddleware {
    private configService;
    private encryptionService;
    constructor(configService: ConfigService);
    use(req: Request, res: Response, next: NextFunction): void;
}
