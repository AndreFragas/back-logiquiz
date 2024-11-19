import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Menus } from "src/_common/entities/menus.entity";
import { Modulos } from "src/_common/entities/modulos.entity";
import { MenusViewDto } from "src/_common/views/menus-view.dto";
import { Permissoes } from "src/_common/entities/permissoes.entity";

@Injectable()
export class ModuloService {
    constructor(
        @InjectRepository(Modulos)
        private readonly moduloRepository: Repository<Modulos>
    ) {}

    async getMenusEModulos(): Promise<{ menus: MenusViewDto[], modulos: Modulos[] }> {
        const modulos = await this.moduloRepository.find({ where: { ativo: true }, relations: { menus: true }});
        const menus = await this.buildMenuTree(modulos.flatMap((modulo) => modulo.menus));

        return { menus, modulos };
    }

    async getPermissoes(): Promise<Permissoes[]> {
        const modulos = await this.moduloRepository.find({ where: { ativo: true}, relations: { permissoes: true }});
        const permissoes = modulos.flatMap((modulo) => modulo.permissoes);
        return permissoes
    }

    private async buildMenuTree(menus: Menus[]): Promise<MenusViewDto[]> {
        const filteredMenus = menus
            .sort((a, b) => a.ordem - b.ordem)
            .map((menu) => new MenusViewDto().toEntity(menu));

        const menuMap: Record<string, MenusViewDto> = {};
            
        filteredMenus.forEach((menu) => {
            menuMap[menu.id] = menu;
            menu.children = [];
        });
            
        const menuTree: MenusViewDto[] = [];

        filteredMenus.forEach((menu) => {
            if (menu.menu_pai_id && menuMap[menu.menu_pai_id]) {
                const parent = menuMap[menu.menu_pai_id];
                parent.children.push(menu);
            } else {
                menuTree.push(menu);
            }
        });

        const sortChildren = (node: MenusViewDto) => {
            if (node.children) {
                if (node.children.length === 0) {
                    return delete node.children;
                }
                node.children.sort((a, b) => a.ordem - b.ordem);
                node.children.forEach(sortChildren);
            }
        };

        menuTree.forEach(sortChildren);

        return menuTree;
    }
}