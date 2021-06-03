import { User, Role, Category, Product } from '../models';



export const isValidRole = async(role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`The role ${ role }, is not registered in the DB`);
    }
}

export const isValidEmail = async(email = '') => {

    const existeEmail = await User.findOne({ email });
    if (existeEmail) {
        throw new Error(`The email: ${ email }, is already registered`)
    }
}

export const isValidUserById = async(id: string) => {

    const existeUser = await User.findById(id);
    if (!existeUser) {
        throw new Error(`The ID: ${ id }, not exist`)
    }
}

export const isValidCategoryById = async(id: string) => {

    const existCategory = await Category.findById(id);
    if (!existCategory) {
        throw new Error(`The ID: ${ id }, not exist`)
    }
}

export const isValidProductById = async(id: string) => {

    const existProduct = await Product.findById(id);
    if (!existProduct) {
        throw new Error(`The ID: ${ id }, not exist`)
    }
}