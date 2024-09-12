// eslint-disable-next-line no-unused-vars
import React,{useState,useEffect }  from 'react'
import {sessionV, tokenV,userID } from '../store/authuser';
import Login from './login';
import Dashboard from './dashboard/dashboard';



export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {

      sessionV.value = sessionStorage.getItem('session') == "true" ? true : false;
      userID.value = sessionStorage.getItem('id') == "true" ? true : false;
      

      if (sessionV.value == true) {
        setIsLoggedIn(true);  
      }else{
        setIsLoggedIn(false);  
      }
    }, [isLoggedIn]);  
  
    return isLoggedIn ? <Dashboard /> : <Login />;
}
