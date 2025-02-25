import {Schema, model, Document} from 'mongoose';

interface IUser extends Document{
    username: string ;
    email: string ;
    password: string ;
    phone: string ;
    role: 'CI' | 'MI' | 'Admin';
}


const UserSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    role: {type: String, required: true, enum: ['CI', 'MI', 'Admin'] }

});
const User = model<IUser>('User', UserSchema);

export default User;