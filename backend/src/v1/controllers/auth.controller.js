import asyncHandler from "express-async-handler"
import { changePasswordService, changeUsernameService, loginService, registerService } from "../services/auth.service.js"
import { getUserIdFromHeader } from "../utils/auth.js"

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

export const changePasswordCtrl = asyncHandler(async (req, res) => {
    const userId = await getUserIdFromHeader(req)
    const { newPassword, currPassword } = req.body
    const result = await changePasswordService({ userId, newPassword, currPassword })

    res.status(200).json({
        message: "Success",
        data: result
    })
})

export const changeUsernameCtrl = asyncHandler(async (req, res) => {
    const userId = await getUserIdFromHeader(req)
    const { newUsername } = req.body
    const result = await changeUsernameService({userId, newUsername})

    res.status(200).json({
        message: "Success",
        data: result
    })
})