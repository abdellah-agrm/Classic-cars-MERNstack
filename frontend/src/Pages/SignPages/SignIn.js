import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/additions-styles.css";

import Notif from "../Toast";

function SignIn(){

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        username,
        email,
        password,
        role: 'user', 
      };

      const res = await axios.post('http://localhost:4000/user/login', newUser);

      // Storage token and data :
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      localStorage.setItem('userName', res.data.user.username);
      localStorage.setItem('email', res.data.user.email);
      localStorage.setItem('photo', res.data.user.photo);
      const NotName = res.data.user.username;
      
      // Checking if user or admin :
      const userRole = res.data.user.role;
      const blocked = res.data.user.block;
      if(userRole === "admin"){
        Notif.success(`Welcome back, Admin! You have successfully signed in`);
        setTimeout(()=>{navigate("/dashboard")}, 2000);
      }else if(blocked === true){
        Notif.error('Your account has been blocked, if you believe this is an error or have any questions, please contact our support!');
      }else{
        Notif.success(`Welcome back, ${NotName}! You have successfully signed in`);
        setTimeout(()=>{navigate("/home")}, 2000);
      }
      
    } catch (err) {
      Notif.error('Invalid informations. Please check your username and password')
      console.error('Registration error:', err.response.data);
    }
  };

  return(
    <section className="ftco-section bg-spyellow" style={{padding: "10vh 0"}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10">
            <div className="wrap d-md-flex">

              <div className="left-img-signin img"></div>
              <div className="login-wrap p-4 p-md-5">
                <div className="d-flex">
                  <div className="w-100">
                    <h3 className="text-chiaroscura text-spyellow mb-4">Sign In</h3>
                  </div>
                  <div className="w-100">
                    <p className="d-flex justify-content-end">
                      <a href="https://www.google.com" className="icon d-flex align-items-center justify-content-center rounded-pill m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FDBF50" className="bi bi-google" viewBox="0 0 16 16">
                          <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                        </svg>
                      </a>
                      <a href="https://twitter.com" className="icon d-flex align-items-center justify-content-center rounded-pill m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FDBF50" className="bi bi-twitter-x" viewBox="0 0 16 16">
                          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                        </svg>
                      </a>
                    </p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="signin-form">
                  <div className="form-group mb-3">
                    <label className="label text-spdark" htmlFor="name">Username</label>
                    <input type="text" className="form-control" placeholder="Username" name="username" value={username} onChange={handleChange} required/>
                  </div>
                  <div className="form-group mb-3">
                    <label className="label text-spdark" htmlFor="password">Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={handleChange} required/>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="custom-control custom-checkbox">
                      <input className="custom-control-input" type="checkbox" id="flexCheckDefault" />
                      <label className="custom-control-label" htmlFor="flexCheckDefault">
                        <p className="text-decoration-none text-spdark px-1">Forgot Password</p>
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign In</button>
                  </div>
                </form>
                <p className="text-center">Not a member? <a className="text-decoration-none text-spyellow" href="/sign-up">Sign Up</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;