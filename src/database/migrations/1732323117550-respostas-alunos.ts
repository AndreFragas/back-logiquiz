import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1732323117550 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.respostas_alunos (
                id int4 NOT NULL,
                aluno_id int4 NOT NULL,
                jogo_id int4 NOT NULL,
                pergunta_id int4 NOT NULL,
                alternativa_id int4 NOT NULL,
                fase_id int4 NOT NULL,
                tempo_resposta int4 NULL,
                ativo bool DEFAULT true NOT NULL,
                data_criacao timestamp DEFAULT now() NOT NULL,
                data_atualizacao timestamp DEFAULT now() NOT NULL,
                primary key(id),
                foreign key(aluno_id) references public.alunos(id),
                foreign key(pergunta_id) references public.perguntas(id),
                foreign key(alternativa_id) references public.alternativas(id),
                foreign key(fase_id) references public.fases(id),
                foreign key(jogo_id) references public.jogos(id)
            );

            CREATE SEQUENCE public.respostas_alunos_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.respostas_alunos_id_seq OWNED BY public.respostas_alunos.id;

            ALTER TABLE ONLY public.respostas_alunos ALTER COLUMN id SET DEFAULT nextval('public.respostas_alunos_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.respostas_alunos    
        `)
    }

}
