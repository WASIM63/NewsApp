import './ForgotPassword.css';
import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword=()=>{

    const Navigate=useNavigate();
    const [otp,setOtp]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();

    const getOtp=()=>{
        if(email=="")alert('Enter email first')
        else{
            axios.post('https://newsapp-3j65.onrender.com/get-otp',{email})
            .then(result=>{
                // console.log(result);
                (result.data.status==true)?alert('OTP has been sent, check your mail'):alert('User not exist, create account1');
            })
            .catch(err=>console.log(err))
        }
    }
    
    const fetchApi=(e)=>{
        e.preventDefault();
        // console.log({email,otp,password});
        axios.post(`https://newsapp-3j65.onrender.com/forgot-password`,{email,otp,password})
        .then(result=>{
            // console.log("result :",result);
            if(result.data.status==true){
                Navigate('/login');
                alert("Password changed. Now login");
            }else alert(result.data.msg);
        })
        .catch(err=>console.log(err))
    }

    return(
        <div className='body'>
        <div className="login-container ">
        <h2 className='h2'>Forgot Password</h2>
        <form onSubmit={fetchApi}>
            <div className="input-group">
                <label className='label'  htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder='Enter email id' required onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
            </div>
            <button type="button" className="btn btn-primary getOtp" onClick={()=>getOtp()}>Get OTP</button>
            <div className="input-group">
                <label className='label'  htmlFor="otp">OTP</label>
                <input type='text' id="otp" name="otp" placeholder='Enter OTP' required onChange={(e)=>{
                    setOtp(e.target.value)
                }}/>
            </div>
            <div className="input-group">
                <label className='label'  htmlFor="password">New Password</label>
                <input type="password" id="password" name="password" placeholder='Enter new password' required onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
            </div>
            <button type="submit" className="btn">Forgot Password</button>
        </form>
        <a href="/login" className="link">Already have an account? Sign in</a>
    </div>
        </div>
    )
}

export default ForgotPassword;