import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1732323061271 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.pergunta_fase (
                id int4 NOT NULL,
                pergunta_id int4 NOT NULL,
                fase_id int4 NOT NULL,
                ativo bool DEFAULT true NOT NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                primary key(id),
                foreign key(pergunta_id) references public.perguntas(id),
                foreign key(fase_id) references public.fases(id)
            );

            CREATE SEQUENCE public.pergunta_fase_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.pergunta_fase_id_seq OWNED BY public.pergunta_fase.id;

            ALTER TABLE ONLY public.pergunta_fase ALTER COLUMN id SET DEFAULT nextval('public.pergunta_fase_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.pergunta_fase    
        `)
    }

}
