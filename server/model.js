import mongoose, { model,modelNames,Schema } from 'mongoose';

const UserSchema= new Schema({
    id:Number,
    username:String,
    password:String,
    email:String
});


const User=model('User',UserSchema);

export default User;