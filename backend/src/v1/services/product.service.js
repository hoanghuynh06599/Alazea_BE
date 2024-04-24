import asyncHandler from "express-async-handler"
import {
    CreateNewProduct,
    DeleteProduct,
    FindProductByName,
    GetAllProducts,
    GetProductById,
    GetProductBySlug,
    UpdateProduct
} from "../repositories/product.repo.js"
import { FindCategoryById, UpdateCategory } from "../repositories/category.repo.js"
import {
    ConflictErrorRequest,
    ForbiddenErrorRequest,
    NotFoundErrorRequest,
    NotImplementedErrorRequest
} from "../utils/response.error.js"
import { MESSAGES, PAGING } from "../constants/constants.js"

import cloudinary from 'cloudinary'

const cloudinaryV2 = cloudinary.v2

cloudinaryV2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SERECT_KEY
})

export const createProductService = asyncHandler(async ({
    name,
    category,
    image,
    description,
    price,
    discount,
    createdBy
}) => {
    const foundProduct = await FindProductByName({ name })

    if (foundProduct) {
        throw new ConflictErrorRequest({ message: MESSAGES.DATA_EXISTS })
    }

    const foundCategory = await FindCategoryById({ id: category })

    if (!foundCategory) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    try {
        const imageUploadResult = await cloudinaryV2.uploader.upload(image, {
            folder: process.env.CLOUD_FOLDER_NAME,
        })

        const imageURL = imageUploadResult.secure_url
        const imagePublicId = imageUploadResult.public_id

        const productCreated = await CreateNewProduct({
            name,
            category,
            image: imageURL,
            description,
            price,
            discount,
            createdBy,
            imagePublicId
        })

        const newProducts = [...foundCategory.products, productCreated._id]

        await UpdateCategory({ id: foundCategory._id, fields: { products: newProducts } })

        return productCreated
    } catch (error) {
        throw new ForbiddenErrorRequest({ message: error.message })
    }
})

export const getProductsService = asyncHandler(async ({ filters, sort, limit = PAGING.LIMIT, page = PAGING.PAGE }) => {
    const { products, totalResults, totalDocuments } = await GetAllProducts({ filters, sort, limit, page })

    const paging = {
        total: totalDocuments,
        totalResults,
        limit: Number(limit),
        currPage: Number(page),
        ...(page === 1 ? {} : { prevPage: page - 1 }),
        ...((page * limit) >= totalDocuments ? {} : { nextPage: page + 1 })
    }

    return {
        products,
        paging
    }
})

export const getProductBySlugService = asyncHandler(async ({ slug }) => {
    const product = await GetProductBySlug({ slug })
    if (!product) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    return product
})

export const getProductByIdService = asyncHandler(async ({ id }) => {
    const product = await GetProductById({ id })
    if (!product) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    return product
})

export const updateProductService = asyncHandler(async ({ id, payload }) => {
    const foundProduct = await GetProductById({ id })

    if (!foundProduct) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    if (payload.category) {
        const oldCategory = await FindCategoryById({ id: foundProduct.category })
        const foundCategory = await FindCategoryById({ id: payload.category })

        if (!foundCategory || !oldCategory) {
            throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
        } else if (foundCategory._id.toString() === oldCategory._id.toString()) {
            throw new ConflictErrorRequest({ message: MESSAGES.DATA_EXISTS })
        }
    }

    if (payload.image) {
        try {
            const imageDeletedResult = cloudinaryV2.uploader.destroy(foundProduct.imagePublicId)
            const imageUploadResult = cloudinaryV2.uploader.upload(payload.image, {
                folder: process.env.CLOUD_FOLDER_NAME,
            })

            const [deletedResult, uploadResult] = await Promise.all([imageDeletedResult, imageUploadResult])

            if (uploadResult.secure_url) {
                payload.image = uploadResult.secure_url
                payload.imagePublicId = uploadResult.public_id
            }
        } catch (error) {
            throw new ForbiddenErrorRequest({ message: error.message })
        }
    }

    const productUpdated = await UpdateProduct({ id, payload })

    if (!productUpdated) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_UPDATE_DATA })
    }

    if (payload.category) {
        const oldCategoryProducts = oldCategory.products.filter(product => product._id.toString() !== foundProduct.id)
        const newCategoryProducts = [...foundCategory.products, foundProduct._id]

        const updateOldCate = UpdateCategory({ id: oldCategory._id, fields: { products: oldCategoryProducts } });
        const updateNewCate = UpdateCategory({ id: foundCategory._id, fields: { products: newCategoryProducts } });

        try {
            await Promise.all([updateOldCate, updateNewCate])
        } catch (error) {
            throw new NotImplementedErrorRequest({ message: error.message })
        }
    }

    return productUpdated
})

export const deleteProductService = asyncHandler(async ({ id }) => {
    const foundProduct = await GetProductById({ id })

    if (!foundProduct) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    const foundCategory = await FindCategoryById({ id: foundProduct.category })
    const newProducts = foundCategory.products.filter(product => product._id.toString() !== foundProduct.id)
    const updateCate = UpdateCategory({ id: foundCategory._id, fields: { products: newProducts } })
    const productDeleted = DeleteProduct({ id })

    const [ updateResult, deleteResult ] = await Promise.all([updateCate, productDeleted])

    if (!deleteResult || !updateCate) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_UPDATE_DATA })
    }

    return deleteResult
})