import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth-guard';
import { SessionGuard } from 'src/jwt/jwt-session-guard';
import { CommonApiResponses } from '@farmafacil-web/prismafive/swagger';
import { findAll, findOne,  } from 'src/utils/swagger.utils';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AlunosService } from './alunos.service';

@Controller('alunos')
@ApiTags('Alunos')
export class AlunosController {
    constructor(private readonly alunosService: AlunosService) {}

    @Get('list')
    @findAll('alunos')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async findAll() {
        return await this.alunosService.findAll();
    }

    @Get('getById/:id')
    @findOne('aluno')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async findOne(@Param('id') id: number) {
        return await this.alunosService.findOne(id);
    }
}
