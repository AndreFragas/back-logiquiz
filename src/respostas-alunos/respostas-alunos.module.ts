import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RespostaAluno } from "src/_common/entities/respostas-alunos.entity";
import { RespostasAlunosService } from "./respostas-alunos.service";

@Module({
    providers: [RespostasAlunosService],
    imports: [TypeOrmModule.forFeature([RespostaAluno])],
    exports: [RespostasAlunosService]
})
export class RespostasAlunosModule {}