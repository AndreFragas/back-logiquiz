import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1732322819188 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.alunos (
                id int4 NOT NULL,
                usuario_id int4 NOT NULL,
                nome text NOT NULL,
                email text NOT NULL,
                matricula text NOT NULL,
                data_nascimento timestamp NULL,
                ativo bool DEFAULT true NOT NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                primary key(id),
                foreign key(usuario_id) references public.usuarios(id)
            );

            CREATE SEQUENCE public.alunos_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.alunos_id_seq OWNED BY public.alunos.id;

            ALTER TABLE ONLY public.alunos ALTER COLUMN id SET DEFAULT nextval('public.alunos_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.alunos    
        `)
    }
}
