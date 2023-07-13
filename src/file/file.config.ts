import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import * as path from 'path'

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {


        return {
            storage: diskStorage({
                destination: './public/images',
                filename: (req, file, cb) => {
                    //get image extension
                    let extName = path.extname(file.originalname);


                    //get image's name (without extension)
                    let baseName = path.basename(file.originalname, extName);
                    let finalName = `${baseName}-${Date.now()}${extName}`
                    cb(null, finalName)
                }
            })
        };
    }
}