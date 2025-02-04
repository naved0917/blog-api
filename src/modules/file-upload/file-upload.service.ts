import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fsPromises } from 'fs';

@Injectable()
export class FileUploadService {
    private readonly uploadPath = join(__dirname, '../../', 'uploads');
    async saveFile(file: Express.Multer.File): Promise<void> {
        console.log('files--',file);
        
        // for (const file of files) {
            const filePath = join(this.uploadPath, file.originalname);
            await fsPromises.writeFile(filePath, file.buffer);
        // }
    }
}
