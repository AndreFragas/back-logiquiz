import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsArray } from 'class-validator';
import { RespostasCreateDto } from "./respostas-create.dto";

export class SalvarRespostasJogoDto {
    @ApiProperty()
    @IsNumber()
    usuario_id: number;

    @ApiProperty()
    @IsNumber()
    jogo_id: number;

    @ApiProperty()
    @IsArray()
    respostas: RespostasCreateDto[];
}