import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import User from '../models/user';
import { generateJWT } from "../helpers/generate-jwt";
import { googleVerify } from "../helpers/google-verify";


export const login = async(req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

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
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            res.status(400).json({
                msg: 'User / Password are not valid - password'
            });
        }

        // Generar JWT
        const token = await generateJWT(user.id);
        
        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

export const googleSignin = async(req: Request, res: Response) => {

    const  { id_token }  = req.body;

    try {

        const { name, email, img } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            // Create user
            const data = {
                name,
                email,
                password: ':p',
                img,
                google: true
            }

            user = new User(data);
            await user.save();
        }

         // Si el usuario en BD tiene estado false
         if (!user.status) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloquiado'
            });
        }

        // Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es valido'
        });
    }
}