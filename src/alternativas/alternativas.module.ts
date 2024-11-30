import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlternativasService } from "./alternativas.service";
import { Alternativa } from "src/_common/entities/alternativas.entity";

@Module({
    providers: [AlternativasService],
    imports: [TypeOrmModule.forFeature([Alternativa])],
    exports: [AlternativasService]
})
export class AlternativasModule {}