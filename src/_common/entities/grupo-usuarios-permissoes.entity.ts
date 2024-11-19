import { Expose } from 'class-transformer';
import { Permissoes } from './permissoes.entity';
import { BaseEntity } from './base-entity.entity';
import { GrupoUsuarios } from './grupo-usuarios.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('grupo_usuarios_permissoes')
export class GrupoUsuariosPermissoes extends BaseEntity {
  @Expose()
  @PrimaryColumn({ type: 'numeric' })
  grupo_usuario_id: number;

  @Expose()
  @PrimaryColumn({  type: 'numeric' })
  permissao_id: number;

  @Expose()
  @Column({ type: 'boolean', default: false })
  read: boolean;

  @Expose()
  @Column({ type: 'boolean', default: false })
  create: boolean;

  @Expose()
  @Column({ type: 'boolean', default: false })
  edit: boolean;

  @Expose()
  @Column({ type: 'boolean', default: false })
  delete: boolean;

  @Expose()
  @Column({ type: 'numeric', nullable: true })
  filial_id?: number;

  @Expose()
  @ManyToOne(() => GrupoUsuarios, (grupo_usuario) => grupo_usuario.grupo_usuario_permissoes)
  @JoinColumn({ name: 'grupo_usuario_id' })
  grupo_usuarios: GrupoUsuarios;

  @Expose()
  @ManyToOne(() => Permissoes, (permissoes) => permissoes.grupo_usuario_permissoes)
  @JoinColumn({ name: 'permissao_id' })
  permissao: Permissoes;
}
