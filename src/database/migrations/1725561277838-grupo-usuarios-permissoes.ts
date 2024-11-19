import { MigrationInterface, QueryRunner } from "typeorm";

export class GrupoUsuariosPermissoes1725561277838 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.grupo_usuarios_permissoes (
                id int4 NOT NULL,
                ativo bool DEFAULT true NOT NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                grupo_usuario_id int4 NOT NULL,
                permissao_id int4 NOT NULL,
                "read" bool DEFAULT false NOT NULL,
                "create" bool DEFAULT false NOT NULL,
                edit bool DEFAULT false NOT NULL,
                "delete" bool DEFAULT false NOT NULL,
                filial_id int4 NULL,
                primary key(id),
                foreign key(grupo_usuario_id) references public.grupo_usuarios(id),
                foreign key(permissao_id) references public.permissoes(id)
            );

            CREATE SEQUENCE public.grupo_usuarios_permissoes_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.grupo_usuarios_permissoes_id_seq OWNED BY public.grupo_usuarios_permissoes.id;

            ALTER TABLE ONLY public.grupo_usuarios_permissoes ALTER COLUMN id SET DEFAULT nextval('public.grupo_usuarios_permissoes_id_seq'::regclass);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.grupo_usuarios_permissoes    
        `)
    }

}
