import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1732322954318 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.jogos (
                id int4 NOT NULL,
                professor_id int4 NOT NULL,
                deficuldade int2 NOT NULL,
                modo_selecao int2 NOT NULL,
                ativo bool DEFAULT true NOT NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                primary key(id),
                foreign key(professor_id) references public.usuarios(id)
            );

            CREATE SEQUENCE public.jogos_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.jogos_id_seq OWNED BY public.jogos.id;

            ALTER TABLE ONLY public.jogos ALTER COLUMN id SET DEFAULT nextval('public.jogos_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.jogos    
        `)
    }

}
