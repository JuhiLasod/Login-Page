import React from "react";
import { useState } from "react";
function Signup(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');
    const handleNewAcc=async(e) =>{
        e.preventDefault()
        const res=await fetch("http://localhost:8000/api/auth/signup",{
            method: "POST",
            headers : {'Content-Type' :'application/JSON'},
            body: JSON.stringify({username,password})
        });
        const text=await res.text();
        setMessage(text);
    };
    return (
        <div>
            <div>enter username</div>
            <div>
                <input type="text"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />
            </div>
            <div>enter password</div>
            <div>
                <input type="text"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleNewAcc}>create my account</button>
            <div>{message}</div>
        </div>
    );
}
export default Signup;