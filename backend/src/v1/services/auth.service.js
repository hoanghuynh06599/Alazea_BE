import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/auth.js";
import {
    CreateNewUser,
    FindUserByEmail,
    FindUserById,
    UpdateUserPassword,
    UpdateUsername
} from "../repositories/user.repo.js";
import { CreateNewCart } from "../repositories/cart.repo.js";
import {
    ConflictErrorRequest,
    ForbiddenErrorRequest,
    NotFoundErrorRequest,
    NotImplementedErrorRequest,
    UnauthorizedErrorRequest
} from "../utils/response.error.js";
import { MESSAGES } from "../constants/constants.js";


export const registerService = asyncHandler(async ({
    fullName,
    email,
    password,
    confirmPassword
}) => {
    const foundUser = await FindUserByEmail({ email })

    if (foundUser) {
        throw new ConflictErrorRequest({ message: MESSAGES.USER_EXISTS })
    }

    if (password !== confirmPassword) {
        throw new ForbiddenErrorRequest({ message: MESSAGES.PASSWORD_NOT_MATCH })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const newUser = await CreateNewUser({ fullName, email, password: hash })

    if (newUser) {
        const tokens = await createToken({
            payload: {
                userId: newUser._id,
                email: newUser.email
            }
        })

        if (!tokens) {
            throw new NotImplementedErrorRequest({ message: MESSAGES.CAN_NOT_GENERATE_TOKEN })
        }

        await CreateNewCart({
            createdBy: newUser._id,
            products: []
        })

        return {
            newUser,
            tokens
        }
    }
})

export const loginService = asyncHandler(async ({ email, password }) => {
    const foundUser = await FindUserByEmail({ email })

    if (!foundUser) {
        throw new UnauthorizedErrorRequest(MESSAGES.LOGIN_FAILED)
    }

    const matchPassword = await bcrypt.compare(password, foundUser.password)
    if (!matchPassword) {
        throw new UnauthorizedErrorRequest(MESSAGES.LOGIN_FAILED)
    }

    const tokens = await createToken({
        payload: {
            userId: foundUser._id,
            email: foundUser.email,
        }
    })

    if (!tokens) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CAN_NOT_GENERATE_TOKEN })
    }

    return {
        foundUser,
        tokens
    }
})

export const changePasswordService = asyncHandler(async ({ userId, newPassword, currPassword }) => {
    const foundUser = await FindUserById({ id: userId })

    if (!foundUser) {
        throw new NotFoundErrorRequest({ message: MESSAGES.USER_NOT_FOUND })
    }

    const matchesPassword = await bcrypt.compare(currPassword, foundUser.password)
    if (!matchesPassword) {
        throw new UnauthorizedErrorRequest({ message: MESSAGES.PASSWORD_NOT_MATCH })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)

    const userUpdated = await UpdateUserPassword({ id: userId, password: hash })
    if (!userUpdated) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_UPDATE_DATA })
    }

    return {
        user: userUpdated
    }
})

export const changeUsernameService = asyncHandler(async ({ userId, newUsername }) => {
    const userUpdated = await UpdateUsername({ username: newUsername, id: userId })

    if (!userUpdated) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_UPDATE_DATA })
    }

    return {
        user: userUpdated
    }
})