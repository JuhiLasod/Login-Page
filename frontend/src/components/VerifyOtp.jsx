import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function VerifyOtp(){
    const [email,setEmail]=useState('');
    const [message,setMessage]=useState('');
    const [optSent,setOtpSent]=useState(false);
    const [btnname,setBtnname]=useState("send otp");
    const [otp,setOtp]=useState('');
    const handleEmail=(e)=>{
        e.preventDefault();
        setEmail(e.target.value);
        // console.log(email);
    }
    const handleSendOtp=async()=>{
        console.log("sending...");
        console.log(email);
        const res= await fetch("http://localhost:8000/api/auth/sendotp",{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email})
        });
        const text=await res.text();
        if(text==="otp succ sent")
        {
            setOtpSent(true);
            setBtnname("resend otp");
        }
        setMessage(text);
        console.log(text);
    };
    const otpTyped=async(e)=>{
        e.preventDefault();
        setOtp(e.target.value);
    };
    const handleVerify=async(e)=>{
        const res=await fetch("http://localhost:8000/api/auth/verifyotp",
            {
                'method': 'POST',
                'headers': {'Content-Type': 'application/json'},
                'body': JSON.stringify({email,otp})
            }
        );
        const verresult=await res.text();
        console.log(verresult);
    };
    // const handleBtnname=()=>{
    //     setBtnname("resend ...");
    // };
    return(
        <div>
            <label>enter email</label>
            <div>
                <input
                    type="email"
                    value={email}
                    placeholder="email"
                    onChange={handleEmail}
                />
            </div>
            <button onClick={handleSendOtp}>{btnname}</button>
            <div>{message}</div>
            {/* <div> {(optSent) && (handleBtnname)</div> */}
              <div> {(optSent) && <div><div>otp will expire after 5 min</div><input type="text" value={otp} onChange={otpTyped} /><button onClick={handleVerify}>verify</button></div>}</div> 
            
        </div>
    );
}
export default VerifyOtp;