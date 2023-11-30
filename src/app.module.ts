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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get('MYSQL_HOST'),
    //     port: configService.get('MYSQL_PORT'),
    //     username: configService.get('MYSQL_USERNAME'),
    //     password: configService.get('MYSQL_PASSWORD'),
    //     database: configService.get('MYSQL_DATABASE'),
    //     entities: [path.join(__dirname, '*/*.entity{.ts,.js}')],
    //     synchronize: true,
    //     ssl: configService.get('MYSQL_SSL') === 'true',
    //     extra: {
    //       ssl:
    //         configService.get('MYSQL_SSL') === 'true'
    //           ? {
    //             rejectUnauthorized: false,
    //           }
    //           : null,
    //     },
    //   }),
    //   inject: [ConfigService]

    // }),
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
  // controllers: [AppController],
  controllers:[],
  // providers: [
  //   PostsService, AppService],
  // providers: [
  //   AppService],
  providers: [],
})
export class AppModule { }
