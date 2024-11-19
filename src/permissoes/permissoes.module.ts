import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModuloModule } from "src/modulo/modulo.module";
import { PermissoesService } from "./permissoes.service";
import { SessoesModule } from "src/sessoes/sessoes.module";
import { PermissoesController } from "./permissoes.controller";
import { Permissoes } from "src/_common/entities/permissoes.entity";
import { GrupoUsuariosPermissoesModule } from "src/grupo-usuarios-permissoes/grupo-usuarios-permissoes.module";

@Module({
    controllers: [PermissoesController],
    providers: [PermissoesService],
    imports: [
        TypeOrmModule.forFeature([Permissoes]),
        GrupoUsuariosPermissoesModule,
        ModuloModule,
        SessoesModule
    ],
    exports: [PermissoesService]
})
export class PermissoesModule {}