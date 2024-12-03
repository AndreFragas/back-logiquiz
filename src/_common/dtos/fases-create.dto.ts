import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsArray } from 'class-validator';

export class FasesCreateDto {
    @ApiProperty()
    @IsNumber()
    jogo_id: number;

    @ApiProperty()
    @IsNumber()
    numero: number;

    @ApiProperty()
    @IsArray()
    perguntas_ids: number[];
}