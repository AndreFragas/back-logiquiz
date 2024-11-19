import { MigrationInterface, QueryRunner } from "typeorm";

export class Menus1725561252536 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.menus (
                id int4 NOT NULL,
                icone text NULL,
                caminho text NULL,
                assunto text NULL,
                link_externo bool DEFAULT false NOT NULL,
                nova_janela bool DEFAULT false NOT NULL,
                menu_pai_id int4 NULL,
                ordem int4 NOT NULL,
                modulo_id int4 NOT NULL,
                ativo bool DEFAULT true NOT NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                primary key(id),
                foreign key(modulo_id) references public.modulos(id)
            );

            CREATE SEQUENCE public.menus_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.menus_id_seq OWNED BY public.menus.id;

            ALTER TABLE ONLY public.menus ALTER COLUMN id SET DEFAULT nextval('public.menus_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.menus    
        `)
    }
}
