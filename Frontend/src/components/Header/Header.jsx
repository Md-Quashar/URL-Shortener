import React from 'react'
import { NavLink } from 'react-router'
import './Header.css'
import { useNavigate } from 'react-router-dom'; 
function Header() {
  const navigate = useNavigate();
  const navToLogin = () => {
      localStorage.removeItem('authToken');
      navigate('/login'); 
  }
  const token= localStorage.getItem('authToken');
  const navToSignin=()=>{
      navigate('/signin'); 
  }
  return (
    <div className="header"> 
      <h1 className='header-text'>URL Shortener</h1>
      <div className='user'>
          <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp" alt="user" className='user-icon' />
          {token ? <div className="header-links" onClick={navToLogin}>Logout</div>:<div className='signin-links' onClick={navToSignin}>Sign In</div> }
          
      </div>
      
      
    </div>
    
  )
}

export default Header