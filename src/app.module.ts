import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SessoesModule } from './sessoes/sessoes.module';
import { DatabaseModule } from './database/database.module';
import { PermissoesModule } from './permissoes/permissoes.module';
import { ResponseLoggerMiddleware } from 'middlewares/response.middleware';
import { GrupoUsuariosModule } from './grupo-usuarios/grupo-usuarios.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EncryptionDecryptionMiddleware } from 'middlewares/encryptionDecryprion.middleware';
import { JogosModule } from './jogos/jogos.module';
import { PerguntasModule } from './perguntas/perguntas.module';
import { AlternativasModule } from './alternativas/alternativas.module';
import { FasesModule } from './fases/fases.module';
import { PerguntasFaseModule } from './perguntas-fase/perguntas-fase.module';
import { AlunosModule } from './alunos/alunos.module';
import { RespostasAlunosModule } from './respostas-alunos/respostas-alunos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    DatabaseModule,
    AuthModule,
    UsuarioModule,
    SessoesModule,
    PermissoesModule,
    GrupoUsuariosModule,
    JogosModule,
    PerguntasModule,
    AlternativasModule,
    FasesModule,
    PerguntasFaseModule,
    AlunosModule,
    RespostasAlunosModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EncryptionDecryptionMiddleware, ResponseLoggerMiddleware)
      .exclude({ path: 'encrypt', method: RequestMethod.ALL }, { path: 'decrypt', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}