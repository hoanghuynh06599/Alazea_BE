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

export const verifyToken = asyncHandler(async ({ accessToken, userId }) => {
    return jwt.verify(accessToken, process.env.SERECT_KEY_ACCESS_TOKEN, function(err, decoded) {
        if(err) {
            throw new Error("Verify Error")
        } else {
            return decoded
        }
    })
})

export const getUserIdFromHeader = (req) => {
    const clientId = req?.headers?.["x-client-id"]
    if(!clientId) {
        throw new Error("No client id found in request")
    } 

    return clientId
}

export const getAccessTokenFromHeader = (req) => {
    let token = req?.headers?.["authorization"]
    
    if(!token) {
        throw new Error("Token is invalid")
    } 
    token = token.split(" ")

    const prefix = token[0]
    const accessToken = token[1]

    if(!accessToken) {
        throw new Error("accessToken is invalid")
    } 

    return accessToken
}