import asyncHandler from "express-async-handler"
import {
    createNewCategoryService,
    deleteCategoryService,
    getCategoriesService,
    getCategoryByIdService,
    updateCategoryByService
} from "../services/category.service.js"
import { SuccessResponse } from "../utils/response.success.js"
import { MESSAGES } from "../constants/constants.js"

export const createNewCategoryCtrl = asyncHandler(async (req, res) => {
    const { categoryName, products } = req.body
    const newCategory = await createNewCategoryService({
        categoryName,
        products,
        userId: req.userAuthId
    })

    new SuccessResponse({
        message: MESSAGES.DATA_CREATE_SUCCESS,
        data: newCategory,
    }).send(res)
})

export const getCategoriesCtrl = asyncHandler(async (req, res) => {
    const categories = await getCategoriesService()

    new SuccessResponse({
        message: MESSAGES.GET_DATA_SUCCESS,
        data: categories,
    }).send(res)
})

export const findCategoryByIdCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params

    const result = await getCategoryByIdService({ id })

    new SuccessResponse({
        message: MESSAGES.GET_DATA_SUCCESS,
        data: result,
    }).send(res)
})

export const updateCategoryCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await updateCategoryByService({
        id,
        updateField: req.body
    })

    new SuccessResponse({
        message: MESSAGES.UPDATE_DATA_SUCCESS,
        data: result,
    }).send(res)
})

export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params

    await deleteCategoryService({ id })

    new SuccessResponse({
        message: MESSAGES.DELETE_DATA_SUCCESS,
    }).send(res)
})
