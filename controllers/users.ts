import { Request, Response } from "express";


export const usersGet = (req: Request, res: Response) => {

    const { apiKey, limit = 1 } = req.query;

    res.json({
        msg: 'get API - controller',
        apiKey,
        limit
    });
}

export const userPost = (req: Request, res: Response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - controller',
        nombre,
        edad
    });
}

export const userPut = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - controller',
        id
    });
}

export const userPatch = (req: Request, res: Response) => {

    res.json({
        msg: 'patch API - controller'
    });
}

export const userDelete = (req: Request, res: Response) => {

    res.json({
        msg: 'delete API - controller'
    });
}

