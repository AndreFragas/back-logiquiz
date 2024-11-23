import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1732323007971 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.fases (
                id int4 NOT NULL,
                jogo_id int4 NOT NULL,
                numero int2 NOT NULL,
                descricao text NULL,
                ativo bool DEFAULT true NOT NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                primary key(id),
                foreign key(jogo_id) references public.jogos(id)
            );

            CREATE SEQUENCE public.fases_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.fases_id_seq OWNED BY public.fases.id;

            ALTER TABLE ONLY public.fases ALTER COLUMN id SET DEFAULT nextval('public.fases_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.fases    
        `)
    }

}
