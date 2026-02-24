import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createCreditOrder, addCredits } from "../controllers/credit.controller.js";



const creditRouter =express.Router();

creditRouter.post("/order" ,isAuth, createCreditOrder)
creditRouter.post("/add-credits" ,isAuth, addCredits)




 export default creditRouter