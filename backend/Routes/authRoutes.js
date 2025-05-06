import express from "express";
import {authController} from "../Controllers/authController.js";
import {signupController} from "../Controllers/signupController.js"
// const app=express();
const router=express.Router();
router.post("/login",authController);
router.post("/signup",signupController);
export default router;