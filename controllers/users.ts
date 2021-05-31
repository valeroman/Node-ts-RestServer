import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import User from '../models/user';



export const usersGet = async(req: Request, res: Response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        users
    });
}

export const userPost = async(req: Request, res: Response) => {

    const { name, email, password, role} = req.body;
    const user = new User({ name, email, password, role });

    // Encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.json({
        user
    });
}

export const userPut = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if (password) {
        // Encriptar password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controller',
        user
    });
}

export const userPatch = (req: Request, res: Response) => {

    res.json({
        msg: 'patch API - controller'
    });
}

export const userDelete = async(req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false });

    // const usuarioAutenticado = req.user;

    res.json(user);

    // res.json(user);
}

