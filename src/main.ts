import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as momentTimezone from 'moment-timezone';
import { AllExceptionsFilter } from '@farmafacil-web/prismafive/filters';
import { TimeoutInterceptor } from '@farmafacil-web/prismafive/interceptors';
import { SwaggerConfig, createDocument } from '@farmafacil-web/prismafive/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.enableCors();

  const swaggerConfig: SwaggerConfig = {
    title: 'Albionboard API',
    description: 'Api for Albionboard.',
    version: '1.0',
    contact: {
      name: 'Developer Support',
      url: 'Fragas.com/contact',
      email: 'fragasdev@gmail.com',
    },
    tags: [],
  };

  SwaggerModule.setup('/api', app, createDocument(app, swaggerConfig));

  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  Date.prototype.toJSON = function (): any {
    return momentTimezone(this).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen(3000);
}
bootstrap();