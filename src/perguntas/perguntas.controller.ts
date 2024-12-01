import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth-guard';
import { SessionGuard } from 'src/jwt/jwt-session-guard';
import { CommonApiResponses } from '@farmafacil-web/prismafive/swagger';
import { create, findAll, findOne, findPagination, remove, update } from 'src/utils/swagger.utils';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PerguntasUpdateDto } from 'src/_common/dtos/perguntas-update.dto';
import { PerguntasCreateDto } from 'src/_common/dtos/perguntas-create.dto';
import { PerguntasService } from './perguntas.service';
import { PaginationParams } from '@farmafacil-web/prismafive/dtos';
import { Throttle } from '@nestjs/throttler';

@Controller('perguntas')
@ApiTags('Perguntas')
export class PerguntasController {
    constructor(private readonly perguntasService: PerguntasService) {}

    @Get('list')
    @findAll('perguntas')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async findAll() {
        return await this.perguntasService.findAll();
    }

    @Post('create')
    @create('pergunta', PerguntasCreateDto)
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async create(@Body() usuarioDto: PerguntasCreateDto) {
        return await this.perguntasService.create(usuarioDto);
    }

    @Get('getById:id')
    @findOne('pergunta')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async findOne(@Param('id') id: number) {
        return await this.perguntasService.findOne(id);
    }

    @Put(':id')
    @update('pergunta', PerguntasUpdateDto)
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async update(@Param('id') id: number, @Body() dto: PerguntasUpdateDto) {
        return await this.perguntasService.update(id, dto);
    }

    @Delete(':id')
    @remove('pergunta')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async remove(@Param('id') id: number) {
        return await this.perguntasService.remove(id);
    }
}
