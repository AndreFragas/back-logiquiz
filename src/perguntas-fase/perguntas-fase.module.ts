import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerguntaFase } from "src/_common/entities/pergunta-fase.entity";
import { PerguntasFaseService } from "./perguntas-fase.service";

@Module({
    providers: [PerguntasFaseService],
    imports: [TypeOrmModule.forFeature([PerguntaFase])],
    exports: [PerguntasFaseService]
})
export class PerguntasFaseModule {}