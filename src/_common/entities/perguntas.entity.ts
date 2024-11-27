import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity.entity';
import { Expose, Type } from 'class-transformer';
import { Alternativa } from './alternativas.entity';

@Entity('perguntas')
export class Pergunta extends BaseEntity{
  @Expose()
  @Column({ name: 'texto', type: 'text' })
  texto: string;

  @Expose()
  @Column({ name: 'dificuldade', type: 'int2'})
  dificuldade: number;

  @Expose()
  @Type(() => Alternativa)
  @OneToMany(() => Alternativa, (alternativa) => alternativa.pergunta, {
    cascade: true,
  })
  alternativas: Alternativa[];
}