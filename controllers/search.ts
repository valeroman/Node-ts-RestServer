import { Request, Response } from 'express';
import ObjectId  from 'mongoose'

import { Category, Product, User } from '../models';

const collectionAllowed = [
    'users',
    'categories',
    'products'
];

const searchUsers = async(termino = '', res: Response) => {

    try {
        
        const isMongoId = ObjectId.isValidObjectId(termino);
    
        if (isMongoId) {
            const user = await User.findById(termino);
            return res.json({
                results: (user) ? [user] : []
            });
        }

        const regex = new RegExp(termino, 'i');
        const query = { $or: [{ name: regex }, { email: regex }], $and: [{ status: true }] }

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
        ]);

        res.json({
            results: {
                total,
                users
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const searchCategories = async(termino = '', res: Response) => {

    try {
        
        const isMongoId = ObjectId.isValidObjectId(termino);
    
        if (isMongoId) {
            const category = await Category.findById(termino);
            return res.json({
                results: (category) ? [category] : []
            });
        }

        const regex = new RegExp(termino, 'i');
        const query = { $or: [{ name: regex }], $and: [{ status: true }] }

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
        ]);

        res.json({
            results: {
                total,
                categories
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const searchProducts = async(termino = '', res: Response) => {

    try {
        
        const isMongoId = ObjectId.isValidObjectId(termino);
    
        if (isMongoId) {
            const product = await Product.findById(termino);
            return res.json({
                results: (product) ? [product] : []
            });
        }

        const regex = new RegExp(termino, 'i');
        const query = { $or: [{ name: regex }, { description: regex }], $and: [{ status: true }] }

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
        ]);

        res.json({
            results: {
                total,
                products
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}



const search = (req: Request, res: Response) => {

    const { collection, termino } = req.params;

    if (!collectionAllowed.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ collectionAllowed }`
        });
    }

    switch (collection) {
        case 'users':
            searchUsers(termino, res);
            break;
        case 'categories':
            searchCategories(termino, res);
            break;

        case 'products':
            searchProducts(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer la busqueda'
            });
    }
}

export default search;
