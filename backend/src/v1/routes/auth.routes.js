import express from "express";
import { loginCtrl, registerCtrl } from "../controllers/auth.controller.js";

const authRoute = express.Router()
authRoute.post("/register", registerCtrl)
authRoute.post("/login", loginCtrl)

export default authRoute
