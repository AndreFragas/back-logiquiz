import { MigrationInterface, QueryRunner } from "typeorm";

export class GrupoUsuarios1725561204474 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.grupo_usuarios (
                id int4 NOT NULL,
                nome text NOT NULL,
                ativo bool DEFAULT true NOT NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                primary key(id)
            );

            CREATE SEQUENCE public.grupo_usuario_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.grupo_usuario_id_seq OWNED BY public.grupo_usuarios.id;

            ALTER TABLE ONLY public.grupo_usuarios ALTER COLUMN id SET DEFAULT nextval('public.grupo_usuario_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.grupo_usuarios    
        `)
    }

}
