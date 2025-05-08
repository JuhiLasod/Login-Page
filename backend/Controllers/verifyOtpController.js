import Otp from "../Models/Otp.js";
import Login from "../Models/Login.js";
export const verifyOtpController=async(req,res)=>{

    const {email,otp}=req.body;
    console.log("recieved at verifyotpcontroller");
    const entry =await Otp.findOne({email,otp});
    console.log(entry);
    if(entry)
    {
        console.log("found the entry in db");
        res.send("otp verified successfully");
    }
    else{
        res.send("otp verification failed");
    }
};