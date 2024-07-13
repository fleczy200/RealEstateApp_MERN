import jwt from "jsonwebtoken"
export const shouldBeLoggedIn = async (req,res) =>{
    const userId = req.userId
    console.log(userId)
    
    res.status(200).json({message:"You are authenticated"})
}
export const shouldBeAdmin = async (req,res) =>{
    const token = req.cookies.token
    if(!token){
        res.status(401)
        .json({"message":"Not Authenticated!"})
    }
    //verify token
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,payload)=>{
        if(err) return res.status(403).json({"message":"Token is not valid!"})

        if(!payload.isAdmin) return res.status(403).json({message:"Forbidden, not authorized!"})

        res.status(200).json({message:"You are authenticated"})
    })
}