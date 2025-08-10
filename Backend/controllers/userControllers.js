import userSchema from '../models/userSchema.js'
import {findAllShortUrls} from '../services/jwt.js'
import bcrypt from 'bcryptjs'
import {signToken, verifyToken } from '../services/jwt.js'
import mongoose from 'mongoose';
import shortUrl from '../models/short_url_schema.js';


export const userRegister=async (req,res)=>{
    try{
        const data=req.body
        const user= new userSchema(data)
        const response=  await user.save()
        if(!response)
            return res.status(400).json({message:"Not able to save"})
        const token=signToken({id:user._id})
        //const shortUrls =  await findAllShortUrls(user._id);
        return   res.status(201).json({message:"signup successfull", Token:token})
    }catch(err){
        console.error("Signup error:", err);
        return res.status(500).json({msg:"internal server error"})
    }
}

export const userLogin=async (req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password)
            return res.status(400).json({message:"Please enter all fields"})
        const user=await userSchema.findOne({email})
        if(!user)
            return res.status(404).json({message:"User not found"})
        
        const isMatch=await user.comparePassword(password)
        if(!isMatch)
            return res.status(400).json({message:"Invalid credentials"})
        const token=signToken({id:user._id})
        //console.log("user._id:",typeof String(user._id))
        const shortUrls =  await findAllShortUrls(user._id);
        //console.log("shortUrls:", shortUrls); 
        return res.status(200).json({message:"Login successful", Token:token, shortUrls: shortUrls})
    }catch(err){
        console.error("Login error:", err);
        return res.status(500).json({msg:"internal server error"})
    }
}


export const updatePassword=async(req,res)=>{
    try{
        const {email,newPassword}=req.body
        if(!email)
            return res.status(400).json({message:"Please enter email"}) 

        if(!newPassword)
            return res.status(400).json({message:"Please enter new password"})

        const user=await userSchema.findOne({email})
        if(!user)
            return res.status(404).json({message:"User not found"})
        user.password=newPassword
        const updatedUser=await user.save()
        if(!updatedUser)
            return res.status(400).json({message:"Not able to update password"})
        const token=signToken({id:user._id})
        const shortUrls =  await findAllShortUrls(user._id);
        return res.status(200).json({message:"Password updated successfully", Token:token, shortUrls: shortUrls})
    }catch(err){
        console.error("Error:", err);
        return res.status(500).json({msg:"internal server error"})
    }
}




export const updatedUrls = async (req, res) => {
    try {
        const id = req.params.id;
       // console.log("userId:", id);
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const user_id= new mongoose.Types.ObjectId(id);
        
        const allShortUrls = await findAllShortUrls(user_id);
        if (!allShortUrls) {
            return res.status(404).json({ message: "No short URLs found for this user" });
        }
        
        return res.status(200).json({ message: "Short URLs retrieved successfully", shortUrls: allShortUrls });
    } catch (error) {
        console.error("Error retrieving short URLs:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const deleteUrl = async (req, res) => {
    try {
        const id = req.params.id;
       // console.log("UrlId:", id);
        if (!id) {
            return res.status(400).json({ message: "Url Id is required" });
        }
        const url_id= new mongoose.Types.ObjectId(id);

        const deletedUrl = await shortUrl.findByIdAndDelete(url_id);

        const ShortUrls = await findAllShortUrls(deletedUrl.user);
        if (!deletedUrl) {  
            return res.status(404).json({ message: "Short URL not found" });
        }

        
        
        return res.status(200).json({ message: "Short URLs deleted successfully" , shortUrls: ShortUrls });
    } catch (error) {
        console.error("Error deleting short URLs:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}




export const jwtmiddleware = async(req, res, next) => {
  try {
   // const token = req.headers.authorization;
     const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const payload = verifyToken(token); 
    
    req.user_id = payload.id;

    next();
  } catch (err) {
    console.error("JWT middleware error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};