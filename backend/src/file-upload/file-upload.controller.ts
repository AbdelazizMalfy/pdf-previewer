import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as pdfParse from 'pdf-parse';

@Controller('upload')
export class FileUploadController {
  @Post()
  @UseInterceptors(FileInterceptor('pdf'))
  async uploadFile(@UploadedFile() file, @Res() res: Response) {
    if (!file) {
      return res.status(400).send('No PDF file uploaded.');
    }

    try {
      const data = await pdfParse(file.buffer);
      const trimmedText = data.text.replace(/^\s*\n/, '');
      return res.send(trimmedText);
    } catch (e) {
      return res.status(500).send('Failed to parse the file');
    }
  }
}
