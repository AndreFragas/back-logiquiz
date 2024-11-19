import { Reflector } from '@nestjs/core';
import { SessoesService } from 'src/sessoes/sessoes.service';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private readonly sessoesService: SessoesService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const sessaoAtiva = await this.sessoesService.findOneByToken(token);

    if (!sessaoAtiva) {
      throw new UnauthorizedException('Sessão não encontrada ou não está ativa');
    }

    return true;
  }
}
