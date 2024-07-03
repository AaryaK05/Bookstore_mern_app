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
    Genre:{
        type:Array,
        require:true
    },
    Price:{
        type:Number,
        require:true
    },
    Url:String
})
export const Book=model('Book',BookSchema);

const OrderSchema=new Schema({
    id:Number,
    Username:{
        type:String,
        require:true
    },
    Orders:[
            {
                id:Number,
                Items:[
                    {
                        Name:{
                            type:String,
                            require:true
                        },
                        Price:{
                            type:Number,
                            require:true
                        },
                        amount:{
                            type:Number,
                            require:true
                        },
                        Url:String
                    }
                ],
                Time:{
                    type:Date,
                    default:Date.now()
                },
                Payment:{
                    type:Boolean,
                    default:false
                },
                OrderProcessed:{
                    type:String,
                    default:'Not Completed'
                }
            }
    ],
})

export const Order=model('Order',OrderSchema);

const cartSchema=new Schema({
    id:Number,
    Username:{
        type:String,
        require:true
    },
    Cart:{
        type:Array,
        require:true
    }
})

export const Cart=model('Cart',cartSchema);


export default User;