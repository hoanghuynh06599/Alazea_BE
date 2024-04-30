import asyncHandler from "express-async-handler"
import { CreateNewShippingAddress, GetShippingAddressByAllFields, GetShippingAddressByUser, GetUserShippingAddressById, RemoveShippingAddress } from "../repositories/shippingAddressRepo.js"
import { ForbiddenErrorRequest, NotFoundErrorRequest, NotImplementedErrorRequest } from "../utils/response.error.js"
import { MESSAGES } from "../constants/constants.js"

export const createNewShippingAddressService = asyncHandler(async ({
    province,
    district,
    ward,
    street,
    no,
    createdBy
}) => {
    const foundShippingAddress = await GetShippingAddressByAllFields({
        province,
        district,
        ward,
        street,
        no,
        createdBy
    })

    if (foundShippingAddress) {
        throw new ForbiddenErrorRequest({ message: MESSAGES.DATA_EXISTS })
    }

    const newShippingAddress = await CreateNewShippingAddress({
        province,
        district,
        ward,
        street,
        no,
        createdBy
    })

    if (!newShippingAddress) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_CREATE_DATA })
    }

    return newShippingAddress
})

export const checkShippingAddressService = asyncHandler(async ({
    province,
    district,
    ward,
    street,
    no,
    createdBy
}) => {
    const foundShippingAddress = await GetShippingAddressByAllFields({
        province,
        district,
        ward,
        street,
        no,
        createdBy
    })

    if (!foundShippingAddress) {
        throw new ForbiddenErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }


    return foundShippingAddress
})

export const getShippingAddressByUserService = asyncHandler(async ({ userId }) => {
    return await GetShippingAddressByUser({ userId })
})

export const getAllUserShippingAddressService = asyncHandler(async ({ userId }) => {
    const foundShippingAddress = await GetShippingAddressByUser({ userId })
    return foundShippingAddress
})

export const deleteShippingAddressService = asyncHandler(async ({ userId, shippingAddressId }) => {
    const foundShippingAddress = await GetUserShippingAddressById({ userId, shippingAddressId })

    if (!foundShippingAddress) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    const addressDelete = await RemoveShippingAddress({ shippingAddressId: foundShippingAddress._id })

    if (!addressDelete) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_CREATE_DATA })
    }

    return addressDelete
})
