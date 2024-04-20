import Order from "../models/order.model.js";

export const CreateOrder = async ({
    products,
    totalPayment,
    shippingVendor,
    shippingFee,
    createdBy
}) => {
    const countOrders = await Order.countDocuments();
    let trackingNumber = `ALZ${countOrders}.${shippingVendor}`

    return await Order.create({
        products,
        totalPayment,
        shippingVendor,
        shippingFee,
        createdBy,
        trackingNumber
    })
}

export const GetAllOrders = async () => {
    const orders = await Order.find({ deleteFlag: false })
        .populate({ path: 'createdBy', select: ["fullName"] })
        .populate({ path: 'products' })
        .exec()

    return orders
}

export const GetAllUserOrders = async ({ userId }) => {
    const orders = await Order.find({ createdBy: userId, deleteFlag: false })
        .populate({ path: 'createdBy', select: ["fullName"] })
        .populate({ path: 'products' })
        .exec()

    return orders
}

export const FindOrderById = async ({ id }) => {
    const order = await Order.findOne({ _id: id, deleteFlag: false })
        .populate({ path: 'createdBy', select: ["fullName"] })
        .populate({ path: 'products' })
        .exec()

    return order
}

export const UpdateOrderStatus = async ({ id, status }) => {
    const query = { _id: id, deleteFlag: false }
    const orderUpdated = await Order.findOneAndUpdate(query, { status }, { new: true })
    return orderUpdated
}