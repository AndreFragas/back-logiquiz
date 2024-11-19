import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioModule } from "src/usuario/usuario.module";
import { SessoesModule } from "src/sessoes/sessoes.module";
import { GrupoUsuariosService } from "./grupo-usuarios.service";
import { GrupoUsuariosController } from "./grupo-usuarios.controller";
import { GrupoUsuarios } from "src/_common/entities/grupo-usuarios.entity";
import { GrupoUsuariosPermissoesModule } from "src/grupo-usuarios-permissoes/grupo-usuarios-permissoes.module";

@Module({
    controllers: [GrupoUsuariosController],
    providers: [GrupoUsuariosService],
    imports: [
        TypeOrmModule.forFeature([GrupoUsuarios]),
        GrupoUsuariosPermissoesModule,
        UsuarioModule,
        SessoesModule
    ],
    exports: [GrupoUsuariosService]
})
export class GrupoUsuariosModule {}