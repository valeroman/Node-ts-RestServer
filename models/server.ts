import express, { Application } from 'express';
import cors from 'cors';

import fileUpload from 'express-fileupload';

import userRoutes from '../routes/users';
import authRoutes from '../routes/auth'
import categoryRoutes from '../routes/category';
import productRoutes from '../routes/product';
import searchRoutes from '../routes/search';
import uploadRoutes from '../routes/uploads';
import { dbConnection } from '../database/config';

class Server {

    // propiedades
    private app: Application;
    private port: string;
    private paths = {
        auth: '/api/auth',
        user: '/api/users',
        categories: '/api/categories',
        products: '/api/products',
        search: '/api/search',
        uploads: '/api/uploads',
    }
    
    

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '7001';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));

        // Fileupload - file upload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.categories, categoryRoutes);
        this.app.use(this.paths.products, productRoutes);
        this.app.use(this.paths.user, userRoutes);
        this.app.use(this.paths.search, searchRoutes);
        this.app.use(this.paths.uploads, uploadRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto ', this.port);
        })
    }
}

export default Server;