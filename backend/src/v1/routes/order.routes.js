import express from "express";
import { isLogin } from "../middlewares/isLogin.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { 
    createNewOrderCtrl, 
    findOrderByIdCtrl, 
    getAllOrdersCtrl, 
    getAllUserOrdersCtrl, 
    getUserOrdersSummaryCtrl, 
    updateOrderStatusCtrl 
} from "../controllers/order.controller.js";

const orderRoute = express.Router();

orderRoute.use(isLogin)
orderRoute.get("/user", getAllUserOrdersCtrl)
orderRoute.get("/user/summary", getUserOrdersSummaryCtrl)
orderRoute.get("/:id", findOrderByIdCtrl)
orderRoute.patch("/:id", updateOrderStatusCtrl)
orderRoute.post("/", createNewOrderCtrl)
orderRoute.use(isAdmin);
orderRoute.get("/", getAllOrdersCtrl)

export default orderRoute
