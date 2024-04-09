import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { createToken } from "../utils/auth.js";
import Cart from "../models/cart.model.js";

export const registerService = asyncHandler(async ({
    fullName,
    email,
    password,
    confirmPassword
}) => {
    const foundUser = await User.findOne({ email })

    if(foundUser) {
        throw new Error("user is already registered")
    }

    if(password !== confirmPassword) {
        throw new Error("password is not matched")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        fullName,
        email,
        password: hash,
    })

    if(newUser) {
        const tokens = await createToken({
            payload: {
                userId: newUser._id,
                email: newUser.email,
            }
        })

        if(!tokens) {
            throw new Error("Cannot generate token")
        }

        await Cart.create({
            createdBy: newUser._id,
            products: []
        })

        return {
            newUser,
            tokens
        }
    }
})

export const loginService = asyncHandler(async ({email, password}) => {
    const foundUser = await User.findOne({email})
    
    if(!foundUser) {
        throw new Error("Username not found and/or password is incorrect 1")
    }
    
    const matchPassword = await bcrypt.compare(password, foundUser.password)
    console.log({hash: foundUser.password, password, matchPassword});
    if(!matchPassword) {
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