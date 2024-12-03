import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsArray } from 'class-validator';

export class FasesUpdateDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsArray()
    perguntas_ids: number[];
}