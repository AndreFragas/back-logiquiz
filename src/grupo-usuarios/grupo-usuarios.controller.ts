import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/jwt/jwt-auth-guard";
import { SessionGuard } from "src/jwt/jwt-session-guard";
import { GrupoUsuariosService } from "./grupo-usuarios.service";
import { CommonApiResponses } from "@farmafacil-web/prismafive/swagger";
import { create, findAll, remove, update } from "src/utils/swagger.utils";
import { GrupoUsuarioUpdateDto } from "src/_common/dtos/grupo-usuarios-update.dto";
import { GrupoUsuariosCreateDto } from "src/_common/dtos/grupo-usuarios-create.dto";
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";

@Controller('grupo-usuarios')
@ApiTags('Grupo Usuarios')
export class GrupoUsuariosController {
    constructor(private readonly grupoUsuariosService: GrupoUsuariosService) {}

    @Post('')
    @create('Grupo usuários', GrupoUsuariosCreateDto)
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async create(@Body() createGrupoUsuarioDto: GrupoUsuariosCreateDto) {
        return await this.grupoUsuariosService.create(createGrupoUsuarioDto);
    }

    @Get('')
    @findAll('grupo usuarios')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async findAll() {
        return await this.grupoUsuariosService.findAll();
    }

    @Put(':id')
    @update('Grupo usuários', GrupoUsuarioUpdateDto)
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    update(@Param('id') id: number, @Body() updateGrupoUsuarioDto: GrupoUsuarioUpdateDto) {
        return this.grupoUsuariosService.update(id, updateGrupoUsuarioDto);
    }

    @Delete(':id')
    @remove('Grupo usuario')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    remove(@Param('id') id: number) {
        return this.grupoUsuariosService.remove(id);
    }
}