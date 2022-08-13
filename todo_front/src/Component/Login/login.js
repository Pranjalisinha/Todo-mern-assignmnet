import React from "react";
import "./login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";


const LoginPage = () => {
    const Navigate=useNavigate();

    const [data,setdata]=useState({
        "username":"",
        "password":""
      })

      const handlesubmit=(e)=>{
        e.preventDefault()
        axios.post("https://todo-server-a.herokuapp.com/user/login",data).then((loginData)=>{
          localStorage.setItem("authorization",loginData.data.Authtoken) 
          // console.log(localStorage.getItem("authorization"))
        
          localStorage.setItem("username", loginData.data.username)
        
        Navigate("/Todo")
        })
        .catch((err)=>{
          console.log(err)
         })
}

      const handleinput=(e,id)=>{
        setdata({...data,[id]:e.target.value})
          }

    return(
        <>
      <div className="login">
      <div className="img1">
           <img src="login.jpg" alt ="logo" width={50} height={50} id="logo1"/>
            </div>
        <div id="login_child">
            <h1 id="h1">Login</h1>
            <form className="form">
                <input type="text" placeholder="Email" required className="inputlfield" onChange={(e)=>handleinput(e,"email")}/>
                <input type="password" placeholder="Password" required className="inputlfield" onChange={(e)=>handleinput(e,"password")}/>
            </form>
            <button className="loginbtn" onClick={(e)=>handlesubmit(e)}>Login</button>
            <p className="fPass">Forgot Password?</p>
        </div>
      </div>
        </>
    )
}
export default LoginPage