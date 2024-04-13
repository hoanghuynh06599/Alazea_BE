import User from "../models/user.model.js"

export const CreateNewUser = async ({
    fullName,
    email,
    password,
}) => {
    return await User.create({
        fullName,
        email,
        password,
    })
}

export const GetAllUsers = async ({
    filters,
    limit,
    page
}) => {
    const skip = (page - 1) * limit

    const users = await User
        .find(filters)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: 1 })
        .exec()

    const totalResults = users.length
    const totalDocuments = await User.countDocuments(filters)

    return {
        users,
        totalResults,
        totalDocuments
    }
}

export const FindUserByEmail = async ({
    email
}) => {
    return await User.findOne({ email })
}

export const FindUserById = async ({
    id
}) => {
    return await User.findOne({ _id: id })
}

export const UpdateUserPassword = async ({ password, id }) => {
    const query = { _id: id, deleteFlag: false },
        update = { password: password },
        options = { new: true };
    const userUpdated = await User.findOneAndUpdate(query, update, options)
    return userUpdated
}

export const UpdateUsername = async ({ username, id }) => {
    const query = { _id: id, deleteFlag: false },
        update = { fullName: username },
        options = { new: true };
    const userUpdated = await User.findOneAndUpdate(query, update, options)
    return userUpdated
}
