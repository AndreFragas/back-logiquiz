import { ApiTags } from "@nestjs/swagger";
import { SessoesService } from "./sessoes.service";
import { JwtAuthGuard } from "src/jwt/jwt-auth-guard";
import { SessionGuard } from "src/jwt/jwt-session-guard";
import { findAll, remove } from "src/utils/swagger.utils";
import { CommonApiResponses } from "@farmafacil-web/prismafive/swagger";
import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";

@Controller('sessoes')
@ApiTags('Sessoes')
export class SessoesController {
    constructor(private readonly sessoesService: SessoesService) {}

    @Delete(':id')
    @remove('Sessão')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    remove(@Param('id') usuario_id: number) {
        return this.sessoesService.remove(usuario_id);
    }

    @Get('')
    @findAll('sessões')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async findAll() {
        return await this.sessoesService.findAll();
    }
}