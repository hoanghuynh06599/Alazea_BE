import asyncHandler from "express-async-handler"
import { changePasswordService, changeUsernameService, loginService, registerService } from "../services/auth.service.js"
import { getUserIdFromHeader } from "../utils/auth.js"
import { SuccessResponse } from "../utils/response.success.js"
import { MESSAGES } from "../constants/constants.js"
import { getUserByIdService } from "../services/user.service.js"

export const registerCtrl = asyncHandler(async (req, res) => {
    const { fullName, password, confirmPassword, phone } = req.body
    const result = await registerService({
        fullName, password, confirmPassword, phone
    })

    new SuccessResponse({
        message: MESSAGES.REGISTER_SUCCESS,
        data: result
    }).send(res)
})

export const loginCtrl = asyncHandler(async (req, res) => {
    const { phone, password } = req.body
    console.log(req.body);
    const result = await loginService({
        phone,
        password
    })

    new SuccessResponse({
        message: MESSAGES.LOGIN_SUCCESS,
        data: result
    }).send(res)
})

export const changePasswordCtrl = asyncHandler(async (req, res) => {
    const userId = await getUserIdFromHeader(req)
    const { newPassword, currPassword } = req.body
    const result = await changePasswordService({ userId, newPassword, currPassword })

    new SuccessResponse({
        message: MESSAGES.CHANGE_PASSWORD_SUCCESS,
        data: result
    }).send(res)
})

export const changeUsernameCtrl = asyncHandler(async (req, res) => {
    const userId = await getUserIdFromHeader(req)
    const { newUsername } = req.body
    const result = await changeUsernameService({ userId, newUsername })

    new SuccessResponse({
        message: MESSAGES.CHANGE_USERNAME_SUCCESS,
        data: result
    }).send(res)
})

export const checkUserRoleCtrl = asyncHandler(async (req, res) => {
    const clientId = await getUserIdFromHeader(req)

    const user = await getUserByIdService({ id: clientId })

    new SuccessResponse({
        message: MESSAGES.CHANGE_USERNAME_SUCCESS,
        data: user.role
    }).send(res)
})