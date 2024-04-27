import express from "express";
import { isLogin } from "../middlewares/isLogin.js";
import { deleteCartCtrl, findCartByIdCtrl, updateCartCtrl } from "../controllers/cart.controller.js";
import { createNewShippingAddressCtrl, deleteShippingAddressCtrl, getShippingAddressByUserCtrl } from "../controllers/shippingAddress.controller.js";

const shippingAddressRoute = express.Router();

shippingAddressRoute.use(isLogin)
shippingAddressRoute.post("/", createNewShippingAddressCtrl)
shippingAddressRoute.get("/", getShippingAddressByUserCtrl)
shippingAddressRoute.delete("/:id", deleteShippingAddressCtrl)

export default shippingAddressRoute
