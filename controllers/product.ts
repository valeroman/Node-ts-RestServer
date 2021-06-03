import { Request, Response } from 'express';
import { Product } from '../models';

export const getProducts = async(req: Request, res: Response) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = { status: true };

    try {
        
        const [ total, products ] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .populate('user', 'name')
                .populate('category', 'name')
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
    
        res.json({
            total,
            products
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador.'
        });
    }
} 

export const getProduct = async(req: Request, res: Response) => {

    const { id } = req.params;

    try {
        
        const product = await Product.findById(id)
            .populate('user', 'name')
            .populate('category', 'name')
    
        res.json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const createProduct = async(req: Request, res: Response) => {

    const { status, user, ...body } = req.body;

    try {

        const productDB = await Product.findOne({ name: body.name });

        if (productDB) {
            return res.status(400).json({
                msg: `Product ${ productDB.name }, already exists`
            });
        }

        const data = {
            ...body,
            name: body.name.toUpperCase(),
            user: req.user._id
        }

        const product = new Product(data);

        await product.save();

        res.status(201).json(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const updateProduct = async(req: Request, res: Response) => {

    const { id } = req.params;

    const { status, user, ...data } = req.body;

    if (data.name) {

        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    try {
        
        const product = await Product.findByIdAndUpdate(id, data, { new: true });
    
        res.json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteProduct = async(req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

        res.json(product);
        
    } catch (error) {
        
    }
}