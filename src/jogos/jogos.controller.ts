import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth-guard';
import { SessionGuard } from 'src/jwt/jwt-session-guard';
import { CommonApiResponses } from '@farmafacil-web/prismafive/swagger';
import { create, findAll, findOne, update } from 'src/utils/swagger.utils';
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JogosUpdateDto } from 'src/_common/dtos/jogos-update.dto';
import { JogosCreateDto } from 'src/_common/dtos/jogos-create.dto';
import { JogosService } from './jogos.service';
import { SalvarRespostasJogoDto } from 'src/_common/dtos/salvar-respostas-jogo.dto';

@Controller('jogos')
@ApiTags('Jogos')
export class JogosController {
    constructor(private readonly jogosService: JogosService) {}

    @Get('list')
    @findAll('jogos')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async findAll() {
        return await this.jogosService.findAll();
    }

    @Post('create')
    @create('jogo', JogosCreateDto)
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async create(@Body() usuarioDto: JogosCreateDto) {
        return await this.jogosService.create(usuarioDto);
    }

    @Get('getById/:id')
    @findOne('jogo')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async findOne(@Param('id') id: number) {
        return await this.jogosService.findOne(id);
    }

    @Post('salvar-respostas')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async salvarResposta(@Body() dto: SalvarRespostasJogoDto) {
        return await this.jogosService.salvarResposta(dto);
    }
}
