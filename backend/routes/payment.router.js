import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { createOrder, verifySession } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/order", isAuth, createOrder);
paymentRouter.post("/verify-session", isAuth, verifySession);

export default paymentRouter;