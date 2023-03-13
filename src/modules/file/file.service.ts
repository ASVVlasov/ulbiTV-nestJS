import { Injectable, InternalServerErrorException } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { v4 } from 'uuid';

export enum EFileType {
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
}

@Injectable()
export class FileService {
  createFile(type: EFileType, file: Express.Multer.File): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', '..', '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  removeFile(inputFileName: string) {
    try {
      const type = inputFileName.split('/').shift();
      const fileName = inputFileName.split('/').pop();
      const filePath = path.resolve(__dirname, '..', '..', '..', 'static', type, fileName);
      if (fs.existsSync(filePath)) {
        fs.rmSync(filePath);
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
