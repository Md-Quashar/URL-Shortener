import "./Login.css";
import React from "react";
import { useContext } from "react";
import { UrlContext } from "../../UrlContext/UrlContext.jsx";
import { useForm } from "react-hook-form";
import { NavLink,redirect,useNavigate } from "react-router-dom";
import axios from 'axios';
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const {setUrls} = useContext(UrlContext);

  const onSubmit = async(data) =>{
    try {
        console.log(data); 
        const URL= import.meta.env.VITE_LOCAL_API + 'user/login'
        const response = await axios.post(URL, data);  
       // console.log('User Login successfully:', response.data);
        const token = response.data.Token;
        const urlsData = response.data.shortUrls ;
        setUrls(urlsData);
      
        
        // console.log('Token:', token);
        // console.log('All shortUrls',response.data.shortUrls); 
        // console.log("User ID:",urlsData[0].user);
        localStorage.setItem('userId', urlsData[0].user);
        localStorage.setItem('authToken', token);  
        //localStorage.setItem('myContextState', JSON.stringify(urlsData));
        navigate('/home');
    } 
    catch (error) {
        console.error('Error Login user:', error);  
        alert('Login failed. Please check your credentials.');      
       }
  }
  

  return (
    <>
     
      <div className="Login-in-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          
          <input type="text" placeholder="Email" {...register("email", {required: true})} />
          <input type="password" placeholder="Password" {...register("password", {required: true})} />

          <input type="submit" />
            <div className="isSign">Don't have an account? <NavLink to="/signup">Sign Up</NavLink></div>
            <div className="forgetPass">Forgot password? <NavLink to="/pass-reset">Reset</NavLink></div>
        </form>
      </div>
    </>
  );
}
