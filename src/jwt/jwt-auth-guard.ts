import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = (await super.canActivate(context)) as boolean;
    if (typeof canActivate !== 'boolean') {
      throw new UnauthorizedException();
    }
    return canActivate;
  }
}