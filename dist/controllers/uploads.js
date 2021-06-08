"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showImagen = exports.updateImagenCloudinary = exports.updateImagen = exports.loadFile = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config(`${process.env.CLOUDINARY_URL}`);
const helpers_1 = require("../helpers");
const models_1 = require("../models");
exports.loadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nombre = yield helpers_1.uploadFile(req.files, undefined, 'imgs');
        res.json({ nombre });
    }
    catch (msg) {
        res.status(400).json({ msg });
    }
});
exports.updateImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'users':
            modelo = yield models_1.User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'products':
            modelo = yield models_1.Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }
    // Limpieza de imagenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path_1.default.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs_1.default.existsSync(pathImagen)) {
            fs_1.default.unlinkSync(pathImagen);
        }
    }
    const nombre = yield helpers_1.uploadFile(req.files, undefined, coleccion);
    modelo.img = nombre;
    yield modelo.save();
    res.json(modelo);
});
exports.updateImagenCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'users':
            modelo = yield models_1.User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'products':
            modelo = yield models_1.Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }
    // Limpieza de imagenes previas
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary_1.default.v2.uploader.destroy(public_id);
    }
    const { tempFilePath } = (_a = req.files) === null || _a === void 0 ? void 0 : _a.archivo;
    const { secure_url } = yield cloudinary_1.default.v2.uploader.upload(tempFilePath);
    modelo.img = secure_url;
    yield modelo.save();
    res.json(modelo);
});
exports.showImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'users':
            modelo = yield models_1.User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'products':
            modelo = yield models_1.Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }
    // Limpieza de imagenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path_1.default.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs_1.default.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }
    const pathNoImage = path_1.default.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathNoImage);
});
//# sourceMappingURL=uploads.js.map