import { BaseView } from "./base-view.dto"
import { Menus } from "../entities/menus.entity";

export class MenusViewDto extends BaseView {
    toEntity(menu: Menus): MenusViewDto {
        this.id = menu.id;
        this.action = 'read';
        this.subject = menu.assunto;
        this.title = menu.assunto;
        this.path = menu.caminho;
        this.icon = menu.icone;
        this.disabled = !menu.ativo;
        this.ordem = menu.ordem;
        this.menu_pai_id = menu.menu_pai_id;
        this.children = menu.filhos ? menu.filhos.map((filho: Menus) => new MenusViewDto().toEntity(filho)) : undefined;
        this.removeNull();
        return this;
    }

    id: number;
    action: string;
    subject: string;
    title: string;
    children?: MenusViewDto[];
    path?: string;
    icon?: string;
    disabled?: boolean;
    ordem: number;
    menu_pai_id?: number;
} 