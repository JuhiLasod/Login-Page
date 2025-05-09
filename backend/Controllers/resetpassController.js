import Login from "../Models/Login.js";
export const resetpassController=async(req,res)=>{
    const {email,newpass}=req.body;
    const user=await Login.findOne({username: email});
    if(user)
    {
        console.log("user found");
    }
    else
    {
        console.log("user not found");
    }
    try{
    user.password=newpass;
    user.save();
    res.send("succ reset pass");
    }
    catch(err){
        res.send("unsucc reset pass");
    }
    // res.send("okay");
};