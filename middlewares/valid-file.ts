import { Request, Response } from 'express';

export const validateFileUpload = (req: Request, res: Response, next: any) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos que subir - validarArchivoSuvir.' });
    }

    next();
}