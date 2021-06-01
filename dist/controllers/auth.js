"use strict";
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
exports.googleSignin = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const generate_jwt_1 = require("../helpers/generate-jwt");
const google_verify_1 = require("../helpers/google-verify");
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        // Verificar si el email existe
        if (!user) {
            res.status(400).json({
                msg: 'User / Password are not valid - email'
            });
        }
        // Verificar si el usuario esta activo
        if (!user.status) {
            res.status(400).json({
                msg: 'User / Password are not valid - status: false'
            });
        }
        // Verificar el password
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            res.status(400).json({
                msg: 'User / Password are not valid - password'
            });
        }
        // Generar JWT
        const token = yield generate_jwt_1.generateJWT(user.id);
        res.json({
            user,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.googleSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { name, email, img } = yield google_verify_1.googleVerify(id_token);
        let user = yield user_1.default.findOne({ email });
        if (!user) {
            // Create user
            const data = {
                name,
                email,
                password: ':p',
                img,
                google: true
            };
            user = new user_1.default(data);
            yield user.save();
        }
        // Si el usuario en BD tiene estado false
        if (!user.status) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloquiado'
            });
        }
        // Generar el JWT
        const token = yield generate_jwt_1.generateJWT(user.id);
        res.json({
            user,
            token
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es valido'
        });
    }
});
//# sourceMappingURL=auth.js.map