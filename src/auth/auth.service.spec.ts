import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { Test, TestingModule } from "@nestjs/testing";
import { UsuarioService } from "src/usuario/usuario.service";
import { Usuario } from "src/_common/entities/usuario.entity";

describe('AuthService', () => {
    let authService: AuthService;

    const mockUsuarioService = {
        findOneByEmail: jest.fn()
    };

    const mockJwtService = {
        sign: jest.fn()
    };

    beforeAll(async () => {
        const modulo: TestingModule = await Test.createTestingModule({ 
            providers: [
                AuthService,
                { provide: UsuarioService, useValue: mockUsuarioService },
                { provide: JwtService, useValue: mockJwtService },
            ]
        }).compile();

        authService = modulo.get<AuthService>(AuthService);
    });

    beforeEach(() => {
        jest.resetAllMocks();
    })

    it('Deve estar definido', () => {
        expect(authService).toBeDefined();
    })

    describe('validadeUser', () => {
        it('Usuário valido', async () => {
            await authService.validateUser("andrefragas14@gmail.com", "123");

            expect(mockUsuarioService.findOneByEmail).toHaveBeenCalledTimes(1);
            expect(mockUsuarioService.findOneByEmail).toHaveBeenCalledWith("andrefragas14@gmail.com")
        })
    })

    describe('login', () => {
        it('Login efetuado', async () => {
            const usuario: Usuario = {
                id: 1,
                nome: "André Luiz Fragas",
                email: "andrefragas14@gmail.com",
                senha: "123",
                ativo: false,
                admin: false,
                master: false,
                data_criacao: undefined,
                data_atualizacao: undefined
            } 

            await authService.login(usuario, false);

            expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
            expect(mockJwtService.sign).toHaveBeenCalledWith({username: 'André Luiz Fragas', sub: 1});
        })

        it('Login efetuado com sessão já existente', async () => {
            const usuario: Usuario = {
                id: 1,
                nome: "André Luiz Fragas",
                email: "andrefragas14@gmail.com",
                senha: "123",
                ativo: false,
                admin: false,
                master: false,
                data_criacao: undefined,
                data_atualizacao: undefined
            } 

            await authService.login(usuario, true);

            expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
            expect(mockJwtService.sign).toHaveBeenCalledWith({username: 'André Luiz Fragas', sub: 1});
        })
    })
})