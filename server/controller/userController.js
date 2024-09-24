const express = require("express");
const User = require("../model/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();


const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };

const securePassword = async (password) => {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      console.log(error);
    }
  };

const signUp = async(req,res)=>{
    try{
        const {name,password,email} = req.body;
        // const image = req.file ? req.file.path : null;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const isEmailExists = await User.findOne({email})
        if(isEmailExists){
            res.status(409).json({ message: "User already exists" });
        }else{
            const passwordhash =await securePassword(password)
            const user = await User.create({
                name:name,
                profileImage: image,
                password:passwordhash,
                email:email
            })
            res.json(user) 
        }
    }catch(err){
        console.log(err);
    }
}

const login = async (req,res)=>{
    try{
        const {email,password}= req.body
        const user = await User.findOne({email})

        if(user){
            if(await bcrypt.compare(password, user.password)){
            const token = generateToken(user._id)
            res.cookie("jwt",token,{
                httpOnly:true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            })
         
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.profileImage  
            });
            console.log(user.profileImage);
            }else{
                res.status(401).json({message: "Invalid email or password"})
            }
        }else{
          return res.status(401).json({message: "Invalid email or password"})
        }
    }catch(err){
        console.log(err);
    }
}

const updateUser = async(req,res)=>{
    try{
        const {id,email,name} = req.body
         const image = req.file ? `/uploads/${req.file.filename}` : null;
        // console.log(image);
        
        let updatedData = {}
        const user = await User.findOne({ _id: id });
        if(!user){
            return res.status(404).json({message: "User not found" })
        }
        if(name){
            updatedData.name = name;
        }
        if(email){
            updatedData.email = email;
        }
        // if(image){
        //     updatedData.profileImage = image;
        // }
        const updatedUser = await User.findByIdAndUpdate(id,updatedData)
        res.json({message:"Updation succes", updatedUser})
    }catch(err){
        console.log(err); 
    }
}

module.exports = { signUp,login,updateUser }; 