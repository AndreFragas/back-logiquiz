import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { AlternativasUpdateDto } from "./alternativas-update.dto";

export class PerguntasUpdateDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    texto: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    dificuldade: number;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    alternativas: AlternativasUpdateDto[];
}