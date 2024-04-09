import asyncHandler from "express-async-handler"
import { loginService, registerService } from "../services/auth.service.js"

export const registerCtrl = asyncHandler(async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body
    const result = await registerService({
        fullName, email, password, confirmPassword
    })
    res.status(200).json({
        message: "Success",
        data: result
    })
})

export const loginCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const result = await loginService({
        email,
        password
    })

    res.status(200).json({
        message: "Success",
        data: result
    })
})