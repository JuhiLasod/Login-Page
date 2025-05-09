import nodemailer from "nodemailer";
import Otp from '../Models/Otp.js';
import Login from "../Models/Login.js";
export const sendOtpController=async(req,res)=>{
    const {email}=req.body;
    console.log("rec email is ",email);
    try{
        const user=await Login.findOne({username: email});
        console.log("user  email is ",email);
        if(!user)
        {
            console.log("inside if");
            res.send("user not exists");
            return;
        }
    }catch(err){

    }
     
    const otp=Math.floor(100000+ Math.random()*900000);
    console.log("generated otp at backend is ",otp);
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"juhilasod29@gmail.com",
            pass:"hich gkon vpyf rtdi"
        }
    });
    const mailOptions={
        from:"juhilasod29@gmail.com",
        to:email,
        text:`${otp}`
    };
    console.log("mailoptions");
    console.log(mailOptions);
    try{
        await transporter.sendMail(mailOptions);
        const newEntry=await Otp.findOne({email});
        if(newEntry)
        {
            newEntry.otp=otp;
            await newEntry.save();
        }
        else
        {
            const Entry=new Otp({email,otp});
            await Entry.save();
        }
        res.send("otp succ sent");
    }catch(err){
        res.send("could not send otp");
    }

};