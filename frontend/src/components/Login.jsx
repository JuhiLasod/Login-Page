import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(){
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const[message,setMessage]=useState('');
    const handleCred=async(e)=>{
            e.preventDefault();
            const res=await fetch("http://localhost:8000/api/auth/login",{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({username,password})
            });
            const text=await res.text();
            setMessage(text);

        }
    return (
        
        <div>
            <h1>this is login page</h1>
            <div>username</div>
            <div >
                <input type="text" 
                    value={username}
                    onChange={e=>setUsername(e.target.value)}
                />
            </div>
            <div>password</div>
            <div >
                <input type="text" 
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleCred}>login</button>
            <p>{message}</p>
        </div>

    );
}
export default Login;