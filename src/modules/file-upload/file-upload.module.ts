import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileUploadController } from './file-upload.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '../../', 'uploads'),
    }),
  ],
  providers: [ ],
  controllers: [FileUploadController]
})
export class FileUploadModule { }
