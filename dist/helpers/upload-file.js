"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const uuidv4 = uuid_1.v4;
exports.uploadFile = (files, extensionsValid = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        // Validar extension
        if (!extensionsValid.includes(extension)) {
            return reject(`Extension ${extension} is not allowed - ${extensionsValid}`);
        }
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path_1.default.join(__dirname, '../uploads/', carpeta, nombreTemp);
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nombreTemp);
        });
    });
};
//# sourceMappingURL=upload-file.js.map