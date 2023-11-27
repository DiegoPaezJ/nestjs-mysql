import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import * as path from 'path';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
// importamos los modulos para enviar archivos hacia la base de datos
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [path.join(__dirname, '*/*.entity{.ts,.js}')],
      synchronize: true,
      ssl: process.env.MYSQL_SSL === 'true',
      extra: {
        ssl:
          process.env.MYSQL_SSL === 'true'
            ? {
              rejectUnauthorized: false,
            }
            : null,
      },
    }),
    UsuariosModule,
    PostsModule,
    AuthModule,
    // Directorio donde se guardarán los archivos
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  // controllers: [
  //   PostsController, AppController],
  controllers: [AppController],
  // providers: [
  //   PostsService, AppService],
  providers: [
    AppService],
})
export class AppModule { }
