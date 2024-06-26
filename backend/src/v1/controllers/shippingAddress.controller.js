import asyncHandler from "express-async-handler";
import { checkShippingAddressService, createNewShippingAddressService, deleteShippingAddressService, getShippingAddressByUserService } from "../services/shippingAddress.service.js";
import { CreatedSuccessResponse, SuccessResponse } from "../utils/response.success.js";
import { MESSAGES } from "../constants/constants.js";
import { getUserIdFromHeader } from "../utils/auth.js";

export const createNewShippingAddressCtrl = asyncHandler(async (req, res) => {
    const userId = await getUserIdFromHeader(req)
    const {
        province,
        district,
        ward,
        street,
        no
    } = req.body

    const newShippingAddress = await createNewShippingAddressService({
        province,
        district,
        ward,
        street,
        no,
        createdBy: userId
    })

    new CreatedSuccessResponse({
        message: MESSAGES.DATA_CREATE_SUCCESS,
        data: newShippingAddress
    }).send(res)
})

export const checkShippingAddressCtrl = asyncHandler(async (req, res) => {
    const userId = await getUserIdFromHeader(req)
    const {
        province,
        district,
        ward,
        street,
        no
    } = req.body

    const newShippingAddress = await checkShippingAddressService({
        province,
        district,
        ward,
        street,
        no,
        createdBy: userId
    })

    new CreatedSuccessResponse({
        message: MESSAGES.GET_DATA_SUCCESS,
        data: newShippingAddress
    }).send(res)
})

export const getShippingAddressByUserCtrl = asyncHandler(async (req, res) => {
    const userId = await getUserIdFromHeader(req)
    const { id } = req.query
    const shippingAddress = await getShippingAddressByUserService({ userId, id })

    new SuccessResponse({
        message: MESSAGES.GET_DATA_SUCCESS,
        data: shippingAddress
    }).send(res)
})

export const deleteShippingAddressCtrl = asyncHandler(async (req, res) => {
    const userId = await getUserIdFromHeader(req)
    const { id } = req.params
    await deleteShippingAddressService({ userId, shippingAddressId: id })

    new CreatedSuccessResponse({
        message: MESSAGES.DELETE_DATA_SUCCESS,
    }).send(res)
})
