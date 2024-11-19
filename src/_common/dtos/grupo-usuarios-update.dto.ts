import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray, IsOptional, IsNumber } from 'class-validator';
import { GrupoUsuariosPermissoesDto } from "./grupo-usuarios-permissoes.dto";

export class GrupoUsuarioUpdateDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsArray()
    grupo_usuario_permissoes: GrupoUsuariosPermissoesDto[];
}
