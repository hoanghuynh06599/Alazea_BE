import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"

export const createToken = asyncHandler(async ({ payload }) => {
    const accessToken = jwt.sign(payload, process.env.SERECT_KEY_ACCESS_TOKEN, {
        // algorithm: "RS256",
        expiresIn: '7days'
    })

    const refreshToken = jwt.sign(payload, process.env.SERECT_KEY_REFRESH_TOKEN, {
        // algorithm: "RS256",
        expiresIn: '7days'
    })

    return { accessToken, refreshToken }
})
