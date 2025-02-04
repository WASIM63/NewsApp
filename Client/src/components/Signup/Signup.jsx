import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const Navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const fetchApi = (e) => {
    e.preventDefault();
    axios
      .post(`https://newsapp-3j65.onrender.com/signup`, { name, email, password })
      .then((result) => {
        // console.log(result);
        if (result.data.status == true) {
          Navigate("/login");
          alert("Account created. Now login");
        } else alert("Something went wrong");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="body">
      <div className="signup-container">
        <h2 className="h2">Sign Up</h2>
        <form onSubmit={fetchApi}>
          <div className="input-group">
            <label className='label'  htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required onChange={(e) => {
                setName(e.target.value);
            }}/>
          </div>
          <div className="input-group">
            <label className='label'  htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required onChange={(e) => {
                setEmail(e.target.value);
            }}/>
          </div>
          <div className="input-group">
            <label className='label'  htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter password" required onChange={(e) => {
                setPassword(e.target.value);
            }}/>
          </div>
          <button type="submit" className="btn">Sign Up</button>
        </form>
        <a href="/login" className="link">Already have an account? Sign in</a>
      </div>
    </div>
  );
};

export default SignUp;
