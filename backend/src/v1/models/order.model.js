import mongoose from "mongoose";

const { Schema } = mongoose

const orderSchema = new Schema({
    products: {
        type: Array,
        default: [],
        ref: "Product",
    },
    totalPayment: {
        type: Number,
        required: true
    },
    shippingVendor: {
        type: String,
        required: true,
        enum: ["GHTK", "VT"]
    },
    shippingFee: {
        type: Number,
        required: true,
        default: 0
    },
    trackingNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "PROCESSING",
        enum: ["PROCESSING", "SHIPPING", "SHIPPED", "PAID", "CANCELED"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    deleteFlag: {
        type: Boolean,
        default: false,
    },
})

const Order = mongoose.model("Order", orderSchema)

export default Order
