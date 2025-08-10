import './Body.css';
import React, { useContext } from 'react';
import { UrlContext } from '../../UrlContext/UrlContext.jsx';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Body() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const {  setUrls} = useContext(UrlContext);
  const navigate = useNavigate();
  const onSubmit = async(data) => {
    const token = localStorage.getItem('authToken'); 
    const URL= import.meta.env.VITE_LIVE_API + 'createUrls';
    // console.log(data);
    // console.log(URL);
    // console.log(token);
    if(!token) {
      alert('Please signup to create a short URL');
      navigate('/signin');
      return;
    }
   
    const response= await axios.post(URL,data,
      {
      headers: {  
      Authorization: `Bearer ${token}`, 
    }  
  })
   
  //  console.log(response.data.shortUrls)
    const urlsData = response.data.shortUrls;
    setUrls(urlsData); 
    if(localStorage.getItem('userId')=== null) {
      localStorage.setItem('userId', urlsData[0].user);
    }
  //  localStorage.setItem('myContextState', JSON.stringify(urlsData));
  }
  console.log(errors);
  
  return (
    <div className='body'>
    <form className='urlForm' onSubmit={handleSubmit(onSubmit)}>
      <input className='input' type="text" placeholder="Enter URL" {...register("url", {required: true})} />
      <input className='btn' placeholder='Get URL' type="submit" />
      <div className='custom'>For Custom URL</div>
      <input className='input' type="text" placeholder="Enter Slug" {...register("slug", { max: 50, min: 3})} />

    </form>
    </div>
  );
}