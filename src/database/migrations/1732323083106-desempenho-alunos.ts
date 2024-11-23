import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1732323083106 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.desempenho_alunos (
                id int4 NOT NULL,
                aluno_id int4 NOT NULL,
                jogo_id int4 NOT NULL,
                pontos numeric NOT NULL,
                ativo bool DEFAULT true NOT NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                primary key(id),
                foreign key(aluno_id) references public.alunos(id),
                foreign key(jogo_id) references public.jogos(id)
            );

            CREATE SEQUENCE public.desempenho_alunos_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.desempenho_alunos_id_seq OWNED BY public.desempenho_alunos.id;

            ALTER TABLE ONLY public.desempenho_alunos ALTER COLUMN id SET DEFAULT nextval('public.desempenho_alunos_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.desempenho_alunos    
        `)
    }

}
