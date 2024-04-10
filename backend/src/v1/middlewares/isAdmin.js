import asyncHandler from "express-async-handler"
import { getUserIdFromHeader } from "../utils/auth.js"
import { FindUserById } from "../repositories/user.repo.js"
import { ForbiddenErrorRequest } from "../utils/response.error.js"
import { MESSAGES } from "../constants/constants.js"

export const isAdmin = asyncHandler(async (req, res, next) => {
    const clientId = await getUserIdFromHeader(req)
    const foundUser = await FindUserById({ id: clientId })
    if (foundUser.role === "admin") {
        next()
    } else {
        throw new ForbiddenErrorRequest({ message: MESSAGES.INVALID_PERMISSION })
    }
})
