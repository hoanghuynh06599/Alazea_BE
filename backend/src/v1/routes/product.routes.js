import express from "express";
import { 
    createProductCtrl, 
    deleteProductCtrl, 
    getAllProductsCtrl, 
    getProductByIdCtrl, 
    getProductBySlugCtrl, 
    updateProductCtrl
} from "../controllers/product.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const productRoute = express.Router()

productRoute.get("/", getAllProductsCtrl)
productRoute.get("/slug/:slug", getProductBySlugCtrl)
productRoute.get("/:id", getProductByIdCtrl)

productRoute.use(isLogin)
productRoute.use(isAdmin)
productRoute.post("/", createProductCtrl)
productRoute.patch("/:id", updateProductCtrl)
productRoute.delete("/:id", deleteProductCtrl)


export default productRoute
