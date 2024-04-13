import express from "express";
import { isLogin } from "../middlewares/isLogin.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { 
    createNewOrderCtrl, 
    findOrderByIdCtrl, 
    getAllOrdersCtrl, 
    getAllUserOrdersCtrl, 
    updateOrderStatusCtrl 
} from "../controllers/order.controller.js";

const orderRoute = express.Router();

orderRoute.use(isLogin)
orderRoute.get("/user", getAllUserOrdersCtrl)
orderRoute.get("/:id", findOrderByIdCtrl)
orderRoute.patch("/:id", updateOrderStatusCtrl)
orderRoute.use(isAdmin);
orderRoute.post("/", createNewOrderCtrl)
orderRoute.get("/", getAllOrdersCtrl)

export default orderRoute
