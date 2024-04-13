import asyncHandler from "express-async-handler";
import {
    CreateOrder,
    FindOrderById,
    GetAllOrders,
    GetAllUserOrders,
    UpdateOrderStatus
} from "../repositories/order.repo.js";
import {
    ForbiddenErrorRequest,
    NotFoundErrorRequest,
    NotImplementedErrorRequest
} from "../utils/response.error.js";
import { MESSAGES } from "../constants/constants.js";
import { FindUserById } from "../repositories/user.repo.js";
import { FindCartById, UpdateCart } from "../repositories/cart.repo.js";

export const createNewOrderService = asyncHandler(async ({
    products,
    totalPayment,
    shippingVendor,
    shippingFee,
    createdBy,
    cartId
}) => {
    const foundCart = await FindCartById({ id: cartId });

    if (!foundCart) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    const productCreated = await CreateOrder({
        products,
        totalPayment,
        shippingVendor,
        shippingFee,
        createdBy
    })

    if (!productCreated) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_CREATE_DATA })
    }

    const newCartProducts = foundCart.products.filter(product => !products.includes(product.id))

    await UpdateCart({ id: cartId, products: newCartProducts })
    return productCreated
})

export const getAllOrdersService = asyncHandler(async () => {
    const orders = await GetAllOrders()
    return orders
})

export const getAllUserOrdersService = asyncHandler(async ({ userId }) => {
    const orders = await GetAllUserOrders({ userId })
    return orders
})

export const findOrderByIdService = asyncHandler(async ({ id, userId }) => {
    const foundUser = await FindUserById({ id: userId })

    if (foundUser.id !== id || foundUser.role !== 'admin') {
        if (!order) {
            throw new ForbiddenErrorRequest({ message: MESSAGES.INVALID_PERMISSION })
        }
    }

    const order = await FindOrderById({ id })
    if (!order) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }
    return order
})

export const updateOrderStatusService = asyncHandler(async ({ id, status }) => {
    const foundOrder = await FindOrderById({ id })

    if (!foundOrder) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    let orderUpdated;

    if (status === foundOrder.status) {
        throw new ForbiddenErrorRequest({ message: MESSAGES.CAN_NOT_STATUS_SAME })
    } else {
        switch (status) {
            case "PROCESSING":
                throw new ForbiddenErrorRequest({ message: MESSAGES.CAN_NOT_STATUS_PROCESSING })
            case "SHIPPING":
                if (foundOrder.status !== "PROCESSING") {
                    throw new ForbiddenErrorRequest({ message: MESSAGES.CAN_NOT_STATUS_SHIPPING })
                } else {
                    orderUpdated = await UpdateOrderStatus({ id, status })
                }
                break;
            case "SHIPPED":
                if (foundOrder.status !== "SHIPPING") {
                    throw new ForbiddenErrorRequest({ message: MESSAGES.CAN_NOT_STATUS_SHIPPED })
                } else {
                    orderUpdated = await UpdateOrderStatus({ id, status })
                }
                break;
            case "PAID":
                if (foundOrder.status !== "SHIPPED") {
                    throw new ForbiddenErrorRequest({ message: MESSAGES.CAN_NOT_STATUS_SHIPPED })
                } else {
                    orderUpdated = await UpdateOrderStatus({ id, status })
                }
                break;
            case "CANCELED":
                if (foundOrder.status !== "PROCESSING") {
                    throw new ForbiddenErrorRequest({ message: MESSAGES.CAN_NOT_STATUS_CANCLED })
                } else {
                    orderUpdated = await UpdateOrderStatus({ id, status })
                }
                break;
            default:
                break;
        }
    }


    if (!orderUpdated) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_UPDATE_DATA })
    }

    return orderUpdated
})