// import dotenv from 'dotenv';
import { connect } from 'mongoose';
// dotenv.config();

export const dbConnection = async () => {
    try {

        await connect(`${process.env.MONGODB_CNN}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
}