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

export const GetAllCategories = async () => {
    return await Category.find({})
}

export const FindCategoryByName = async ({ categoryName }) => {
    return await Category.findOne({ name: categoryName, deleteFlag: false })
}

export const FindCategoryById = async ({ id }) => {
    return await Category.findOne({ _id: id, deleteFlag: false })
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
