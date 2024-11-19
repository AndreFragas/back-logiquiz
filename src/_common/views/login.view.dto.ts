import { BaseView } from "./base-view.dto";
import { MenusViewDto } from "./menus-view.dto";
import { ModulosViewDto } from "./modulos-view.dto";
import { UsuarioViewDto } from "./usuario-view.dto";
import { Usuario } from "../entities/usuario.entity";
import { Modulos } from "../entities/modulos.entity";
import { PermissoesViewDto } from "./permissoes-view.dto";

export class LoginViewDto extends BaseView {
    toEntity(usuario: Usuario, access_token: string, menus: MenusViewDto[], permissoes: PermissoesViewDto[], modulos: Modulos[], sessao_id: number): LoginViewDto {
        this.usuario = new UsuarioViewDto().toEntity(usuario, sessao_id);
        this.access_token = access_token;
        this.menus = menus;
        this.permissoes = permissoes;
        this.modulos = modulos.map((modulo: Modulos) => new ModulosViewDto().toEntity(modulo));
        this.removeNull();
        return this;
    }

    usuario: UsuarioViewDto;
    access_token: string;
    menus: MenusViewDto[];
    permissoes: PermissoesViewDto[];
    modulos: ModulosViewDto[]; 
}