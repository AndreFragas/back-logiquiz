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
  @Column({ name: 'nome', type: 'text'})
  nome: string;

  @Expose()
  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao: string;

  @Expose()
  @Column({ name: 'dificuldade', type: 'int2'})
  dificuldade: number;

  @Expose()
  @OneToMany(() => Fase, fase => fase.jogo)
  fases: Fase[];
}