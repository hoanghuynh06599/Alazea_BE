import mongoose from "mongoose";

const { Schema } = mongoose;

const shippingAddressSchema = new Schema({
    province: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    ward: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    no: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    deleteFlag: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

const ShippingAddress = mongoose.model("ShippingAddress", shippingAddressSchema)
export default ShippingAddress
