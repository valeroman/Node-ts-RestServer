"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("../routes/users"));
class Server {
    constructor() {
        this.usersPath = '/api/users';
        this.app = express_1.default();
        this.port = process.env.PORT || '7001';
        // Middlewares
        this.middlewares();
        // Rutas de la aplicacion
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use(cors_1.default());
        // Lectura y parseo del body
        this.app.use(express_1.default.json());
        // Directorio publico
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.usersPath, users_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto ', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map