import { beforeEach } from "node:test";
import { UsuarioService } from "./usuario.service";
import { Test, TestingModule } from "@nestjs/testing";
import { UsuarioController } from "./usuario.controller";
import { UsuarioCreateDto } from "src/_common/dtos/usuario-create.dto";
import { UsuarioUpdateDto } from "src/_common/dtos/usuario-update.dto";

describe('UsuarioController', () => {
    let usuarioController: UsuarioController;
    
    const mockUsuarioService = {
        findAll: jest.fn(),
        findOneByEmail: jest.fn(),
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeAll(async () => {
        const modulo: TestingModule = await Test.createTestingModule({
            controllers: [UsuarioController],
            providers: [{ provide: UsuarioService, useValue: mockUsuarioService }]
        }).compile();

        usuarioController = modulo.get<UsuarioController>(UsuarioController);
    });

    beforeEach(() => {
        jest.resetAllMocks();
    })

    it('Deve estar definido', () => {
        expect(usuarioController).toBeDefined();
    });

    it('create', async () => {
        const usuarioDto: UsuarioCreateDto = {
            nome: "André",
            email: "andrefragas14@gmail.com",
            senha: "123"
        } 

        await usuarioController.create(usuarioDto);

        expect(mockUsuarioService.create).toHaveBeenCalledTimes(1);
        expect(mockUsuarioService.create).toHaveBeenCalledWith(usuarioDto);
    });

    it('findAll', async () => {
        await usuarioController.findAll();

        expect(mockUsuarioService.findAll).toHaveBeenCalledTimes(1);
        expect(mockUsuarioService.findAll).toHaveBeenCalledWith();
    })

    it('findOne', async () => {
        await usuarioController.findOne(1);

        expect(mockUsuarioService.findOne).toHaveBeenCalledTimes(1);
        expect(mockUsuarioService.findOne).toHaveBeenCalledWith(1);
    })

    it('findOneByEmail', async () => {
        await usuarioController.findOneByEmail('andrefragas14@gmail.com');

        expect(mockUsuarioService.findOneByEmail).toHaveBeenCalledTimes(1);
        expect(mockUsuarioService.findOneByEmail).toHaveBeenCalledWith('andrefragas14@gmail.com');
    })

    it('update', async () => {
        const usuarioDto: UsuarioUpdateDto = {
            nome: "André",
            email: "andrefragas14@gmail.com",
            senha: "123"
        } 

        await usuarioController.update(1, usuarioDto);

        expect(mockUsuarioService.update).toHaveBeenCalledTimes(1);
        expect(mockUsuarioService.update).toHaveBeenCalledWith(1, usuarioDto);
    })

    it('remove', async () => {
        await usuarioController.remove(1);

        expect(mockUsuarioService.remove).toHaveBeenCalledTimes(1);
        expect(mockUsuarioService.remove).toHaveBeenCalledWith(1);
    })
});