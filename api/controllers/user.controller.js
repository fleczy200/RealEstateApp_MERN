import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"

export const getUsers = async (req,res)=>{
    try{
    const users = await prisma.user.findMany()

    res.status(200).json({message:users})
   }catch(err){
        res.status(500).json({message:"Failed to get users!"})
    }
}
export const getUser = async (req,res)=>{
    try{
    const id = req.params.id
    console.log(id)
    
    const user = await prisma.user.findUnique({
        where:{id}
    })

    res.status(200).json({message:user})

    }catch(err){
        res.status(500).json({message:"Failed to get user!"})
    }
}
export const updateUser = async (req,res)=>{
    try{
        const id = req.params.id
        const tokenUserId = req.userId
        const {password,avatar,...inputs }= req.body

        if(id !== tokenUserId){
            return res.status(403).json({message:"Anauthorized access"})
        }
        let updatedPassword = null
        if(password){
            updatedPassword = await bcrypt.hash(password,10)

        }

        const updatedUser = await prisma.user.update({
            where:{id},
            data:{
                ...inputs,
                ...(updatedPassword && {password:updatedPassword}),
                ...(avatar && {avatar})
            }
        })

        const {password:userPassword,...rest} = updatedUser
       // console.log(rest)

        res.status(200).json(rest)
    }catch(err){
        res.status(500).json({message:"Failed to update user!"})
    }
}
export const deleteUser = async (req,res)=>{
    try{
        const id = req.params.id
        const tokenUserId = req.userId

        if(id !== tokenUserId){
            return res.status(403).json({message:"Unauthorized access"})
        }
        
        const deletedUser = await prisma.user.delete({
            where:{id}
        })

        res.status(200).json({message:"User deleted"})
    }catch(err){
        res.status(500).json({message:"Failed to delete user!"})
    }
}