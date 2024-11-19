import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { Usuario } from "src/_common/entities/usuario.entity";

describe('AuthController', () => {
    let authController: AuthController;
    
    const mockAuthService = {
        login: jest.fn(),
        validateUser: jest.fn()
    };

    beforeAll(async () => {
        const modulo: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ provide: AuthService, useValue: mockAuthService }]
        }).compile();

        authController = modulo.get<AuthController>(AuthController);
    });

    beforeEach(() => {
        jest.resetAllMocks();
    })

    it('Deve estar definido', () => {
        expect(authController).toBeDefined();
    });

    it ('login', async () => {
        const user: Usuario = {
            id: 1,
            nome: "André Luiz Fragas",
            email: "andrefragas14@gmail.com",
            senha: "",
            ativo: false,
            admin: false,
            master: false,
            data_criacao: undefined,
            data_atualizacao: undefined
        }

        mockAuthService.validateUser.mockReturnValueOnce(user)

        await authController.login({email: "andrefragas14@gmail.com", senha: "123"})

        expect(mockAuthService.validateUser).toHaveBeenCalledTimes(1);
        expect(mockAuthService.validateUser).toHaveBeenCalledWith("andrefragas14@gmail.com", "123");
        expect(mockAuthService.login).toHaveBeenCalledTimes(1);
        expect(mockAuthService.login).toHaveBeenCalledWith(user);
    })
});