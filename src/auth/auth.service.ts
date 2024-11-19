import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ModuloService } from 'src/modulo/modulo.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { SessoesService } from 'src/sessoes/sessoes.service';
import { Usuario } from 'src/_common/entities/usuario.entity';
import { Sessoes } from 'src/_common/entities/sessoes.entity';
import { LoginViewDto } from 'src/_common/views/login.view.dto';
import { PermissoesService } from 'src/permissoes/permissoes.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
    private readonly moduloService: ModuloService,
    private readonly permissoesService: PermissoesService,
    private readonly sessoesService: SessoesService
  ) {}

  async validateUser(email: string, senha: string): Promise<Usuario | null> {
    let usuario = await this.usuarioService.findOneByEmail(email);
    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      usuario.senha = ''
      return usuario;
    }
    return null;
  }

  async login(usuario: Usuario, hasSession: boolean): Promise<{access_token: string}> {
    const access_token = await this.jwtService.signAsync({ username: usuario.nome, sub: usuario.id, });
    const {modulos, menus} = await this.moduloService.getMenusEModulos();
    const permissoes = await this.permissoesService.getPermissoesPorGrupo(usuario.grupo_usuario_id);
    const sessao = await this.sessionManager(usuario.id, access_token, hasSession);
    return new LoginViewDto().toEntity(usuario, access_token, menus, permissoes, modulos, sessao.id);
  }

  async sessionManager(usuario_id: number, access_token: string, hasSession: boolean): Promise<Sessoes> { 
    if (hasSession) {
      await this.sessoesService.remove(usuario_id);
    }
    return await this.sessoesService.create(usuario_id, access_token);
  }
}