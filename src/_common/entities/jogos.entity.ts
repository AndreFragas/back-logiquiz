import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Expose } from 'class-transformer';
import { Fase } from './fases.entity';
import { BaseEntity } from './base-entity.entity';

@Entity('jogos')
export class Jogo extends BaseEntity{
  @Expose()
  @Column({ name: 'professor_id' ,type: 'int4' })
  professor_id: number;

  @Expose()
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'professor_id' })
  professor: Usuario;

  @Expose()
  @Column({ name: 'dificuldade', type: 'int2'})
  dificuldade: number;

  @Expose()
  @Column({ name: 'modo_selecao', type: 'int2' })
  modo_selecao: number; // 0 - manual ou 1 - automatico

  @Expose()
  @OneToMany(() => Fase, fase => fase.jogo)
  fases: Fase[];
}