import Login from "../Models/Login.js";
export const authController=async(req,res)=>{
    

    const {username,password}=req.body;
    
    const user=await Login.findOne({username,password});
    console.log("Received:", username, password);
console.log("Found in DB:", user);
    if(user)
    {
        return res.send("login successfull");
    }
    else{
        return res.send("invalid credentials");
    }
};
// default authController;