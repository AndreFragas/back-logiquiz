import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from 'class-validator';

export class AlunosCreateDto {
    @ApiProperty()
    @IsNumber()
    usuario_id: number;

    @ApiProperty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsString()
    email: string;
}