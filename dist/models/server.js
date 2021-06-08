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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const users_1 = __importDefault(require("../routes/users"));
const auth_1 = __importDefault(require("../routes/auth"));
const category_1 = __importDefault(require("../routes/category"));
const product_1 = __importDefault(require("../routes/product"));
const search_1 = __importDefault(require("../routes/search"));
const uploads_1 = __importDefault(require("../routes/uploads"));
const config_1 = require("../database/config");
class Server {
    constructor() {
        this.paths = {
            auth: '/api/auth',
            user: '/api/users',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads',
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '7001';
        // Conectar a base de datos
        this.conectarDB();
        // Middlewares
        this.middlewares();
        // Rutas de la aplicacion
        this.routes();
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.dbConnection();
        });
    }
    middlewares() {
        // CORS
        this.app.use(cors_1.default());
        // Lectura y parseo del body
        this.app.use(express_1.default.json());
        // Directorio publico
        this.app.use(express_1.default.static('public'));
        // Fileupload - file upload
        this.app.use(express_fileupload_1.default({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        this.app.use(this.paths.auth, auth_1.default);
        this.app.use(this.paths.categories, category_1.default);
        this.app.use(this.paths.products, product_1.default);
        this.app.use(this.paths.user, users_1.default);
        this.app.use(this.paths.search, search_1.default);
        this.app.use(this.paths.uploads, uploads_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto ', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map