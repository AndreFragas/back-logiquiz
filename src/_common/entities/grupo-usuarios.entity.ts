import { Usuario } from './usuario.entity';
import { Expose, Type } from 'class-transformer';
import { BaseEntity } from "./base-entity.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { GrupoUsuariosPermissoes } from './grupo-usuarios-permissoes.entity';

@Entity('grupo_usuarios')
export class GrupoUsuarios extends BaseEntity {
  @Expose()
  @Column({ type: 'text', unique: true })
  nome: string;

  @Expose()
  @Type(() => GrupoUsuariosPermissoes)
  @OneToMany(() => GrupoUsuariosPermissoes, (rolePermissions) => rolePermissions.grupo_usuarios, {
    cascade: true,
  })
  grupo_usuario_permissoes: GrupoUsuariosPermissoes[];

  @Expose()
  @Type(() => Usuario)
  @OneToMany(() => Usuario, (usuario) => usuario.grupo_usuarios)
  usuarios?: Usuario[];
}