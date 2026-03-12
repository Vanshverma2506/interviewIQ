import express from "express";
import dotenv from "dotenv";
import connectToDb from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();

app.use(cors({
origin:"http://localhost:5173",
credentials:true
}))
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server is running on port 3000");
  connectToDb();
});
