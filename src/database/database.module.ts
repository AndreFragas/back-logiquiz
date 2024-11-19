import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menus } from "src/_common/entities/menus.entity";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Usuario } from "src/_common/entities/usuario.entity";
import { Modulos } from "src/_common/entities/modulos.entity";
import { Sessoes } from "src/_common/entities/sessoes.entity";
import { Permissoes } from "src/_common/entities/permissoes.entity";
import { GrupoUsuarios } from "src/_common/entities/grupo-usuarios.entity";
import { GrupoUsuariosPermissoes } from "src/_common/entities/grupo-usuarios-permissoes.entity";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: +configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                entities: [
                    Menus, 
                    Usuario,
                    Modulos,  
                    Sessoes, 
                    Permissoes, 
                    GrupoUsuarios, 
                    GrupoUsuariosPermissoes
                ],
                migrations: [__dirname + '/migrations/*'],
                synchronize: false,
            }),
        }),
    ]
})

export class DatabaseModule {}