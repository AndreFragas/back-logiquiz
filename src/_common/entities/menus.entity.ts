import { Expose } from 'class-transformer';
import { Modulos } from './modulos.entity';
import { BaseEntity } from './base-entity.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('menus')
export class Menus extends BaseEntity {
  @Expose()
  @Column({ type: 'text', nullable: true })
  icone?: string;

  @Expose()
  @Column({ type: 'text', nullable: true })
  caminho: string;

  @Expose()
  @Column({ type: 'text' })
  assunto: string;

  @Expose()
  @Column({ type: 'boolean', default: false, nullable: true })
  link_externo: boolean;

  @Expose()
  @Column({ type: 'boolean', default: false, nullable: true })
  nova_janela: boolean;

  @Expose()
  @Column({ type: 'numeric', nullable: true })
  menu_pai_id?: number;

  @Expose()
  @Column({ type: 'numeric' })
  ordem: number;

  @Expose()
  @Column({  type: 'numeric' })
  modulo_id: number;

  @ManyToOne(() => Modulos, (modulo) => modulo.menus)
  @JoinColumn({ name: 'modulo_id' })
  modulo: Modulos;

  @Expose()
  filhos?: Menus[];

  @Expose()
  pai?: Menus;
}
