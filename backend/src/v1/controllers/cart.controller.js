import asyncHandler from "express-async-handler";
import { deleteCartService, getUserCartService, updateCartService } from "../services/cart.service.js";
import { SuccessResponse } from "../utils/response.success.js";
import { MESSAGES } from "../constants/constants.js";
import { getUserIdFromHeader } from "../utils/auth.js";

export const updateCartCtrl = asyncHandler(async (req, res) => {
    const userId = await getUserIdFromHeader(req)
    const cartUpdated = await updateCartService({ userId, products: req.body.newProducts })

    new SuccessResponse({
        message: MESSAGES.UPDATE_DATA_SUCCESS,
        data: cartUpdated
    }).send(res)
})

export const deleteCartCtrl = asyncHandler(async (req, res) => {
    const userId = await getUserIdFromHeader(req)
    const cartUpdated = await deleteCartService({ userId })

    new SuccessResponse({
        message: MESSAGES.UPDATE_DATA_SUCCESS,
        data: cartUpdated
    }).send(res)
})

export const findUserCartByCtrl = asyncHandler(async (req, res) => {
    const userId = await getUserIdFromHeader(req)
    const foundCart = await getUserCartService({ userId })

    new SuccessResponse({
        message: MESSAGES.UPDATE_DATA_SUCCESS,
        data: foundCart
    }).send(res)
})