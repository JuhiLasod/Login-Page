import Login from "../Models/Login.js";
export const signupController=async(req,res)=>{
    const {username,password}=req.body;
    console.log(username);
    try{
    const existing=await Login.findOne({username});
    if(existing)
    {
        res.send("user already exists");
    }
    const user=new Login({username,password});
    await user.save();
    res.send("sign up successfull");
    }
    catch(err){
        res.send("unsuccessfull");
    }
};