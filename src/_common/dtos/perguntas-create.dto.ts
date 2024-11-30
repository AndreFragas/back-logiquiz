import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsArray } from 'class-validator';
import { AlternativasCreateDto } from "./alternativas-create.dto";

export class PerguntasCreateDto {
    @ApiProperty()
    @IsString()
    texto: string;

    @ApiProperty()
    @IsNumber()
    dificuldade: number;

    @ApiProperty()
    @IsArray()
    alternativas: AlternativasCreateDto[];
}