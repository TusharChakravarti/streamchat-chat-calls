import express from "express"
// import dotenv from 'dotenv'
// dotenv.config()
import "dotenv/config"
import cookieParser from "cookie-parser"
import authRoutes from './routes/auth.route.js'
import {connectDB} from './lib/db.js'
import cors from 'cors'
import './lib/passport.js' 
// import path from "path"
import userRoutes from './routes/user.route.js'
import chatRoutes from './routes/chat.route.js'
const app = express()
const PORT = process.env.PORT

// const __dirname = path.resolve()

app.use(cors({
    origin:["http://localhost:5173",
        "https://streamchat-chat-calls.vercel.app"
    ],
    credentials:true // allow frontend to send cookies
}))

app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/chat', chatRoutes) 

app.get('/ping', (req, res) => {
  res.status(200).json({ status: 'alive' });
});

app.get("/test-email", async (req, res) => {
//   await sendEmail("tusharch04092005@gmail.com", "Test", "Hello from app");
 res.send("Email sent");

});

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname,"../frontend/dist")))
//     app.get("*",(req,res) => res.sendFile(path.join(__dirname,"../frontend","dist","index.html")))
// }

    connectDB()
app.listen(PORT,()=>{
    console.log(`Server is running on this port ${PORT}`)

})
