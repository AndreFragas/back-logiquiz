import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GrupoUsuariosPermissoesService } from "./grupo-usuarios-permissoes.service";
import { GrupoUsuariosPermissoes } from "src/_common/entities/grupo-usuarios-permissoes.entity";

@Module({
    providers: [GrupoUsuariosPermissoesService],
    imports: [TypeOrmModule.forFeature([GrupoUsuariosPermissoes])],
    exports: [GrupoUsuariosPermissoesService]
})
export class GrupoUsuariosPermissoesModule {}