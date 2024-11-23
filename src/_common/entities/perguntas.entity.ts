import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity.entity';
import { Expose } from 'class-transformer';

@Entity('perguntas')
export class Pergunta extends BaseEntity{
  @Expose()
  @Column({ name: 'texto', type: 'text' })
  texto: string;

  @Expose()
  @Column({ name: 'dificuldade', type: 'int2'})
  dificuldade: number;
}