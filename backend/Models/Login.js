import mongoose from "mongoose";
const loginSchema=new mongoose.Schema({
    username: String,
    password: String
});
export default mongoose.model("Login",loginSchema,"login");