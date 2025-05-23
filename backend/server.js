import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Routes/authRoutes.js";
import cors from "cors";
const app=express();
app.get("/", (req, res) => {
    res.send("API is working!");
});
dotenv.config();
mongoose.connect(
    process.env.MONGO_URI
).then(()=>console.log("db connected"))
.catch(()=>console.log("error while connecting"));
// app.use(cors());
// app.use(cors({
//         origin: "https://localhost:3000", // match your frontend Render URL
//         credentials: true
//       }));
app.use(cors({
    origin: "https://login-page-7.onrender.com", // match your frontend Render URL
    credentials: true
  }));
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use("/api/auth",router);
app.listen(PORT,()=>{
    console.log("server is up");
});