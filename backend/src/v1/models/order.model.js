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
    createdBy: {
        Type: mongoose.Schema.Types.ObjectId,
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
