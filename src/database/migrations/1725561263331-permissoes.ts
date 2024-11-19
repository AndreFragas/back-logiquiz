import { MigrationInterface, QueryRunner } from "typeorm";

export class Permissoes1725561263331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.permissoes (
                id int4 NOT NULL,
                nome text NOT NULL,
                final_rota bool DEFAULT false NOT NULL,
                "admin" bool DEFAULT false NOT NULL,
                modulo_id int4 NOT NULL,
                filial bool DEFAULT false NOT NULL,
                ativo bool DEFAULT true NOT NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                primary key(id),
                foreign key(modulo_id) references public.modulos(id)
            );

            CREATE SEQUENCE public.permissoes_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.permissoes_id_seq OWNED BY public.permissoes.id;

            ALTER TABLE ONLY public.permissoes ALTER COLUMN id SET DEFAULT nextval('public.permissoes_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.permissoes    
        `)
    }

}
