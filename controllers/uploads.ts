import * as dotenv from "dotenv";
dotenv.config();

import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';

import cloudinary from 'cloudinary';
cloudinary.v2.config(`${ process.env.CLOUDINARY_URL }`);

import { uploadFile } from '../helpers';
import { User, Product } from "../models";


export const loadFile = async(req: Request, res: Response) => {

    try {

        const nombre = await uploadFile(req.files, undefined, 'imgs');

        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }
}

export const updateImagen = async(req: Request, res: Response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    // Limpieza de imagenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await uploadFile(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save()

    res.json(modelo);
}

export const updateImagenCloudinary = async(req: Request, res: Response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    // Limpieza de imagenes previas
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.v2.uploader.destroy(public_id);
    }

    const { tempFilePath }:any = req.files?.archivo;
    const { secure_url } = await cloudinary.v2.uploader.upload(tempFilePath);
    modelo.img = secure_url;
    await modelo.save();
    res.json(modelo);


}

export const showImagen = async(req: Request, res: Response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    // Limpieza de imagenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    const pathNoImage = path.join(__dirname, '../assets/no-image.jpg');

    res.sendFile(pathNoImage);
}