import { MigrationInterface, QueryRunner } from "typeorm";

export class Usuarios1725561246740 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.usuarios (
                id int4 NOT NULL,
                nome text NOT NULL,
                email text NOT NULL,
                senha text NOT NULL,
                ativo bool DEFAULT true NOT NULL,
                "admin" bool DEFAULT false NOT NULL,
                master bool DEFAULT false NOT NULL,
                telefone text NULL,
                foto text NULL,
                configuracao text NULL,
                grupo_usuario_id int4 NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                primary key(id),
                foreign key(grupo_usuario_id) references public.grupo_usuarios(id)
            );

            CREATE SEQUENCE public.usuarios_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;

            ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.usuarios    
        `)
    }
}
