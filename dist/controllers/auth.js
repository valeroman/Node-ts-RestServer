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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const generate_jwt_1 = require("../helpers/generate-jwt");
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
//# sourceMappingURL=auth.js.map