import "./sign_up.css";
import React, { useContext } from "react";
import { UrlContext } from "../../UrlContext/UrlContext";
import { useForm } from "react-hook-form";
import { NavLink,useNavigate  } from "react-router-dom";
import axios from 'axios';



export default function Sign_in() {
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
        const URL= import.meta.env.VITE_LIVE_API + 'user/signup'
       // console.log("Sign-up URL:", URL);
        const response = await axios.post(URL, data);  
        const token = response.data.Token;
        
        // const urlsData = response.data.shortUrls ;
        // setUrls(urlsData);
        // console.log('User registered successfully:', response.data);
        // console.log('Token:', token);
        // console.log('All shortUrls',response.data.shortUrls);
     
        localStorage.setItem('authToken', token); // Store the token in localStorage 
        navigate('/home'); 
       
    } catch (error) {
        console.error('Error registering user:', error);        

  }

 }
 

  return (
    <>
      <div className="sign-in-container">
    <form onSubmit={handleSubmit(onSubmit)}>
         <h2>Sign Up</h2>
      <input type="text" placeholder="Name" {...register("name", {required: true})} />
      <input type="text" placeholder="Email" {...register("email", {required: true})} />
      <input type="password" placeholder="Password" {...register("password", {required: true})} />

      <input type="submit" />
      <div className="isLogin">Already have an account? <NavLink to="/Login">Login</NavLink></div>
     
    </form>
      </div>
    </>
  );
}
