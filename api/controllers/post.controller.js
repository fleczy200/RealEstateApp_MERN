import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"

export const addPost = async (req,res)=>{
    try{
        const body = req.body
        const tokenUserId = req.userId
        
        const newPost = await prisma.post.create({
            data:{
                ...body.postData,
                userId:tokenUserId,
                postDetail:{
                    create:body.postDetail 
                }
            }
        })

        res.status(200).json(newPost)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to add Post"})   
    }    
}
export const getPosts = async (req,res)=>{
    try{
        const posts = await prisma.post.findMany()
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json({message:"Failed to get Posts"}) 
    }
}
export const getPost = async (req,res)=>{
    //const tokenUserId = req.userId
    try{
        const id = req.params.id
        const post = await prisma.post.findUnique({
            where:{id},
            include:{
                postDetail:true,
                user:{
                    select:{
                        userName:true,
                        avatar:true
                    }
                }
            }
        })
        //console.log(post)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json({message:"Failed to add Post"}) 
    }
}
export const updatePost = async (req,res)=>{
    const id = req.params.id
    const tokenUserId = req.userId
    try{
        const token = req.cookies.token

    }catch(err){
        res.status(500).json({message:"Failed to update Post"}) 
    }
}
export const deletePost = async (req,res)=>{
    const id = req.params.id
    const tokenUserId = req.userId

    try{
        const post = await prisma.post.findUnique({
            where:{id}
        })
    
        if(post.userId !== tokenUserId) {
            return res.status(403).json({message:"Unathorized access"})
        }
        const deletedPost = await prisma.post.delete({
            where:{id}
        })

        res.status(200).json({message:"Post deleted"})
    }catch(err){
        res.status(500).json({message:"Failed to delete Post"}) 
    }
}
