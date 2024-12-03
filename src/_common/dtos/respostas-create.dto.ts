import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from 'class-validator';

export class RespostasCreateDto {
    @ApiProperty()
    @IsNumber()
    fase_id: number;

    @ApiProperty()
    @IsNumber()
    alternativa_id: number;

    @ApiProperty()
    @IsNumber()
    pergunta_id: number;
}