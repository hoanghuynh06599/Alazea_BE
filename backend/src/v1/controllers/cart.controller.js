import asyncHandler from "express-async-handler";
import { deleteCartService, getCartByIdService, updateCartService } from "../services/cart.service.js";
import { SuccessResponse } from "../utils/response.success.js";
import { MESSAGES } from "../constants/constants.js";

export const updateCartCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params
    const cartUpdated = await updateCartService({ cartId: id, products: req.body })

    new SuccessResponse({
        message: MESSAGES.UPDATE_DATA_SUCCESS,
        data: cartUpdated
    }).send(res)
})

export const deleteCartCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params
    const cartUpdated = await deleteCartService({ cartId: id })

    new SuccessResponse({
        message: MESSAGES.UPDATE_DATA_SUCCESS,
        data: cartUpdated
    }).send(res)
})

export const findCartByIdCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params
    const foundCart = await getCartByIdService({ cartId: id })

    new SuccessResponse({
        message: MESSAGES.UPDATE_DATA_SUCCESS,
        data: foundCart
    }).send(res)
})