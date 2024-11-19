import { Repository } from 'typeorm';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Usuario } from 'src/_common/entities/usuario.entity';
import { UsuarioViewDto } from 'src/_common/views/usuario-view.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsuarioUpdateDto } from 'src/_common/dtos/usuario-update.dto';
import { UsuarioCreateDto } from 'src/_common/dtos/usuario-create.dto';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<Usuario>;

  const mockUsuarioRepository = () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
    merge: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockUsuarioRepository(),
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  });

  describe('create', () => {
    it('deve lançar ConflictException se o usuário já existir', async () => {
      const dto: UsuarioCreateDto = {
        email: 'teste@example.com',
        senha: 'senha',
        nome: 'Usuário Teste',
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue({} as Usuario);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });

    it('deve criar um novo usuário com sucesso', async () => {
      const dto: UsuarioCreateDto = {
        email: 'teste@example.com',
        senha: 'senha',
        nome: 'Usuário Teste',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      jest.spyOn(repository, 'create').mockReturnValue({
        ...dto,
        id: 1,
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValue({
        ...dto,
        id: 1,
      } as Usuario);

      const resultado = await service.create(dto);

      expect(resultado).toEqual({
        id: 1,
        nome: 'Usuário Teste',
      });
    });

    describe('findAll', () => {});
  });

  describe('findOne', () => {
    it('deve lançar NotFoundException se o usuário não for encontrado', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });

    it('deve retornar o usuário se encontrado', async () => {
      const usuario = { id: 1, nome: 'Usuário 1' } as Usuario;
      jest.spyOn(repository, 'findOne').mockResolvedValue(usuario);

      const resultado = await service.findOne(1);

      expect(resultado).toEqual(new UsuarioViewDto().toEntity(usuario));
    });
  });

  describe('update', () => {
    it('deve lançar NotFoundException se o usuário não for encontrado', async () => {
      const dto: UsuarioUpdateDto = { nome: 'Usuário Atualizado' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, dto)).rejects.toThrow(NotFoundException);
    });

    it('deve atualizar o usuário com sucesso', async () => {
      const dto: UsuarioUpdateDto = {
        nome: 'Usuário Atualizado',
        senha: 'novasenha',
      };
      const usuario = {
        id: 1,
        nome: 'Usuário Atualizado',
        senha: 'novasenha',
      } as Usuario;
      jest.spyOn(repository, 'findOne').mockResolvedValue(usuario);

      jest.spyOn(repository, 'merge').mockReturnValue({ ...usuario, ...dto });
      jest.spyOn(repository, 'save').mockResolvedValue({ ...usuario, ...dto });

      const resultado = await service.update(1, dto);

      expect(resultado).toEqual(
        new UsuarioViewDto().toEntity({ ...usuario, ...dto }),
      );
    });
  });

  describe('remove', () => {
    it('deve lançar NotFoundException se o usuário não for encontrado', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });

    it('deve remover o usuário com sucesso', async () => {
      const usuario = { id: 1, nome: 'Usuário 1' } as Usuario;
      jest.spyOn(repository, 'findOne').mockResolvedValue(usuario);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      await expect(service.remove(1)).resolves.not.toThrow();
    });
  });
});
