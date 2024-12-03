import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fase } from "src/_common/entities/fases.entity";
import { FasesService } from "./fases.service";
import { PerguntasFaseModule } from "src/perguntas-fase/perguntas-fase.module";

@Module({
    providers: [FasesService],
    imports: [TypeOrmModule.forFeature([Fase]), PerguntasFaseModule],
    exports: [FasesService]
})
export class FasesModule {}