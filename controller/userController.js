import User from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 export const signup =async (req,res)=>{
    try {
        const  userData=new User(req.body);
        const {email}=userData;
        const existUser=await User.findOne({email});
        if(existUser){
           return res.status(400).json({message:"User already exist"});
        }
        const savedUser=await userData.save();
        res.status(200).json(savedUser);
    }
    catch(error){
        res.status(500).json(error.message);
    }
 }

 
 export const Login= async (req, res)=>{

    try{
     const {email,password}=req.body;
     const userExist=await User.findOne({email});
 
     if(!userExist){
         return res.status(401).json({message: "User not exist"});
     }
     const checkPass= await bcrypt.compare(password,userExist.password);
     if(!checkPass){
         return res.status(401).json({message: "User and password is invalid"});
     }
     const tokenExist=req.cookies.token;
     if(tokenExist){
        return res.status(200).json({message:"Already Login"});
     }
     const token=jwt.sign({userID: userExist._id},process.env.SECRET_KEY,{expiresIn:'1h'});
     res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
     res.status(200).json({message:"Login successfully..!"});
    }
    catch(error){
     res.status(500).json({error:error});
    }
  }

  export const Logout= async (req,res)=>{
    try{
        const userExist=req.cookies.token;
        if(!userExist){
            return res.status(200).json({message: "Login required"});
        }

        res.clearCookie("token");
        res.status(200).json({message:"Logout successfully"});
    }
    catch(error){
        res.status(500).json({error:error})
    }
  }
 
