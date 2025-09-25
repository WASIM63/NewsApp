require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const bcrypt=require('bcrypt');
const saltRounds = 10;
const port=process.env.PORT || 3000;
const path=require('path');

console.log(process.env.MONGODB);

const mongooseModel=require('./src/mongoose.js');
mongoose
	.connect(process.env.MONGODB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => console.log("MongoDb connected successfully"))
	.catch((err) => console.log(err));

// OTP genarator and mail sender
const sendMailFun=require('./src/otpGenarator.js');

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(cors())

const _dirname=path.resolve();   //🟠🟠🟠🟠 to get the path of the server.js


// HTTP methods
app.post("/signup",async(req,res)=>{
    try {
        const { name, email, password } = req.body;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash = bcrypt.hashSync(password, salt);
		await mongooseModel
			.create({ name: name, email: email, password: hash })
			.then((result) => {
				// console.log(result)
				res.status(201).json({ status: true, msg: "Account created" });
			})
			.catch((err) =>
				res.status(401).json({ status: false, msg: "Something went wrong" })
			);
    } catch (error) {
        res.status(401).json(error);
    }
})

app.post("/login",(req,res)=>{
    try {
        const { name, email, password } = req.body;
		mongooseModel
			.findOne({ email: email })
			.then((user) => {
				bcrypt.compareSync(password, user.password)
					? res.status(201).json({ status: true, msg: "Login successfully" })
					: res.status(401).json({
							status: false,
							msg: "Invalid user or incorrect password",
					  });
			})
			.catch((err) => res.json(err));
    } catch (error) {
        res.status(401).json(error);
    }
})

let serverOtp=null;
app.post('/get-otp',(req,res)=>{
    try {
        setTimeout(() => {
			serverOtp = null;
		}, 600000);
		const { email } = req.body;
		console.log(email);
		mongooseModel
			.findOne({ email: email })
			.then((user) => {
				if (user) {
					sendMailFun(email).then((result) => {
						// console.log(result, typeof(result));
						serverOtp = result;
						res.status(201).json({
							status: true,
							msg: "OTP has been sent to your mail",
						});
					});
				} else {
					res.status(401).json({ status: false, msg: "User not exits" });
				}
			})
			.catch((err) => console.log(err));
    } catch (error) {
        res.status(401).json(error);
    }
})


app.post('/forgot-password',(req,res)=>{
    try {
        const { email, otp, password } = req.body;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash = bcrypt.hashSync(password, salt);
		if (serverOtp == otp) {
			mongooseModel
				.updateOne({ email: email }, { $set: { password: hash } })
				.then((result) => {
					// console.log(result);
					res.status(201).json({
						status: true,
						msg: "Password has been updated",
					});
				})
				.catch((err) => console.log(err));
		} else {
			res.status(401).json({ status: false, msg: "Invalid OTP" });
		}
    } catch (error) {
        res.status(401).json(error);
    }
})

// serving the frontent from backend
app.use(express.static(path.join(_dirname,"/Client")));  //🟠🟠🟠🟠
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,'Client','index.html'));   //🟠🟠🟠
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})