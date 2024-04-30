import express from "express";
import { isLogin } from "../middlewares/isLogin.js";
import { checkShippingAddressCtrl, createNewShippingAddressCtrl, deleteShippingAddressCtrl, getShippingAddressByUserCtrl } from "../controllers/shippingAddress.controller.js";

const shippingAddressRoute = express.Router();

shippingAddressRoute.use(isLogin)
shippingAddressRoute.post("/", createNewShippingAddressCtrl)
shippingAddressRoute.post("/check", checkShippingAddressCtrl)
shippingAddressRoute.get("/", getShippingAddressByUserCtrl)
shippingAddressRoute.delete("/:id", deleteShippingAddressCtrl)

export default shippingAddressRoute
