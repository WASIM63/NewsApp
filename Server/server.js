require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const bcrypt=require('bcrypt');
const saltRounds = 10;
const port=process.env.PORT || 3000;
const path=require('path');

const mongooseModel=require('./src/mongoose.js');
mongoose.connect(process.env.MONGODB)
.then(result=>console.log("MongoDb connected successfully"))
.catch(err=>console.log(err));

// OTP genarator and mail sender
const sendMailFun=require('./src/otpGenarator.js');

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));

const corsOption={          //🟠🟠🟠🟠🟠
    origin:"http://localhost:5173/",
    credentials:true
}
app.use(cors())

const _dirname=path.resolve();   //🟠🟠🟠🟠 to get the path of the server.js


// HTTP methods
app.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    const salt=bcrypt.genSaltSync(saltRounds);
    const hash=bcrypt.hashSync(password,salt);
    await mongooseModel.create({name:name,email:email,password:hash})
    .then(result=>{
        // console.log(result)
        res.json({status:true,msg:"Account created"})
    })
    .catch(err=>res.json({status:false,msg:"Something went wrong"}));
})

app.post("/login",(req,res)=>{
    const {name,email,password}=req.body;
    mongooseModel.findOne({email:email})
    .then(user=>{
        (bcrypt.compareSync(password,user.password))?res.json({status:true,msg:"Login successfully"}):res.json({status:false,msg:"Invalid user or incorrect password"})
    })
    .catch(err=>res.json(err));
})

let serverOtp=null;
app.post('/get-otp',(req,res)=>{
    setTimeout(()=>{
        serverOtp=null;
    },600000);
    const {email}=req.body;
    console.log(email);
    mongooseModel.findOne({email:email})
    .then(user=>{
        if(user){
            sendMailFun(email).then(result=>{
                // console.log(result, typeof(result));
                serverOtp=result;
                res.json({status:true,msg:"OTP has been sent to your mail"})
            })
        }
        else{res.json({status:false,msg:'User not exits'})}
    })
    .catch(err=>console.log(err));
})


app.post('/forgot-password',(req,res)=>{
    const {email,otp,password}=req.body;
    if(serverOtp==otp){
        mongooseModel.updateOne({email:email},{$set:{password:password}})
        .then(result=>{
            // console.log(result);
            res.json({status:true,msg:"Password has been updated"});
        })
        .catch(err=>console.log(err))
    }else{
        res.json({status:false,msg:"Invalid OTP"});
    }
})

// serving the frontent from backend
app.use(express.static(path.join(_dirname,"/Client/dist")));  //🟠🟠🟠🟠
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"Client","dist",'index.html'));   //🟠🟠🟠
})



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})