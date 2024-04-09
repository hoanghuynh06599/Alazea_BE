import express from "express";
import { changePasswordCtrl, changeUsernameCtrl, loginCtrl, registerCtrl } from "../controllers/auth.controller.js";
import { isLogin } from "../middlewares/isLogin.js";

const authRoute = express.Router()
authRoute.post("/register", registerCtrl)
authRoute.post("/login", loginCtrl)

authRoute.use(isLogin)
authRoute.patch("/change-password", changePasswordCtrl)
authRoute.patch("/change-name", changeUsernameCtrl)
authRoute.get("/check-login", (req, res) => { res.status(200).json({ message: "OK"})})

export default authRoute
