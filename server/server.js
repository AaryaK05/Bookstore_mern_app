import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import User, { Order } from './model.js';
import {Book, Cart} from './model.js';
import passwordHash from 'password-hash';
import path from 'path';
import { fileURLToPath } from 'url';
import natural from "natural";


const Analyzer=natural.SentimentAnalyzer;
const stemmer=natural.PorterStemmer;
const analyzer=new Analyzer("English",stemmer,"afinn")


function interpretSentiment(score) {
    if (score > 0.5) return "Strongly Positive";
    if (score > 0) return "Positive";
    if (score === 0) return "Neutral";
    if (score > -0.5) return "Negative";
    return "Strongly Negative";
  }

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
    // const data={
    //     Name:"Coraline",
    //     Genre:['horror','fantasy'],
    //     Price:"150",
    //     Url:"http://localhost:4010/images/coraline.jpg",
    // }

    // Book.create(data).then(()=>{
    //     res.send('Book Successfully Created!');
    // }).catch((err)=>{
    //     res.send(`Error:${err}`);
    // });
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

app.get("/findBook",async(req,res)=>{
    const Bookname=req.query.Name;
    var book=await Book.find({Name:Bookname});
    var result;
    var sum=0;
    book[0].Reviews.forEach((r,index)=>{
        var result=analyzer.getSentiment(r.Review.split(" "));
        const humanReadable =interpretSentiment(result);
        sum+=result;
    })
    const totalReviews=book[0].Reviews.length;
    const avgScore=sum/totalReviews;
    const finalScore=interpretSentiment(avgScore);
    //console.log("Returned value would be"+finalScore);
    
    res.json({book,finalScore,totalReviews});
})

app.post("/applyFilter",async(req,res)=>{
    const genre=req.body.genre;
    const sortbyname=req.body.sname;
    const sortbypriceascending=req.body.sortbypriceascending;
    const sortbypricedescending=req.body.sortbypricedescending;

    if(genre=="all"){
        if(sortbyname){
                Book.find().sort({Name:1}).then(response=>{
                    res.send(response)
                }).catch(err=>{
                    console.log(err);
                })
        }else{
            if(sortbypriceascending){
                Book.find().sort({Price:1}).then(response=>{
                    res.send(response)
                }).catch(err=>{
                    console.log(err);
                })
            }else if(sortbypricedescending){
                Book.find().sort({Price:-1}).then(response=>{
                    res.send(response)
                }).catch(err=>{
                    console.log(err);
                })
            }else{
                Book.find().then(response=>{
                    res.send(response)
                }).catch(err=>{
                    console.log(err);
                })
            }
        }
    }else{
        if(sortbyname){
                Book.find({Genre:{$in:[genre]}}).sort({Name:1}).then(response=>{
                    res.json(response).status(200);
                }).catch(err=>{
                    console.log(err);
                });
        }
        else{
            if(sortbypriceascending){
                Book.find({Genre:{$in:[genre]}}).sort({Price:1}).then(response=>{
                    res.json(response).status(200);
                }).catch(err=>{
                    console.log(err);
                });
            }else if(sortbypricedescending){
                Book.find({Genre:{$in:[genre]}}).sort({Price:-1}).then(response=>{
                    res.json(response).status(200);
                }).catch(err=>{
                    console.log(err);
                });
            }else{
                Book.find({Genre:{$in:[genre]}}).then(response=>{
                    res.json(response).status(200);
                }).catch(err=>{
                    console.log(err);
                });
            }

        }
}
})

app.get("/getOrders",async(req,res)=>{
    const uname=req.query.username;
    var orders=await Order.find({Username:uname},{Orders:1});
    res.json(orders);
})

app.get("/findinCart",(req,res)=>{
    const name=req.query.Name;
    const username=req.query.Username;
    Cart.find({Username:username}).where('Cart').elemMatch({Name:name}).then(response=>{
        if(response.length!=0){
            res.send("Found");
        }else{
            res.send("Not Found");
        }
    }).catch(err=>{
        console.log(err);
    });
    // res.send("Success").status(200);
})

app.get("/getCart",async(req,res)=>{
    const uname=req.query.username;
    Cart.findOne({Username:uname}).then(response=>{
        res.json(response);
    }).catch(err=>{
        console.log(err);
    });
})


app.post("/addtocart",async(req,res)=>{
    const uname=req.body.username;
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

app.post("/removeCartItem",(req,res)=>{
    const uname=req.body.Username;
    const item=req.body.item;
    Cart.findOneAndUpdate({Username:uname},{"$pull":{
        'Cart':item
    }
    }).then((r)=>{
        
        if(r.Cart.length==1){
            Cart.deleteOne({Username:uname}).then(()=>{
                return res.send("Updated").status(200);
            }).catch(err=>{
                console.log("Coudn't Delete!"+err);
            })
        }else{
            res.send("Updated").status(200);
        }
    }).catch(err=>{
        console.log(err);
    });
})

app.post('/addOrder',async(req,res)=>{
    const username=req.body.username;
    const cart=req.body.cart;
    const total=req.body.total;
    Order.findOneAndUpdate({Username:username},{"$push":{
        'Orders':[{
            Items:cart,
            Total:total
        }
        ]
    }}).then((response)=>{
        if(response==null){
            Order.create({
                Username:username,
                Orders:[{
                    Items:cart
                }],
                Total:total
            }).then(()=>{
                Cart.deleteOne({Username:username}).then(()=>{
                    return res.send("Created").status(200);
                }).catch(err=>{
                    console.log("Coudn't Delete!"+err);
                })
            }).catch(err=>{
                console.log(err);
            })
        }else{
            Cart.deleteOne({Username:username}).then(()=>{
                res.send("Updated").status(200);
            }).catch(err=>{
                console.log("Coudn't Delete!"+err);
            })
        }
    }).catch((err)=>{
        console.log(err);
        res.status(404);
    })
});

app.post("/addReview",(req,res)=>{
    const bname=req.body.BookName;
    const rev={
        Username:req.body.Username,
        Review:req.body.Review
    }

    Book.findOneAndUpdate({Name:bname},{$push:{
        Reviews:rev
    }},{upsert:true}).then(r=>{
        res.send("Success").status(200);
    }).catch(err=>{
        console.log(err);
        res.status(400);
    })
})

app.post("/removeUser",(req,res)=>{
    const username={username:req.body.username};
    User.deleteOne(username).then(()=>{
        res.send("Deleted").status(200);
    }
    ).catch(err=>{
        console.log(err);
    })
})

app.listen(port,(req,res)=>{
    console.log(`Server listening on ${port}`);
})
