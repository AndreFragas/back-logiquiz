import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class GrupoUsuariosPermissoesDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  grupo_usuario_id: number;

  @ApiProperty()
  @IsString()
  permissao_id: number;

  @ApiProperty()
  @IsBoolean()
  read: boolean;

  @ApiProperty()
  @IsBoolean()
  create: boolean;

  @ApiProperty()
  @IsBoolean()
  edit: boolean;

  @ApiProperty()
  @IsBoolean()
  delete: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  filial_id?: number;
}
