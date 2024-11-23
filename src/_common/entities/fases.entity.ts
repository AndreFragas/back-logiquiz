import { Entity, Column, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import { Expose } from 'class-transformer';
import { BaseEntity } from './base-entity.entity';
import { Jogo } from './jogos.entity';
import { PerguntaFase } from './pergunta-fase.entity';

@Entity('fases')
export class Fase extends BaseEntity{
  @Expose()
  @Column({ name: 'jogo_id' ,type: 'int4' })
  jogo_id: number;

  @Expose()
  @ManyToOne(() => Jogo)
  @JoinColumn({ name: 'jogo_id' })
  jogo: Jogo;

  @Expose()
  @Column({ name: 'numero' ,type: 'int2' })
  numero: number;

  @Expose()
  @Column({ name: 'descricao' ,type: 'text', nullable: true })
  descricao: string;

  @Expose()
  @OneToMany(() => PerguntaFase, pergunta_fase => pergunta_fase.fase)
  perguntas: PerguntaFase[];
}