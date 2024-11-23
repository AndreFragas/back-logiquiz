import { Entity, ManyToOne, JoinColumn, Column} from 'typeorm';
import { BaseEntity } from './base-entity.entity';
import { Expose } from 'class-transformer';
import { Aluno } from './alunos.entity';
import { Jogo } from './jogos.entity';

@Entity('desempenho_alunos')
export class DesempenhoAluno extends BaseEntity {
  @Expose()
  @Column({ name: 'aluno_id', type: 'int4' })
  aluno_id: number;

  @ManyToOne(() => Aluno)
  @JoinColumn({ name: 'aluno_id' })
  aluno: Aluno;

  @Expose()
  @Column({ name: 'jogo_id', type: 'int4' })
  jogo_id: number;

  @ManyToOne(() => Jogo)
  @JoinColumn({ name: 'jogo_id' })
  jogo: Jogo;

  @Expose()
  @Column({ name: 'pontos', type: 'numeric' })
  pontos: number;
}