import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from 'class-validator';

export class PerguntasFaseCreateDto {
    @ApiProperty()
    @IsNumber()
    pergunta_id: number;

    @ApiProperty()
    @IsNumber()
    fase_id: number;
}