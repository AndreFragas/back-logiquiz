import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray } from 'class-validator';
import { GrupoUsuariosPermissoesDto } from "./grupo-usuarios-permissoes.dto";

export class GrupoUsuariosCreateDto {
    @ApiProperty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsArray()
    grupo_usuario_permissoes: GrupoUsuariosPermissoesDto[];
}