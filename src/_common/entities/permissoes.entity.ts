import { Modulos } from './modulos.entity';
import { Expose, Type } from 'class-transformer';
import { BaseEntity } from './base-entity.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { GrupoUsuariosPermissoes } from './grupo-usuarios-permissoes.entity';

@Entity('permissoes')
export class Permissoes extends BaseEntity {
  @Expose()
  @Column({ name: 'nome', type: 'varchar' })
  nome: string;

  @Expose()
  @Column({ type: 'numeric' })
  modulo_id: number;

  @Expose()
  @Column({ type: 'boolean', nullable: true })
  final_rota?: boolean;

  @Expose()
  @Column({  type: 'boolean', nullable: true })
  admin?: boolean;

  @Expose()
  @Column({ type: 'boolean', nullable: true })
  filial?: boolean;

  @Expose()
  @ManyToOne(() => Modulos, (modulo) => modulo.permissoes)
  @JoinColumn({ name: 'modulo_id' })
  modulo: Modulos;

  @Expose()
  @Type(() => GrupoUsuariosPermissoes)
  @OneToMany(() => GrupoUsuariosPermissoes, (rolePermissions) => rolePermissions.grupo_usuarios, {
    cascade: true,
  })
  grupo_usuario_permissoes: GrupoUsuariosPermissoes[];

  acoes: string[];
}
