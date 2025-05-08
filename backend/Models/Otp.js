import mongoose from "mongoose";
console.log("inside otp model");
const otpSchema=new mongoose.Schema(
    {
        email: {type: String},
        otp: {type: String},
        createdAt: { type: Date, default: Date.now }
    }
);
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
export default mongoose.model("Otp",otpSchema);