import Product from "../models/product.model.js";

export const CreateNewProduct = async ({
    name,
    category,
    image,
    description,
    price,
    discount,
    createdBy,
    imagePublicId
}) => {
    const productCreated = await Product.create({
        name,
        category,
        image,
        description,
        price,
        discount,
        createdBy,
        imagePublicId
    })
    return productCreated
}

export const FindProductByName = async ({ name }) => {
    return await Product.findOne({ name }).populate({ path: 'createdBy' })
}

export const GetAllProducts = async ({ filters, sort, limit, page }) => {
    let sortedBy;
    const skip = (page - 1) * limit

    switch (sort) {
        case "price_expensive":
            sortedBy = { price: -1 }
            break;
        case "price_cheapest":
            sortedBy = { price: 1 }
            break;
        case "latest":
            sortedBy = { createdAt: -1 }
            break;
        default:
            sortedBy = { createdAt: 1 }
            break;
    }

    const products = await Product
        .find(filters)
        .select('-imagePublicId')
        .populate({ path: 'createdBy', select: ["fullName"] })
        .sort(sortedBy)
        .skip(skip)
        .limit(limit)
        .populate({ path: 'category' })
        .exec()

    const totalDocuments = await Product.countDocuments(filters)
    const totalResults = products.length

    return {
        products,
        totalResults,
        totalDocuments
    }
}

export const GetProductBySlug = async ({ slug }) => {
    return await Product.findOne({ slug, deleteFlag: false }).populate({ path: 'createdBy', select: ["fullName"] })
}

export const GetProductById = async ({ id }) => {
    return await Product.findOne({ _id: id, deleteFlag: false })
    .populate({ path: 'createdBy', select: ["fullName"] })
    .populate({ path: 'category', select: ["name"] })
    
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

export const DeleteProduct = async ({ id }) => {
    const query = { _id: id, deleteFlag: false }
    let productUpdated = await Product.findOneAndUpdate(query, { deleteFlag: true }, { new: true })
    console.log({productUpdated});
    productUpdated.save()
    return productUpdated
}
