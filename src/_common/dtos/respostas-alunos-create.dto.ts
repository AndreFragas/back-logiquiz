import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsArray } from 'class-validator';

export class RespostasAlunosCreateDto {
    @ApiProperty()
    @IsNumber()
    aluno_id: number;

    @ApiProperty()
    @IsNumber()
    jogo_id: number;

    @ApiProperty()
    @IsNumber()
    pergunta_id: number;

    @ApiProperty()
    @IsNumber()
    alternativa_id: number;

    @ApiProperty()
    @IsNumber()
    fase_id: number;
}