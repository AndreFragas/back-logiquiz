import { ApiTags } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth-guard';
import { SessionGuard } from 'src/jwt/jwt-session-guard';
import { UsuarioCreateDto } from 'src/_common/dtos/usuario-create.dto';
import { UsuarioUpdateDto } from 'src/_common/dtos/usuario-update.dto';
import { CommonApiResponses } from '@farmafacil-web/prismafive/swagger';
import { create, findAll, findOne, findOneBy, remove, update } from 'src/utils/swagger.utils';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

@Controller('usuarios')
@ApiTags('Usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get('')
    @findAll('usuários')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async findAll() {
        return await this.usuarioService.findAll();
    }

    @Get('email')
    @findOneBy('usuário', 'e-mail')
    @CommonApiResponses()
    async findOneByEmail(@Query() nome: string) {
        return await this.usuarioService.findOneByEmail(nome);
    }

    @Post('')
    @create('usuário', UsuarioCreateDto)
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async create(@Body() usuarioDto: UsuarioCreateDto) {
        return await this.usuarioService.create(usuarioDto);
    }

    @Get(':id')
    @findOne('usuário')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async findOne(@Param('id') id: number) {
        return await this.usuarioService.findOne(id);
    }

    @Put(':id')
    @update('usuário', UsuarioUpdateDto)
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async update(@Param('id') id: number, @Body() usuarioDto: UsuarioUpdateDto) {
        return await this.usuarioService.update(id, usuarioDto);
    }

    @Delete(':id')
    @remove('usuário')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async remove(@Param('id') id: number) {
        return await this.usuarioService.remove(id);
    }
}
