import asyncHandler from "express-async-handler";
import { DeleteCart, FindCartById, FindUserCart, UpdateCart } from "../repositories/cart.repo.js";
import { NotFoundErrorRequest, NotImplementedErrorRequest } from "../utils/response.error.js";
import { MESSAGES } from "../constants/constants.js";

export const updateCartService = asyncHandler(async ({ userId, products }) => {
    const foundCart = await FindUserCart({ userId })

    if (!foundCart) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }
    const cartUpdated = await UpdateCart({ id: foundCart._id, products })
    if (!cartUpdated) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_UPDATE_DATA })
    }

    return cartUpdated
})

export const deleteCartService = asyncHandler(async ({ userId }) => {
    const foundCart = await FindUserCart({ userId })

    if (!foundCart) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    const cartDeleted = await DeleteCart({ id: foundCart._id })

    if (!cartDeleted) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_UPDATE_DATA })
    }

    return cartDeleted
})

export const getUserCartService = asyncHandler(async ({ userId }) => {
    const foundCart = await FindUserCart({ userId })

    if (!foundCart) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    return foundCart
})