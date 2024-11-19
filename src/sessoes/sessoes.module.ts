import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessoesService } from "./sessoes.service";
import { SessoesController } from "./sessoes.controller";
import { Sessoes } from "src/_common/entities/sessoes.entity";

@Module({
    controllers: [SessoesController],
    providers: [SessoesService],
    imports: [TypeOrmModule.forFeature([Sessoes])],
    exports: [SessoesService]
})
export class SessoesModule {}