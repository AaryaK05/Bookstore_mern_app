import express, { response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import User, { Order } from './model.js';
import {Book, Cart} from './model.js';
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
let _Username;

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
    }).catch(err=>{
        console.log(err);
    })
})

app.post('/find_user',async(req,res)=>{
    const user=req.body.username;
    const pass=req.body.password;
    await User.findOne({username:user}).then(data=>{
        if(data){
            if(passwordHash.verify(pass,data.password)){
                _Username=user;
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

app.get("/getOrders",async(req,res)=>{
    const uname=_Username;
    var orders=await Order.find({Username:uname},{Orders:1});
    res.json(orders);
})

app.get("/getCart",async(req,res)=>{
    const uname={Username:_Username}
    console.log(uname);
    Cart.findOne(uname).then(response=>{
        res.json(response);
    }).catch(err=>{
        console.log(err);
    });
})


app.post("/addtocart",async(req,res)=>{
    const uname=req.body.username;
    console
    const filter={Username:uname};
    const item=req.body.item;
    Cart.findOneAndUpdate(filter,{"$push":{
        'Cart':item
    }
    },{upsert:true}).then((r)=>{
        res.send("Updated").status(200);
    }).catch(err=>{
        console.log(err);
    });
})

app.post('/addOrder',async(req,res)=>{
    const username=req.body.username;
    const cart=req.body.cart;
    console.log('Order for'+username)
    const filter={Username:username}
    Order.findOneAndUpdate(filter,{"$push":{
        'Orders':[{
            Items:cart,
        }
        ]
    }}).then(()=>{
        Cart.deleteOne({Username:username}).then(()=>{
            res.send("Created").status(200);
        }).catch(err=>{
            console.log("Coudn't Delete!"+err);
        })
    }).catch((err)=>{
        console.log(err);
        console.log("Not created");
    })
});

app.post("/removeUser",(req,res)=>{
    const username={username:req.body.username};
    User.deleteOne(username).then(()=>{
        console.log("Deleted uSER");
        res.send("Deleted").status(200);
    }
    ).catch(err=>{
        console.log(err);
    })
})

app.listen(port,(req,res)=>{
    console.log(`Server listening on ${port}`);
})
