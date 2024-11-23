import { Entity, ManyToOne, JoinColumn, Column} from 'typeorm';
import { Alternativa } from './alternativas.entity';
import { BaseEntity } from './base-entity.entity';
import { Expose } from 'class-transformer';
import { Aluno } from './alunos.entity';
import { Pergunta } from './perguntas.entity';
import { Jogo } from './jogos.entity';
import { Fase } from './fases.entity';

@Entity('respostas_alunos')
export class RespostaAluno extends BaseEntity {
  @Expose()
  @Column({ name: 'aluno_id', type: 'int4' })
  aluno_id: number;

  @Expose()
  @ManyToOne(() => Aluno)
  @JoinColumn({ name: 'aluno_id' })
  aluno: Aluno;

  @Expose()
  @Column({ name: 'pergunta_id', type: 'int4' })
  pergunta_id: number;

  @ManyToOne(() => Pergunta)
  @JoinColumn({ name: 'pergunta_id' })
  pergunta: Pergunta;

  @Expose()
  @Column({ name: 'alternativa_id', type: 'int4' })
  alternativa_id: number;

  @ManyToOne(() => Alternativa)
  @JoinColumn({ name: 'alternativa_id' })
  alternativa: Alternativa;

  @Expose()
  @Column({ name: 'jogo_id', type: 'int4' })
  jogo_id: number;

  @ManyToOne(() => Jogo)
  @JoinColumn({ name: 'jogo_id' })
  jogo: Jogo;

  @Expose()
  @Column({ name: 'fase_id', type: 'int4' })
  fase_id: number;

  @ManyToOne(() => Fase)
  @JoinColumn({ name: 'fase_id' })
  fase: Fase;

  @Expose()
  @Column({ name: 'tempo_resposta', type: 'int4', nullable: true })
  tempo_resposta: number; // Tempo em segundos que o aluno levou para responder a pergunta
}