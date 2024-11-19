import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function create(entity: string, dto: any) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary: `Cria um novo ${entity}`,
      description: `Registra um novo ${entity} no sistema.`,
    })(target, propertyKey, descriptor);

    ApiBody({
      description: `Dados necessários para criar um novo ${entity}`,
      type: dto,
    })(target, propertyKey, descriptor);

    ApiResponse({
      status: 201,
      description: 'Success',
    })(target, propertyKey, descriptor);
  };
}

export function findAll(entity: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary: `Lista todos os ${entity}`,
      description: `Lista todos os ${entity} do sistema.`,
    })(target, propertyKey, descriptor);

    ApiResponse({
      status: 201,
      description: 'Success',
    })(target, propertyKey, descriptor);
  };
}

export function findOne(entity: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary: `Busca um ${entity}`,
      description: `Busca um ${entity}.`,
    })(target, propertyKey, descriptor);

    ApiResponse({
      status: 201,
      description: 'Success',
    })(target, propertyKey, descriptor);
  };
}

export function findOneBy(entity: string, campo: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary: `Busca um ${entity} pelo ${campo}`,
      description: `Busca um ${entity} pelo ${campo}.`,
    })(target, propertyKey, descriptor);

    ApiResponse({
      status: 201,
      description: 'Success',
    })(target, propertyKey, descriptor);
  };
}

export function update(entity: string, dto: any) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary: `Edita o ${entity}`,
      description: `Edita o ${entity}.`,
    })(target, propertyKey, descriptor);

    ApiBody({
      description: `Dados necessários para criar um novo ${entity}`,
      type: dto,
    })(target, propertyKey, descriptor);

    ApiResponse({
      status: 201,
      description: 'Success',
    })(target, propertyKey, descriptor);
  };
}

export function remove(entity: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary: `Exclui o ${entity}`,
      description: `Exclui a ${entity}.`,
    })(target, propertyKey, descriptor);

    ApiResponse({
      status: 201,
      description: 'Success',
    })(target, propertyKey, descriptor);
  };
}

export function findPagination(entity: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary: `Paginação de ${entity}`,
      description: `Retorno uma lista de paginação de ${entity}`,
    })(target, propertyKey, descriptor);

    ApiResponse({
      status: 201,
      description: 'Success',
    })(target, propertyKey, descriptor);
  };
}