import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class JogosUpdateDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    nome?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    descricao?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    dificuldade?: number;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    fase1?: number[];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    fase2?: number[];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    fase3?: number[];
}