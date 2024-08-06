import express from "express";
import cors from "cors"
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import postr from "./routes/post.route.js";
import authr from "./routes/auth.route.js";
import testr from "./routes/test.route.js";
import userr from "./routes/user.route.js";
import chatr from "./routes/chat.route.js";
import messager from "./routes/message.route.js";

dotenv.config();

const app = express()

app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/posts", postr)
app.use("/api/auth", authr)
app.use("/api/test", testr)
app.use("/api/users", userr)
app.use("/api/chats", chatr);
app.use("/api/messages", messager);

app.listen(8800, ()=>{
    console.log("http://localhost:8800/api/auth/login")
})