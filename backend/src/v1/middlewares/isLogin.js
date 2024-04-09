import asyncHandler from "express-async-handler"
import { getAccessTokenFromHeader, getUserIdFromHeader, verifyToken } from "../utils/auth.js"

export const isLogin = asyncHandler(async (req, res, next) => {
    const clientId = await getUserIdFromHeader(req)
    const accessToken = await getAccessTokenFromHeader(req)

    const { userId } = await verifyToken({accessToken, clientId})
    if(!userId || userId !== clientId) {
        throw new Error("Token is invalid")
    }
    next()
})
