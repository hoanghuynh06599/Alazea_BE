import Order from "../models/order.model.js";

export const CreateOrder = async ({
    products,
    totalPayment,
    shippingVendor,
    shippingFee,
    createdBy,
    shippingAddress
}) => {
    const countOrders = await Order.countDocuments();
    let trackingNumber = `ALZ${countOrders}.${shippingVendor}`

    return await Order.create({
        products,
        totalPayment,
        shippingVendor,
        shippingFee,
        createdBy,
        trackingNumber,
        shippingAddress
    })
}

export const GetAllOrders = async () => {
    const orders = await Order.find({ deleteFlag: false })
        .populate({ path: 'createdBy', select: ["fullName"] })
        .populate({ path: 'products' })
        .exec()

    return orders
}

export const GetAllUserOrders = async ({ userId, status }) => {
    const query = {
        createdBy: userId,
        deleteFlag: false,
        ...(status ? { status } : {})
    }
    const orders = await Order.find(query)
        .populate({ path: 'createdBy', select: ["fullName", "phone"] })
        .populate({ 
            path: 'products', 
            populate : {
                path : 'category',
                select: ["name"]
            }
        })
        .populate({ path: 'shippingAddress' })
        .exec()

    return orders
}

export const FindOrderById = async ({ id }) => {
    const order = await Order.findOne({ _id: id, deleteFlag: false })
        .populate({ path: 'createdBy', select: ["fullName", "phone"] })
        .populate({ 
            path: 'products', 
            populate : {
                path : 'category',
                select: ["name"]
            }
        })
        .populate({ path: 'shippingAddress' })
        .exec()

    return order
}

export const UpdateOrderStatus = async ({ id, status }) => {
    const query = { _id: id, deleteFlag: false }
    const orderUpdated = await Order.findOneAndUpdate(query, { status }, { new: true })
    return orderUpdated
}