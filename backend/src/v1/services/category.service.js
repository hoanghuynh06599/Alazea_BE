import asyncHandler from "express-async-handler";
import {
    CreateCategory,
    DeleteCategory,
    FindCategoryById,
    FindCategoryByName,
    GetAllCategories,
    UpdateCategory
} from "../repositories/category.repo.js";
import {
    ConflictErrorRequest,
    NotFoundErrorRequest,
    NotImplementedErrorRequest
} from "../utils/response.error.js";
import { MESSAGES } from "../constants/constants.js";


export const createNewCategoryService = asyncHandler(async ({ categoryName, products, userId }) => {
    const foundCategory = await FindCategoryByName({ categoryName })
    if (foundCategory) {
        throw new ConflictErrorRequest({ message: MESSAGES.DATA_EXISTS })
    }

    const newCategory = await CreateCategory({
        name: categoryName,
        products,
        userId
    })

    if (!newCategory) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_CREATE_DATA })
    }

    return newCategory
})

export const getCategoriesService = asyncHandler(async () => {
    return await GetAllCategories()
})

export const getCategoryByIdService = asyncHandler(async ({ id }) => {
    const foundCategory = await FindCategoryById({ id })

    if (!foundCategory) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    return foundCategory
})

export const updateCategoryByService = asyncHandler(async ({ id, updateField }) => {
    const foundCategory = await FindCategoryById({ id })

    if (!foundCategory) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    const categoryUpdated = await UpdateCategory({ id, fields: updateField })

    if (!categoryUpdated) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_UPDATE_DATA })
    }

    return categoryUpdated
})

export const deleteCategoryService = asyncHandler(async ({ id }) => {
    const foundCategory = await FindCategoryById({ id })

    if (!foundCategory) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    const deletedCat = await DeleteCategory({ id })
    
    if (!deletedCat) {
        throw new NotImplementedErrorRequest({ message: MESSAGES.CANNOT_DELETE_DATA })
    }

    return deletedCat
})