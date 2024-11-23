import { Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import { Pergunta } from './perguntas.entity';
import { Expose } from 'class-transformer';
import { BaseEntity } from './base-entity.entity';

@Entity('alternativas')
export class Alternativa extends BaseEntity{
  @Expose()
  @Column({ name: 'pergunta_id', type: 'int4' })
  pergunta_id: number;

  @Expose()
  @ManyToOne(() => Pergunta)
  @JoinColumn({ name: 'pergunta_id' })
  pergunta: Pergunta;

  @Expose()
  @Column({ name: 'texto', type: 'text' })
  texto: string;

  @Expose()
  @Column({ name: 'correta', type: 'boolean' })
  correta: boolean;
}