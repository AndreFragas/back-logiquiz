import { Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import { BaseEntity } from "./base-entity.entity";
import { Expose } from 'class-transformer';
import { Pergunta } from './perguntas.entity';
import { Fase } from './fases.entity';

@Entity('pergunta_fase')
export class PerguntaFase extends BaseEntity {
    @Expose()
    @Column({ name: 'pergunta_id' ,type: 'int4' })
    pergunta_id: number;
  
    @Expose()
    @ManyToOne(() => Pergunta)
    @JoinColumn({ name: 'pergunta_id' })
    pergunta: Pergunta;

    @Expose()
    @Column({ name: 'fase_id' ,type: 'int4' })
    fase_id: number;
  
    @Expose()
    @ManyToOne(() => Fase)
    @JoinColumn({ name: 'fase_id' })
    fase: Fase;
}