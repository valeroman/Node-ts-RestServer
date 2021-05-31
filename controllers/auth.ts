import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import User from '../models/user';
import { generateJWT } from "../helpers/generate-jwt";

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