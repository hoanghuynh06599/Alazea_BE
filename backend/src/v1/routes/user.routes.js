import express from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isLogin } from "../middlewares/isLogin.js";
import { getAllUsersCtrl } from "../controllers/user.controller.js";

const userRoute = express.Router()

userRoute.use(isLogin)
userRoute.use(isAdmin)
userRoute.get("/", getAllUsersCtrl)

export default userRoute;