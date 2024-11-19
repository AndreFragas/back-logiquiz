import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ type: 'boolean', default: true })
    ativo: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_criacao: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    data_atualizacao: Date;
}