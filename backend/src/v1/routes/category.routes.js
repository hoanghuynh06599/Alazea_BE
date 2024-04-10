import express from 'express';
import { 
    createNewCategoryCtrl, 
    deleteCategoryCtrl, 
    findCategoryByIdCtrl, 
    getCategoriesCtrl, 
    updateCategoryCtrl 
} from '../controllers/category.controller.js';
import { isAdmin } from '../middlewares/isAdmin.js'
import { isLogin } from '../middlewares/isLogin.js'

const categoryRoute = express.Router()

categoryRoute.get("/:id", findCategoryByIdCtrl)
categoryRoute.get("/", getCategoriesCtrl)

categoryRoute.use(isLogin);
categoryRoute.use(isAdmin);
categoryRoute.post("/", createNewCategoryCtrl)
categoryRoute.patch("/:id", updateCategoryCtrl)
categoryRoute.delete("/:id", deleteCategoryCtrl)


export default categoryRoute
