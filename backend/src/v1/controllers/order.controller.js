import asyncHandler from "express-async-handler";
import { getUserIdFromHeader } from "../utils/auth.js";
import {
    createNewOrderService,
    findOrderByIdService,
    getAllOrdersService,
    getAllUserOrdersService,
    updateOrderStatusService
} from "../services/order.service.js";
import { CreatedSuccessResponse, SuccessResponse } from "../utils/response.success.js";
import { MESSAGES } from "../constants/constants.js";

export const createNewOrderCtrl = asyncHandler(async (req, res) => {
    const {
        products,
        totalPayment,
        shippingVendor,
        shippingFee,
        cartId
    } = req.body
    const clientId = getUserIdFromHeader(req)

    const order = await createNewOrderService({
        products,
        totalPayment,
        shippingVendor,
        shippingFee,
        cartId,
        createdBy: clientId
    })

    new CreatedSuccessResponse({
        message: MESSAGES.DATA_CREATE_SUCCESS,
        data: order
    }).send(res)
})

export const getAllOrdersCtrl = asyncHandler(async (req, res) => {
    const orders = await getAllOrdersService()

    new SuccessResponse({
        message: MESSAGES.GET_DATA_SUCCESS,
        data: orders
    }).send(res)
})

export const getAllUserOrdersCtrl = asyncHandler(async (req, res) => {
    const userId = await getUserIdFromHeader(req)
    const orders = await getAllUserOrdersService({ userId })

    new SuccessResponse({
        message: MESSAGES.GET_DATA_SUCCESS,
        data: orders
    }).send(res)
})

export const findOrderByIdCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params
    const userId = await getUserIdFromHeader(req)
    const order = await findOrderByIdService({ id, userId })

    new SuccessResponse({
        message: MESSAGES.GET_DATA_SUCCESS,
        data: order
    }).send(res)
})

export const updateOrderStatusCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    const result = await updateOrderStatusService({ id, status })

    new SuccessResponse({
        message: MESSAGES.UPDATE_DATA_SUCCESS,
        data: result
    }).send(res)
})