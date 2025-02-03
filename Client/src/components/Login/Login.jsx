import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const fetchApi = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:3000/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.status == true) {
          localStorage.setItem("auth", true);
          Navigate("/home");
          alert("Login Successfully");
        } else alert("Incrorrect password or user not exist");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="body">
        <div className="login-container">
      <h2 className="h2">Login</h2>
      <form onSubmit={fetchApi}>
        <div className="input-group">
          <label className='label'  htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <label className='label'  htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <a href="/forgot-password" className="link" style={{color:"white"}}>
        Forgot password?
      </a>
    </div>
    </div>
  );
};

export default Login;
