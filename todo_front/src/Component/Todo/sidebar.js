import React, { useState, useEffect } from "react";
import "./todo.css";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Sidebar =()=>{
    const Navigate=useNavigate();
    const [taskData, setTaskData] = useState([]);
    const Authtoken=localStorage.getItem("authorization");
    const [taskhistory,setTaskhistory]=useState(false)
    const username = localStorage.getItem("Username");
    useEffect(() => {
        if(Authtoken){
            axios({
                method:'GET',
                url:'http://localhost:3001/add/todo',
                headers:{
                    authorization:Authtoken
                }
            })
                .then((datas) => {
                    setTaskhistory(true)
                    setTaskData(datas.data)})
        } else {
            Navigate("/Login")
        }
        
    }, [])
    const logoutHandler = () =>{
        localStorage.setItem("authorization", "")
        localStorage.setItem("username", "")
        Navigate("/Login");
    }
    return(
        <>
        <div className="side">
            <div id="side_child">
                <h2>Todo List</h2>
                <h3>History</h3>
                <ul type="none">
                {taskData.map((data)=>{
                        <li>{data.activity}</li>
                })}
                </ul>
                <button className="logout"onClick={()=>{logoutHandler()}}>Logout</button>
            </div>
            </div>
        </>
    )
}
export default Sidebar