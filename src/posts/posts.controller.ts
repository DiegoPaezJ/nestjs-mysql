/*
https://docs.nestjs.com/controllers#controllers
*/

import { BadRequestException, Body, Controller, Get, Post, Type, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from 'src/helpers/images.helper';
import { IsOptional, ValidateNested } from 'class-validator';

import { extname } from 'path';
import { SavePostDto } from './dto/save-post.dto';
import { FileService } from 'src/services/file.service';

import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';


const storage = diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const extension = extname(file.originalname);
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${name}-${randomName}${extension}`);
    },
});

// Auth(Role.USUARIO) se declara a que acceso tiene cada uno de los roles
@Auth(Role.ADMIN)
@Auth(Role.SUPERADMIN)
@Auth(Role.USUARIO)
@Controller('posts')
export class PostsController {

    constructor(
        private postsService: PostsService,
        private fileService: FileService,
    ) { }

    // @Post()
    // createPost(@Body() post: CreatePostDto) {
    //     return this.postsService.createPost(post);
    // }


    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createPost(@UploadedFile() file: Express.Multer.File, @Body() post: CreatePostDto) {
        const maxFileSizeInBytes = 1024 * 1024; // 1 MB
        if (file.size > maxFileSizeInBytes) {
            throw new BadRequestException({
                statusCode: 400,
                message: {
                    file: 'peso de la imagen no valido',
                },
            });
        }
        const nombre = await this.fileService.saveFile(file, 'posts')

        return this.postsService.createPost({
            file: nombre, contenido: post.contenido,
            titulo: post.titulo, publicado: post.publicado
        });
    }

    // @Post()
    // @UseInterceptors(FileInterceptor('file', { storage }))
    // uploadFile(@UploadedFile() file) {
    //     console.log(file);
    //     return { message: 'Archivo cargado satisfactoriamente!', filename: file.filename };
    // }








    @Get()
    getPosts() {
        return this.postsService.getPosts();
    }

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file'))
    // async uploadFile(@UploadedFile() file: Express.Multer.File) {
    //     // Aquí puedes manejar la lógica para guardar el archivo en la base de datos
    //     // o realizar cualquier otra acción necesaria.
    //     console.log(file);
    //     return { message: 'Archivo subido con éxito' };
    // }

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file',{
    //     storage:diskStorage({
    //         destination:'./upload',
    //         filename:renameImage
    //     }),
    //     fileFilter:fileFilter
    // }))
    // async uploadFile(@UploadedFile() file: Express.Multer.File) {
    //     return await this.postsService.createPost({file:file.filename});
    // }
}
