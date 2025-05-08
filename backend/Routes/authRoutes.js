import express from "express";
import {authController} from "../Controllers/authController.js";
import {signupController} from "../Controllers/signupController.js"
import {sendOtpController} from "../Controllers/sendOtpController.js"
import {verifyOtpController} from "../Controllers/verifyOtpController.js"
// const app=express();
const router=express.Router();
router.post("/login",authController);
router.post("/signup",signupController);
router.post("/sendotp",sendOtpController);
router.post("/verifyotp",verifyOtpController);
export default router;