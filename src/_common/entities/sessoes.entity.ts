import { Expose } from 'class-transformer';
import { Usuario } from "./usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('sessoes')
export class Sessoes {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ type: 'text' })
    token: string;

    @Expose()
    @Column({ type: 'numeric' })
    usuario_id: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_criacao: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    data_atualizacao: Date;

    @Expose()
    @OneToOne(() => Usuario, (usuario) => usuario.sessao)
    @JoinColumn({ name: 'usuario_id' })
    usuario?: Usuario;
}