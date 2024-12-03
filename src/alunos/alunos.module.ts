import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Aluno } from "src/_common/entities/alunos.entity";
import { AlunosService } from "./alunos.service";
import { AlunosController } from "./alunos.controller";
import { JwtService } from "@nestjs/jwt";
import { SessionGuard } from "src/jwt/jwt-session-guard";
import { SessoesModule } from "src/sessoes/sessoes.module";

@Module({
    controllers: [AlunosController],
    imports: [TypeOrmModule.forFeature([Aluno]), SessoesModule],
    providers: [AlunosService, JwtService, SessionGuard],
    exports: [AlunosService]
})
export class AlunosModule {}