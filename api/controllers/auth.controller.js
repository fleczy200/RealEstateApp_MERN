import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"

export const register = async (req,res)=>{
    
    const {userName,email,password} = req.body
    try{

        // hash the password
        const hashedPassword = await bcrypt.hash(password,10)
        //Create new user
        const newUser = await prisma.user.create({
            data:{
                userName:userName,
                email:email,
                password:hashedPassword
            }
        })
        //console.log(newUser)
        res.status(201).json({"message":"Registration successful"})
    }catch(err){res.status(500).json({"message":"failed to create user"})}
}
export const login = async (req,res)=>{
    const {userName,password} = req.body
    
    try{
        //check if user exist
        const user = await prisma.user.findUnique({
            where:{userName}
        })

        if(!user){
            return res.status(401).json({"message":"Invalid username or password!"})
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({"message":"Invalid username or password!"});
        }
        //token expiration date
        const age = 1000 * 60 * 60 * 24 * 7

        //generate jwt token
        const token = jwt.sign({
            id:user.id,
            isAdmin:false
        },process.env.JWT_SECRET_KEY,{expiresIn:age})

        const {password:userPassword,...userInfo} = user

        //console.log(userInfo)

        res.cookie("token",token,{
            httpOnly:true,
            //secure:true,
            maxAge: age
        })
        .status(200)
        .json(userInfo)
        //console.log("successful")

    }catch(err){
        res.status(401).json({"message":"login failed"})
    }
}
export const logout = (req,res)=>{
    res.clearCookie("token").status(200).json({"message":"Logout successful"})
}