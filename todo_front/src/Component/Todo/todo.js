import React, { useState } from "react";
import "./todo.css"
import Sidebar from "./sidebar";

const TodoTable = () =>{

    const Authtoken=localStorage.getItem("authorization");
    const userName = localStorage.getItem("username");
    const [start, setStart] = useState(true)
    const [end , setEnd] = useState(false)
    const NewActivityadd =()=>{

    }
    console.log(start);
    console.log(end);
    const starHandle = (e) =>{
        e.preventDefault();1-
        setStart(false);
    }
    console.log(start);
    if(!start){
        setEnd(true)
    }
    
    return(
        <>
        <div className="container">
            <h3 className="head">{userName}</h3>
            <div className="section">
                <button className="addAbtn" onClick={()=>NewActivityadd()}>Add Activity</button>
            <div style={{display: "flex", width: "1100px"}}>
                <table className="totable" border="2px solid black">
                    <tr>
                        <th style={{width: "250px", background:"blue"}}>Activity</th>
                    
                        <th style={{width: "250px", background:"blue"}}>Status</th>
                    
                        <th style={{width: "250px", background:"blue"}}>Time Taken <br/>h:min:sec</th>

                        <th style={{width: "250px", background:"blue"}}>Action</th>
                    </tr>
                    <tr>
                        <td style={{height: "50px"}}>Cooking</td>
                        <td> </td>
                        <td> </td>
                        <td>{start ? <button className="startbtn" onClick={()=>{starHandle(e)}}>Start</button> : <button className="startbtn2">End <div style={{color: "orange"}}>pause</div></button> }</td>
                    </tr>
                    <tr>
                        <td style={{height: "50px"}}>Drinking</td>
                        <td> </td>
                        <td> </td>
                        <td><button className="startbtn" onClick={()=>{starHandle()}}>Start</button></td>
                    </tr>
                    <tr>
                        <td style={{height: "50px"}}>Sleeping</td>
                        <td> </td>
                        <td> </td>
                        <td><button className="startbtn" onClick={()=>{starHandle()}}>Start</button></td>
                    </tr>
                    <tr>
                        <td style={{height: "50px"}}>Running</td>
                        <td> </td>
                        <td> </td>
                        <td><button className="startbtn" onClick={()=>{starHandle()}}>Start</button></td>
                    </tr>
                    <tr>
                        <td style={{height: "50px"}}>Eating</td>
                        <td> </td>
                        <td> </td>
                        <td><button className="startbtn" onClick={()=>{starHandle()}}>Start</button></td>
                    </tr>
                    <tr>
                        <td style={{height: "50px"}}>Washing</td>
                        <td> </td>
                        <td> </td>
                        <td><button className="startbtn" onClick={()=>{starHandle()}}>Start</button></td>
                    </tr>
                </table>
            </div>
            </div>
        </div>
        <Sidebar/>
        </>
    )
}
export default TodoTable