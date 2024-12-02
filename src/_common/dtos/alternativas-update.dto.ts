import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class AlternativasUpdateDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    texto: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    correta: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    pergunta_id?: number;
}