import React, { useContext,useEffect } from 'react'
import { UrlContext } from '../../UrlContext/UrlContext.jsx'
import Header from '../Header/Header.jsx'
import Body from '../body/body.jsx'
import Urls from '../Urls/Urls.jsx'
import axios from 'axios'


function Home() {
const {urls,setUrls,} = useContext(UrlContext);
useEffect(() => {
    if(!urls || urls.length === 0) {
      
       const getUpdate= async()=>{

              const id= localStorage.getItem('userId') 
              const URL= import.meta.env.VITE_LOCAL_API + "user/" +id;
              const response= await axios.get(URL);
              // console.log("User ID:",id);
              // console.log("Fetching URLs from:", URL);
              // console.log("Response from Home:",response.data.shortUrls);
              if(response.data.shortUrls )
                    setUrls(response.data.shortUrls);
       };
       getUpdate();
      
    }
  

},[])

  return (
    <>
        <Header/>
        <Body/>
        <Urls data={urls}/>

    </>

  )
}

export default Home