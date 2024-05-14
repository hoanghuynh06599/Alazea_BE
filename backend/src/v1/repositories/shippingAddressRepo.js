import ShippingAddress from "../models/shippingAddress.js"

export const CreateNewShippingAddress = async ({
    province,
    district,
    ward,
    street,
    no,
    createdBy
}) => {
    return await ShippingAddress.create({
        province,
        district,
        ward,
        street,
        no,
        createdBy
    })
}

export const GetShippingAddressByUser = async ({ userId, id }) => {
    if(id) {
        return await ShippingAddress.findOne({ createdBy: userId, _id: id, deleteFlag: false })
    } else {
        return await ShippingAddress.find({ createdBy: userId, deleteFlag: false })
    }
}

export const GetUserShippingAddressById = async ({ userId, shippingAddressId }) => {
    const query = { _id: shippingAddressId, createdBy: userId, deleteFlag: false }
    return await ShippingAddress.findOne(query)
}

export const RemoveShippingAddress = async ({ shippingAddressId }) => {
    const query = { _id: shippingAddressId, deleteFlag: false }
    return await ShippingAddress.findOneAndUpdate(query, { deleteFlag: true })
}

export const GetShippingAddressByAllFields = async ({
    province,
    district,
    ward,
    street,
    no,
    createdBy
}) => {
    const query = {
        province,
        district,
        ward,
        street,
        no,
        createdBy,
        deleteFlag: false
    }
    return await ShippingAddress.findOne(query)
}
