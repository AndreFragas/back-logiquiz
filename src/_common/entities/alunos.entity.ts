import { Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import { Expose } from 'class-transformer';
import { BaseEntity } from './base-entity.entity';
import { Usuario } from './usuario.entity';

@Entity('alunos')
export class Aluno extends BaseEntity{
  @Expose()
  @Column({ name: 'usuario_id', type: 'int4'})
  usuario_id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'matricula', type: 'text', length: 20, unique: true })
  matricula: string;

  @Column({ name: 'nome', type: 'text', length: 255 })
  nome: string;

  @Column({ name: 'email', type: 'text', length: 255, unique: true })
  email: string;

  @Column({ name: 'data_nascimento', type: 'date', nullable: true })
  data_nascimento?: Date;
}