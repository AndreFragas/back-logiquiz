import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsArray } from 'class-validator';

export class JogosCreateDto {
    @ApiProperty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsNumber()
    professor_id: number;

    @ApiProperty()
    @IsString()
    descricao: string;

    @ApiProperty()
    @IsNumber()
    dificuldade: number;

    @ApiProperty()
    @IsArray()
    fase1: number[];

    @ApiProperty()
    @IsArray()
    fase2: number[];

    @ApiProperty()
    @IsArray()
    fase3: number[];
}