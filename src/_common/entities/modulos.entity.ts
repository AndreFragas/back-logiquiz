import { Menus } from './menus.entity';
import { Expose } from 'class-transformer';
import { Permissoes } from './permissoes.entity';
import { BaseEntity } from './base-entity.entity';
import { Column, Entity, OneToMany } from 'typeorm';


@Entity({ name: 'modulos' })
export class Modulos extends BaseEntity {
  @Expose()
  @Column({ type: 'text', unique: true })
  nome: string;

  @Expose()
  @OneToMany(() => Menus, (menuItem) => menuItem.modulo)
  menus?: Menus[];

  @Expose()
  @OneToMany(() => Permissoes, (permissao) => permissao.modulo)
  permissoes?: Permissoes[];
}
