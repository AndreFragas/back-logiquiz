import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1732322924444 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.alternativas (
                id int4 NOT NULL,
                pergunta_id int4 NOT NULL,
                texto text NOT NULL,
                correta boolean DEFAULT false,
                ativo bool DEFAULT true NOT NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                primary key(id),
                foreign key(pergunta_id) references public.perguntas(id)
            );

            CREATE SEQUENCE public.alternativas_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.alternativas_id_seq OWNED BY public.alternativas.id;

            ALTER TABLE ONLY public.alternativas ALTER COLUMN id SET DEFAULT nextval('public.alternativas_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.alternativas    
        `)
    }

}
