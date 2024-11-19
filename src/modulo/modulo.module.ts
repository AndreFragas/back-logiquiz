import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModuloService } from "./modulo.service";
import { Modulos } from "src/_common/entities/modulos.entity";

@Module({
    providers: [ModuloService],
    imports: [TypeOrmModule.forFeature([Modulos])],
    exports: [ModuloService]
})
export class ModuloModule {}