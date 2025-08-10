import "./PassReset.css";
import React, { useContext } from "react";
import { UrlContext } from "../../UrlContext/UrlContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PassReset() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const {setUrls} = useContext(UrlContext);
  const onSubmit = async(data) => {
    try {
      const URL= import.meta.env.VITE_LOCAL_API + 'user/reset-password'
        //console.log(data);
        //console.log(URL);
        const response = await axios.post(URL, data);  
        const token = response.data.Token;
        const urlsData = response.data.shortUrls ;
        setUrls(urlsData);

        // console.log('Reset Password successfully:', response.data);
        // console.log('Token:', token);
        // console.log('All shortUrls',response.data.shortUrls);
        localStorage.setItem('userId', urlsData[0].user);
        localStorage.setItem('authToken', token); // Store the token in localStorage   
        alert("Password reset successfully.");
        navigate('/home');  
    } 
    catch (error) {
       alert('Failed to validate please check your email and new password.');
       // console.log('Error Reset-Password :', error);   
             
       }
  }
  
  
  return (
    <>
     
      <div className="Reset-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Reset Password</h2>
          
          <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
          <input type="password" placeholder="New Password" {...register("newPassword", {required: true})} />
          <input type="submit" />
           
        </form>
      </div>
    </>
  );
}
