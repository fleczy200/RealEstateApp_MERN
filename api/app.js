import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv package
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testsRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js"
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config();

const app = express()
app.use(cors({origin: process.env.CLIENT_URL,credentials:true}))

app.use(cookieParser())
app.use(express.json())
app.use("/api/posts",postRoute)
app.use("/api/auth",authRoute)
app.use("/api/test",testsRoute)
app.use("/api/users",userRoute)
//app.user("/api/post",postRoute)



// Verify that the DATABASE_URL environment variable is loaded
//console.log('Database URL:', process.env.DATABASE_URL);
//console.log('Client URL:', process.env.CLIENT_URL,);

app.listen(8800,()=>console.log('Server up and running'))

// http.createServer((req,res)=>{
//     res.write("hello")
// }).listen(8080,()=>console.log("server up"))