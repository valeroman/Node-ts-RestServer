"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileUpload = void 0;
exports.validateFileUpload = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos que subir - validarArchivoSuvir.' });
    }
    next();
};
//# sourceMappingURL=valid-file.js.map