import express from "express";
import dotenv from "dotenv";
import connectToDb from "./config/database.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT ||8000

app.get("/", (req, res) => {
  return res.json({ message: "vansh verma" });
});

app.listen(PORT, () => {
  console.log("server is running on port 3000");
  connectToDb();
});
