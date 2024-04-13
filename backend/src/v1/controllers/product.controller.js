import asyncHandler from "express-async-handler";
import {
    createProductService,
    deleteProductService,
    getProductByIdService,
    getProductBySlugService,
    getProductsService,
    updateProductService
} from "../services/product.service.js";
import { getUserIdFromHeader } from "../utils/auth.js";
import { CreatedSuccessResponse, SuccessResponse } from "../utils/response.success.js";
import { MESSAGES } from "../constants/constants.js";
import { removeUnicode } from "../utils/commonUtils.js";
import { FindCategoryBySlug } from "../repositories/category.repo.js";

export const createProductCtrl = asyncHandler(async (req, res) => {
    const {
        name,
        category,
        image,
        description,
        price,
        discount,
    } = req.body
    const userId = await getUserIdFromHeader(req)

    const productCreated = await createProductService({
        name,
        category,
        image,
        description,
        price,
        discount,
        createdBy: userId
    })

    new CreatedSuccessResponse({
        message: MESSAGES.DATA_CREATE_SUCCESS,
        data: productCreated,
    }).send(res)
})

export const getAllProductsCtrl = asyncHandler(async (req, res) => {
    const {
        name,
        category,
        startPrice,
        endPrice,
        sort,
        limit,
        page
    } = req.query

    const filters = {
        deleteFlag: false,
    }

    if (name) {
        filters.nameNoUni = { $regex: removeUnicode({ text: name }), $options: "i" }
    }

    if (category) {
        const foundCategory = await FindCategoryBySlug({ slug: category })
        filters.category = foundCategory.id
    }

    if (startPrice && endPrice) {
        filters.price = { $gte: startPrice, $lte: endPrice }
    } else if (startPrice) {
        filters.price = { $gte: startPrice }
    } else if (endPrice) {
        filters.price = { $lte: endPrice }
    }

    const { products, paging } = await getProductsService({ filters, sort, limit, page })

    new SuccessResponse({
        message: MESSAGES.DATA_CREATE_SUCCESS,
        pagination: paging,
        data: products,
    }).send(res)
})

export const getProductBySlugCtrl = asyncHandler(async (req, res) => {
    const { slug } = req.params
    const product = await getProductBySlugService({ slug })

    new SuccessResponse({
        message: MESSAGES.DATA_CREATE_SUCCESS,
        data: product,
    }).send(res)
})

export const getProductByIdCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = await getProductByIdService({ id })

    new SuccessResponse({
        message: MESSAGES.DATA_CREATE_SUCCESS,
        data: product,
    }).send(res)
})

export const updateProductCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params

    const productUpdated = await updateProductService({
        id,
        payload: req.body
    })

    new SuccessResponse({
        message: MESSAGES.UPDATE_DATA_SUCCESS,
        data: productUpdated,
    }).send(res)
})

export const deleteProductCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params

    const productUpdated = await deleteProductService({ id })

    new SuccessResponse({
        message: MESSAGES.DELETE_DATA_SUCCESS,
    }).send(res)
})