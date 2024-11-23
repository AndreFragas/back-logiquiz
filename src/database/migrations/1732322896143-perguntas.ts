import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1732322896143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.perguntas (
                id int4 NOT NULL,
                texto text NOT NULL,
                dificuldade int2 NOT NULL,
                ativo bool DEFAULT true NOT NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                primary key(id)
            );

            CREATE SEQUENCE public.perguntas_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.perguntas_id_seq OWNED BY public.perguntas.id;

            ALTER TABLE ONLY public.perguntas ALTER COLUMN id SET DEFAULT nextval('public.perguntas_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.perguntas    
        `)
    }

}
