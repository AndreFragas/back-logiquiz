import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class UsuarioCreateDto {
    @ApiProperty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    senha: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    ativo?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    master?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    admin?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsString()
    telefone?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    configuracao?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    foto?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    grupo_usuario_id?: number;
}
