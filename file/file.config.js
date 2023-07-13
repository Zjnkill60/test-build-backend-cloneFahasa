"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterConfigService = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path = require("path");
let MulterConfigService = exports.MulterConfigService = class MulterConfigService {
    createMulterOptions() {
        return {
            storage: (0, multer_1.diskStorage)({
                destination: './public/images',
                filename: (req, file, cb) => {
                    let extName = path.extname(file.originalname);
                    let baseName = path.basename(file.originalname, extName);
                    let finalName = `${baseName}-${Date.now()}${extName}`;
                    cb(null, finalName);
                }
            })
        };
    }
};
exports.MulterConfigService = MulterConfigService = __decorate([
    (0, common_1.Injectable)()
], MulterConfigService);
//# sourceMappingURL=file.config.js.map