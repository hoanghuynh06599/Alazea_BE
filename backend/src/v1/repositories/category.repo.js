import Category from "../models/category.model.js"
import { slug } from "../utils/commonUtils.js"

export const CreateCategory = async ({
    name,
    products,
    userId
}) => {
    return await Category.create({
        name,
        products,
        createdBy: userId
    })
}

export const GetAllCategories = async ({filters, limit, page}) => {
    const skip = (page - 1) * limit
    const categories = await Category
        .find(filters)
        .populate({ path: 'createdBy', select: ["fullName"] })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: 1 })
        .exec()

    const totalResults = categories.length
    const totalDocuments = await Category.countDocuments(filters)

    return {
        categories,
        totalResults,
        totalDocuments
    }
}

export const FindCategoryByName = async ({ categoryName }) => {
    return await Category.findOne({ name: categoryName, deleteFlag: false }).populate({ path: 'createdBy', select: ["fullName"] })
}

export const FindCategoryBySlug = async ({ slug }) => {
    return await Category.findOne({ slug, deleteFlag: false }).populate({ path: 'createdBy', select: ["fullName"] })
}

export const FindCategoryById = async ({ id }) => {
    return await Category.findOne({ _id: id, deleteFlag: false }).populate({ path: 'createdBy', select: ["fullName"] })
}

export const UpdateCategory = async ({ id, fields }) => {
    const query = { _id: id, deleteFlag: false }
    const catUpdated = await Category.findOneAndUpdate(query, fields, { new: true })
    catUpdated.slug = slug(catUpdated.name)
    catUpdated.save()
    return catUpdated
}

export const DeleteCategory = async ({ id }) => {
    const query = { _id: id, deleteFlag: false }
    return await Category.findOneAndUpdate(query, { deleteFlag: true })
}
