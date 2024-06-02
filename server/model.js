import mongoose, { model,modelNames,Schema, trusted } from 'mongoose';

const UserSchema= new Schema({
    id:Number,
    username:String,
    password:String,
    email:String
});
const User=model('User',UserSchema);

const BookSchema=new Schema({
    id:Number,
    Name:{
        type:String,
        require:true
    },
    Price:{
        type:String,
        require:true
    },
    Url:String
})
export const Book=model('Book',BookSchema);

export default User;