import { MigrationInterface, QueryRunner } from "typeorm";

export class Sessoes1725880031046 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.sessoes (
                id int4 NOT NULL,
                token text NOT NULL,
                usuario_id int4 NOT NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                primary key(id),
                foreign key(usuario_id) references public.usuarios(id)
            );

            CREATE SEQUENCE public.sessoes_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.sessoes_id_seq OWNED BY public.sessoes.id;

            ALTER TABLE ONLY public.sessoes ALTER COLUMN id SET DEFAULT nextval('public.sessoes_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.sessoes    
        `)
    }

}
