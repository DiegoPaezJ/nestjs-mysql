import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  
  async saveFile(file: any, folderSave: string): Promise<string> {
    const extension = path.extname(file.originalname);
    const fileName = `${uuid()}${extension}`;
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'public',
      `uploads/${folderSave}`,
      fileName,
    );

    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    await fs.promises.writeFile(filePath, file.buffer);
    return `${folderSave}/${fileName}`;
  }

  async deleteFile(fileRoute: string) {
    if (!fileRoute) return;
    const splitPath = fileRoute.split('/');
    const filename = splitPath.pop();
    const folder = splitPath.join('/');

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'public',
      'uploads',
      folder,
      filename
    );

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }

}
