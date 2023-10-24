/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Post } from './posts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';


// Titulo , Contenido, AutorId: 10         <= Ejemplo

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        private usuariosService: UsuariosService,) { }

    async createPost(post: CreatePostDto) {
        const usuarioFound = await this.usuariosService.getUsuario(post.autorId)

        if (!usuarioFound) {
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
        }
        const newPost = this.postsRepository.create(post)
        return this.postsRepository.save(newPost)
    }

    getPosts() {
        return this.postsRepository.find({
            relations: ['autor']
        })
    }
}
