/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
    imports: [TypeOrmModule.forFeature([Post]), UsuariosModule],
    providers: [PostsService],
    controllers: [PostsController] 

})
export class PostsModule { }
