import asyncHandler from "express-async-handler"
import { getUserIdFromHeader } from "../utils/auth.js"
import { FindUserById } from "../repositories/user.repo.js"

export const isAdmin = asyncHandler(async (req, res, next) => {
    const clientId = await getUserIdFromHeader(req)
    const foundUser = await FindUserById(clientId)
    if(foundUser.role === "admin") {
        next()
    } else {
        throw new Error("Không có quyền truy cập. Vui lòng liên hệ Admin")
    }
})
