import { Response, Request } from 'express';
import { Category } from '../models';

export const getCategories = async(req: Request, res: Response) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = { status: true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(desde))
            .limit(Number(limite))
        
    ]);

    res.json({
        total,
        categories
    });
}

export const getCategory = async (req: Request, res: Response) => {

    const { id } = req.params;

    const category = await Category.findById(id).populate('user', 'name');

    res.json(category);
}

export const createCategory = async(req: Request, res: Response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            msg: `Category ${ categoryDB.name } already exists`
        });
    }

    // Generar data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    // Guardar en DB
    await category.save();
    res.status(201).json(category);

}

export const updateCategory = async(req: Request, res: Response) => {

    const { id } = req.params;

    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.json(category);
}

export const deleteCategory = async(req: Request, res: Response) => {

    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json(category);
}

