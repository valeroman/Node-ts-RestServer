import { Schema, model } from 'mongoose';

interface ICategory {
    name: String;
    status: Boolean;
    
}

const CategorySchema = new Schema<ICategory>({
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
    }
});

CategorySchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject();
    return data;
} 

const category = model('Category', CategorySchema);

export default category;