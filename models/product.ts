import { Schema, model } from 'mongoose';

interface IProduct {
    name: String;
    status: Boolean;
    price: Number;
    oldPrice: Number;
    description: String;
    available: Boolean;
    options: String;
    avgRating: Number;
    ratings: Number;
}

const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    oldPrice: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    descripcion: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    options: {
        type: [String]
    },
    avgRating: {
        type: Number,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    }
});

ProductSchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject();
    return data;
}

const product = model('Product', ProductSchema)

export default product;