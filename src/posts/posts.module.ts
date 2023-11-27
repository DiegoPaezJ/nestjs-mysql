/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { FileService } from 'src/services/file.service';
import { ValidateFileConstraint } from 'src/constraints/validate-file.constraint';

@Module({
    imports: [TypeOrmModule.forFeature([Post]), UsuariosModule],
    providers: [PostsService, FileService, ValidateFileConstraint],
    controllers: [PostsController] 

})
export class PostsModule { }
