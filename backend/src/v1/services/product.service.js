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
import {
    ConflictErrorRequest,
    NotFoundErrorRequest,
    NotImplementedErrorRequest
} from "../utils/response.error.js"
import { MESSAGES, PAGING } from "../constants/constants.js"

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

    const productCreated = await CreateNewProduct({
        name,
        category,
        image,
        description,
        price,
        discount,
        createdBy
    })

    return productCreated
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

    const productUpdated = await UpdateProduct({ id, payload })

    if (!productUpdated) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_UPDATE_DATA })
    }

    return productUpdated
})

export const deleteProductService = asyncHandler(async ({ id }) => {
    const foundProduct = await GetProductById({ id })
    if (!foundProduct) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    const productUpdated = await DeleteProduct({ id })

    if (!productUpdated) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_UPDATE_DATA })
    }

    return productUpdated
})