import Product from "../models/product.model.js";

export const CreateNewProduct = async ({
    name,
    category,
    image,
    description,
    price,
    discount,
    createdBy
}) => {
    const productCreated = await Product.create({
        name,
        category,
        image,
        description,
        price,
        discount,
        createdBy
    })
    return productCreated
}

export const FindProductByName = async ({ name }) => {
    return await Product.findOne({ name })
}

export const GetAllProducts = async () => {
    return await Product
        .find({deleteFlag: false})
        .populate({ path: 'category' })
        .exec()
}

export const GetProductBySlug = async ({ slug }) => {
    return await Product.findOne({ slug, deleteFlag: false })
}

export const GetProductById = async ({ id }) => {
    return await Product.findOne({ _id: id,  deleteFlag: false })
}

export const UpdateProduct = async ({
    id,
    payload
}) => {
    const query = { _id: id, deleteFlag: false }
    let productUpdated = await Product.findOneAndUpdate(query, payload, { new: true })
    productUpdated = productUpdated.save()
    return productUpdated
}

export const DeleteProduct = async ({id}) => {
    const query = { _id: id, deleteFlag: false }
    let productUpdated = await Product.findOneAndUpdate(query, {deleteFlag: true}, { new: true })
    productUpdated.save()
    return productUpdated
}
