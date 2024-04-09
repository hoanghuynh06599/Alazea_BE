import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/auth.js";
import { CreateNewUser, FindUserByEmail, FindUserById, UpdateUserPassword, UpdateUsername } from "../repositories/user.repo.js";
import { CreateNewCart } from "../repositories/cart.repo.js";

export const registerService = asyncHandler(async ({
    fullName,
    email,
    password,
    confirmPassword
}) => {
    const foundUser = await FindUserByEmail({ email })

    if (foundUser) {
        throw new Error("user is already registered")
    }

    if (password !== confirmPassword) {
        throw new Error("password is not matched")
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
            throw new Error("Cannot generate token")
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
        throw new Error("Username not found and/or password is incorrect 1")
    }

    const matchPassword = await bcrypt.compare(password, foundUser.password)
    console.log({ hash: foundUser.password, password, matchPassword });
    if (!matchPassword) {
        throw new Error("Username not found and/or password is incorrect 2")
    }

    const tokens = await createToken({
        payload: {
            userId: foundUser._id,
            email: foundUser.email,
        }
    })

    return {
        foundUser,
        tokens
    }
})

export const changePasswordService = asyncHandler(async ({ userId, newPassword, currPassword }) => {
    const foundUser = await FindUserById({ id: userId })
    if (!foundUser) {
        throw new Error("User not found")
    }

    const matchesPassword = await bcrypt.compare(currPassword, foundUser.password)
    if (!matchesPassword) {
        throw new Error("Password not matches")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)

    const userUpdated = await UpdateUserPassword({ id: userId, password: hash })
    if (!userUpdated) {
        throw new Error("User not updated")
    }

    return {
        user: userUpdated
    }
})

export const changeUsernameService = asyncHandler(async ({ userId, newUsername }) => {
    const userUpdated = await UpdateUsername({ username: newUsername, id: userId })

    if (!userUpdated) {
        throw new Error("User not updated")
    }

    return {
        user: userUpdated
    }
})