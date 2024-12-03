import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/_common/entities/usuario.entity';
import { UsuarioViewDto } from 'src/_common/views/usuario-view.dto';
import { UsuarioCreateDto } from 'src/_common/dtos/usuario-create.dto';
import { UsuarioUpdateDto } from 'src/_common/dtos/usuario-update.dto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AlunosService } from 'src/alunos/alunos.service';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        private readonly alunosService: AlunosService
    ) {}

    async findOneByEmail(email: string): Promise<Usuario> {
        return await this.usuarioRepository.findOne({ 
            where: { email },
            relations: {
                grupo_usuarios: true
            }
        }) || null;
    }

    async create(usuarioDto: UsuarioCreateDto) {
        const exist = await this.usuarioRepository.findOne({ where: { email: usuarioDto.email } });
        if (exist) throw new ConflictException(`Já existe um usuário com o email ${usuarioDto.email}`);
        usuarioDto.senha = await bcrypt.hash(usuarioDto.senha, 10);
        const novoUsuario = this.usuarioRepository.create(usuarioDto);
        await this.usuarioRepository.save(novoUsuario);
        if (novoUsuario.grupo_usuario_id === 3) await this.alunosService.create({ usuario_id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email});
        return { id: novoUsuario.id, nome: novoUsuario.nome }
    }

    async findAll() {
        const usuarios = await this.usuarioRepository.find({
            where: { ativo: true },
            order: { id: 'ASC' },
            relations: { grupo_usuarios: true }
        })
        if (!usuarios) return [];
        return usuarios.map((usuario: Usuario) => { return new UsuarioViewDto().toEntity(usuario) })
    }

    async findOne(id: number) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: id, ativo: true }, relations: { grupo_usuarios: true }});
        if (!usuario) throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        return new UsuarioViewDto().toEntity(usuario);
    }

    async update(id: number, usuarioDto: UsuarioUpdateDto) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: id }});
        if (!usuario) throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        this.usuarioRepository.merge(usuario, usuarioDto);
        if (usuarioDto.senha) {
            usuario.senha = await bcrypt.hash(usuarioDto.senha, 10);
        } else {
            delete usuario.senha;
        }

        usuario.data_atualizacao = new Date();
        await this.usuarioRepository.save(usuario);
        return new UsuarioViewDto().toEntity(usuario);
    }

    async remove(id: number) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: id, ativo: true }});
        if (!usuario) throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        await this.usuarioRepository.remove(usuario);
    }

    async removeGroups(usuarios: Usuario[]) {
        const updatedUsers: Usuario[] = [];

        for (const user of usuarios) {
          const usuario: Usuario = {
            ...user,
            grupo_usuario_id: null,
          };
          updatedUsers.push(usuario);
        }

        await this.usuarioRepository.save(updatedUsers);
    }
}