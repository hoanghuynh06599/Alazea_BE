import Cart from "../models/cart.model.js"

export const CreateNewCart = async ({ createdBy, products }) => {
    return Cart.create({
        createdBy,
        products
    })
}

export const UpdateCart = async ({ id, products }) => {
    const query = { _id: id, deleteFlag: false }
    return await Cart.findOneAndUpdate(query, { products }, { new: true })
}

export const FindCartById = async ({ id }) => {
    return Cart.findOne({ _id: id, deleteFlag: false })
    .populate({ path: 'createdBy', select: ["fullName"] })

}

export const DeleteCart = async ({ id }) => {
    const query = { _id: id, deleteFlag: false }
    return await Cart.findOneAndUpdate(query, { deleteFlag: true }, { new: true })
}

export const FindUserCart = async ({ userId }) => {
    return Cart.findOne({ createdBy: userId })
        .populate({ path: 'products', select: ["name", "price", "image", "discount"] })
}