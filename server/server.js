import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import User from './model.js';


const url=`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.25ehbzy.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=${process.env.MONGODB_CLUSTER}`;
const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port=process.env.PORT;


/*Mongoose Connection */
mongoose.connect(url).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log('Error!',err);
});

/*Mongoose Connection */


app.get('/', (req, res) => {
    res.send({ "msg": "This has CORS enabled 🎈" })
});

app.post('/find_user',async(req,res)=>{
    const user=req.body.username;
    const pass=req.body.password;
    await User.findOne({username:user}).then(data=>{
        if(data){
            if(data.password===pass){
                res.send('User Found');
            }
            else{
                res.send('Invalid Password');
            }
        }
        else{
            res.send('Invalid Username');
        }
    }).catch((err)=>{
        res.send(`Error:${err}`);
    })
})

app.post('/add_user',async(req,res)=>{
    const user=req.body.username;
    const email=req.body.email;
    const pass=req.body.password;
    const data={
        username:user,
        email:email,
        password:pass
    }
    User.create(data).then(()=>{
        res.send('User Successfully Created!');
    }).catch((err)=>{
        res.send(`Error:${err}`);
    });
})

app.listen(port,(req,res)=>{
    console.log(`Server listening on ${port}`);
})
