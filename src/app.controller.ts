import {
  Controller, Get, ParseFilePipeBuilder,
  Post,Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CreatePostDto } from './posts/dto/create-post.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('file')
  // uploadFile(
  //   @Body() body: CreatePostDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file: file.buffer.toString(),
  //   };
  // }
  
}
