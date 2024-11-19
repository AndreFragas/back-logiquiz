import { BaseView } from "./base-view.dto";
import { Permissoes } from "../entities/permissoes.entity";

export class PermissoesViewDto extends BaseView {
    toEntity(permissao: Permissoes, acoes: string[]): PermissoesViewDto {
        this.id = permissao.id;
        this.subject = permissao.nome;
        this.actions = acoes;
        this.final_rota = permissao.final_rota;
        this.admin = permissao.admin;
        this.filial = permissao.filial;
        this.removeNull();
        return this;
    }

    id: number;
    subject: string;
    actions: string[];
    final_rota: boolean;
    admin: boolean;
    filial: boolean;
}