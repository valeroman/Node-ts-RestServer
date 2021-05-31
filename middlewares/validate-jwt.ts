import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';


declare global{
    namespace Express {
        interface Request {
            uid: string; 
            user: any;
        }
    }
}

export const validateJWT = async(req: Request , res: Response, next: any) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid }  = <any> jwt.verify(token, `${process.env.SECRET_KEY}`);

        const user = <any> await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            });
        }

        // req.uid = uid;
        req.user = user;
       
        // console.log('uid===>',req.user);



        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}