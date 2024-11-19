import { ApiTags } from "@nestjs/swagger";
import { findAll } from "src/utils/swagger.utils";
import { JwtAuthGuard } from "src/jwt/jwt-auth-guard";
import { PermissoesService } from "./permissoes.service";
import { SessionGuard } from "src/jwt/jwt-session-guard";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { CommonApiResponses } from "@farmafacil-web/prismafive/swagger";

@Controller('permissoes')
@ApiTags('Permissoes')
export class PermissoesController {
    constructor(private readonly permissoesService: PermissoesService) {}

    @Get('')
    @findAll('permissoes')
    @CommonApiResponses()
    @UseGuards(JwtAuthGuard, SessionGuard)
    async findAll() {
        return await this.permissoesService.findAll();
    }
}