import { Schema, model } from 'mongoose';

interface IRole {
    role: String;
}

const RoleSchema = new Schema<IRole>({
    role: {
        type: String,
        required: [true, 'The role is required']
    }
});

const role = model('Role', RoleSchema);

export default role;