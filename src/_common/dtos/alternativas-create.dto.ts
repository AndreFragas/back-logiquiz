import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean } from 'class-validator';

export class AlternativasCreateDto {
    @ApiProperty()
    @IsString()
    texto: string;

    @ApiProperty()
    @IsBoolean()
    correta: boolean;
}