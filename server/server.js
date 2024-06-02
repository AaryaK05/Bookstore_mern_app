import express, { response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import User from './model.js';
import {Book} from './model.js';
import passwordHash from 'password-hash';
import path from 'path';
import { fileURLToPath } from 'url';



const url=`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.25ehbzy.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=${process.env.MONGODB_CLUSTER}`;
const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
app.use(express.static(__dirname+'/public'));
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

app.get("/user_info",async(req,res)=>{
    const username=req.query.username;
    await User.findOne({username:username}).then(data=>{
        res.send({
            email:data.email
        }).status(200);
    })
})

app.post('/find_user',async(req,res)=>{
    const user=req.body.username;
    const pass=req.body.password;
    await User.findOne({username:user}).then(data=>{
        if(data){
            if(passwordHash.verify(pass,data.password)){
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
    const pass=passwordHash.generate(req.body.password);
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

app.get("/getBooks", async(req,res)=>{
    var books=await Book.find();
    res.json(books);
});

app.post('/addorder',(req,res)=>{

});

app.listen(port,(req,res)=>{
    console.log(`Server listening on ${port}`);
})
