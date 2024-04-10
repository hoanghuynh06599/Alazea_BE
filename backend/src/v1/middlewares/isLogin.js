import asyncHandler from "express-async-handler"
import { getAccessTokenFromHeader, getUserIdFromHeader, verifyToken } from "../utils/auth.js"
import { UnauthorizedErrorRequest } from "../utils/response.error.js"
import { MESSAGES } from "../constants/constants.js"

export const isLogin = asyncHandler(async (req, res, next) => {
    const clientId = await getUserIdFromHeader(req)
    const accessToken = await getAccessTokenFromHeader(req)

    const { userId } = await verifyToken({accessToken, clientId})
    if(!userId || userId !== clientId) {
        throw new UnauthorizedErrorRequest({message: MESSAGES.UNAUTHORIZED})
    }
    req.userAuthId = userId
    next()
})
