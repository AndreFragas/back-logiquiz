import { Expose } from 'class-transformer';
import { Sessoes } from './sessoes.entity';
import { GrupoUsuarios } from "./grupo-usuarios.entity";
import { BaseEntity } from "../../_common/entities/base-entity.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity('usuarios')
export class Usuario extends BaseEntity {
    @Expose()
    @Column({ type: 'text' })
    nome: string;

    @Expose()
    @Column({ type: 'text' })
    email: string;

    @Expose()
    @Column({ type: 'text' })
    senha: string;

    @Expose()
    @Column({ type: 'boolean', default: false })
    admin: boolean;

    @Expose()
    @Column({ type: 'boolean', default: false })
    master: boolean;

    @Expose()
    @Column({ type: 'text', nullable: true })
    telefone?: string;

    @Expose()
    @Column({ type: 'text', nullable: true })
    foto?: string;

    @Expose()
    @Column({ type: 'text', nullable: true })
    configuracao?: string;

    @Expose()
    @Column({ type: 'numeric', nullable: true})
    grupo_usuario_id?: number;

    @Expose()
    @ManyToOne(() => GrupoUsuarios, (grupo_usuarios) => grupo_usuarios.usuarios)
    @JoinColumn({ name: 'grupo_usuario_id' })
    grupo_usuarios?: GrupoUsuarios;

    @Expose()
    @OneToOne(() => Sessoes, (sessao) => sessao.usuario)
    sessao?: Sessoes;
}