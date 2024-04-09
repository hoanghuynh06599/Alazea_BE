import Cart from "../models/cart.model.js"

export const CreateNewCart = async ({ createdBy, products }) => {
    return Cart.create({
        createdBy,
        products
    })
}
