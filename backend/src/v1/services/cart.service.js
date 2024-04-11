import asyncHandler from "express-async-handler";
import { DeleteCart, FindCartById, UpdateCart } from "../repositories/cart.repo.js";
import { NotFoundErrorRequest, NotImplementedErrorRequest } from "../utils/response.error.js";
import { MESSAGES } from "../constants/constants.js";

export const updateCartService = asyncHandler(async ({ cartId, products }) => {
    const foundCart = await FindCartById({ id: cartId })

    if (!foundCart) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    const cartUpdated = await UpdateCart({ id: cartId, products })

    if (!cartUpdated) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_UPDATE_DATA })
    }

    return cartUpdated
})

export const deleteCartService = asyncHandler(async ({ cartId }) => {
    const foundCart = await FindCartById({ id: cartId })

    if (!foundCart) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    const cartDeleted = await DeleteCart({ id: cartId })

    if (!cartDeleted) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_UPDATE_DATA })
    }

    return cartDeleted
})

export const getCartByIdService = asyncHandler(async ({ cartId }) => {
    const foundCart = await FindCartById({ id: cartId })

    if (!foundCart) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    return foundCart
})