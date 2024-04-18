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
    return Cart.findOne({ _id: id, deleteFlag: false }).populate("createdBy")
}

export const DeleteCart = async ({ id }) => {
    const query = { _id: id, deleteFlag: false }
    return await Cart.findOneAndUpdate(query, { deleteFlag: true }, { new: true })
}
