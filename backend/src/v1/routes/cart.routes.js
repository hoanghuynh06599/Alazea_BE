import express from "express";
import { isLogin } from "../middlewares/isLogin.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { deleteCartCtrl, findUserCartByCtrl, updateCartCtrl } from "../controllers/cart.controller.js";

const cartRoute = express.Router();

cartRoute.use(isLogin)
cartRoute.patch("/", updateCartCtrl)
cartRoute.get("/", findUserCartByCtrl)
cartRoute.use(isAdmin)
cartRoute.delete("/:id", deleteCartCtrl)

export default cartRoute
