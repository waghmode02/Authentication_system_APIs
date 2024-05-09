import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(email){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            },
            message:"Email fromt is invalid"
        },
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:function( password){
                return  password.length >=8;
            },
            message:" password length atleast 8 characters"
        },
    },
    confirmPassword:{
        type:String,
        required:true,
        validate:{
            validator:function(confirmPassword){
                return confirmPassword==this.password;
            },
            message:"password not matched"
        },
    },
},{timestamps:true});

userSchema.pre("save", async function(next){
    const user=this;
    if(!user.isModified("password")) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        const hashPass=await bcrypt.hash(user.password,salt);
        user.password=hashPass;
    }catch(error){
        console.log(console);
    }
})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
         this.confirmPassword=undefined;
    }
    next();
})

const User=mongoose.model("User",userSchema);

export default User;