import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth-guard';
import { SessionGuard } from 'src/jwt/jwt-session-guard';
import { CommonApiResponses } from '@farmafacil-web/prismafive/swagger';
import { create, findAll, findOne, remove, update } from 'src/utils/swagger.utils';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JogosUpdateDto } from 'src/_common/dtos/jogos-update.dto';
import { JogosCreateDto } from 'src/_common/dtos/jogos-create.dto';
import { JogosService } from './jogos.service';

@Controller('jogos')
@ApiTags('Jogos')
export class JogosController {
    constructor(private readonly jogosService: JogosService) {}

    @Get('')
    @findAll('jogos')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async findAll() {
        return await this.jogosService.findAll();
    }

    @Post('')
    @create('jogo', JogosCreateDto)
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async create(@Body() usuarioDto: JogosCreateDto) {
        return await this.jogosService.create(usuarioDto);
    }

    @Get(':id')
    @findOne('jogo')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async findOne(@Param('id') id: number) {
        return await this.jogosService.findOne(id);
    }

    @Put(':id')
    @update('jogo', JogosUpdateDto)
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async update(@Param('id') id: number, @Body() dto: JogosUpdateDto) {
        return await this.jogosService.update(id, dto);
    }

    @Delete(':id')
    @remove('jogo')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async remove(@Param('id') id: number) {
        return await this.jogosService.remove(id);
    }
}
