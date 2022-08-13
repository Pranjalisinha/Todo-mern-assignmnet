import React from "react";
import { useState,useEffect } from "react";
import axios  from "axios";
import "./register.css"
import { useNavigate } from "react-router-dom";

const RegisterPage = () =>{
    const Navigate=useNavigate()
    const [data,setdata]=useState({})

    const handleRegister =(e)=>{
        e.preventDefault()
      axios.post("https://todo-server-a.herokuapp.com/user/register",data)
          .then(()=>{Navigate("/Login")})
        .catch((err)=>{
            console.log(err)
        })
        
    }

    const handleFormData=(e,id)=>{
        setdata({...data,[id]:e.target.value})
        }

    const checkInputs=()=>{
        let c=0
        for(let key in data){
        let value=data[key]
    if(value.length){
      c++
    }
        }
        return c
      }

    return(
        <>
      <div className="register">
      <div className="img1">
           <img src="registerLogo.jpg" alt ="logo" width={50} height={50} id="logo1"/>
            </div>
        <div id="register_child">
            <h1 id="h1">Register</h1>
            <form className="form">
                <input type="text" placeholder="User Name" required className="inputfield" onChange={(e)=>handleFormData(e,"username")}/>
                <input type="text" placeholder="Email" required className="inputfield" onChange={(e)=>handleFormData(e,"email")}/>
                <input type="password" placeholder="Password" required className="inputfield" onChange={(e)=>handleFormData(e,"password")}/>
                <input type="password" placeholder="Conform Password" required className="inputfield" onChange={(e)=>handleFormData(e,"conform_password")}/>
            </form>
            <button className="registerbtn" onClick={checkInputs()!==4?null:(e)=>handleRegister(e)}>Register</button>
            <a href="/Login"><p>Member Login</p></a>
        </div>

      </div>
        </>
    )
}
export default RegisterPage