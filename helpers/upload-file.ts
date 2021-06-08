import path from 'path';
import { v4 } from 'uuid';

const uuidv4 = v4;

export const uploadFile = (files: any, extensionsValid = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // Validar extension
        if (!extensionsValid.includes(extension)) {
            return reject(`Extension ${ extension } is not allowed - ${ extensionsValid }`);
        }

        const nombreTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err: any) => {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);
        });
    })
}