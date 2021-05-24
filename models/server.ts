import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/users';

class Server {

    // propiedades
    private app: Application;
    private port: string;
    private usersPath = '/api/users'
    
    

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '7001';

        // Middlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();

    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto ', this.port);
        })
    }
}

export default Server;