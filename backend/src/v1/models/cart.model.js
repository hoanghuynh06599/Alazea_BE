import mongoose from "mongoose";

const { Schema } =  mongoose;

const cartSchema = new Schema({
    products: {
        type: Array,
        default: [],
        required: true,
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

const Cart = mongoose.model("Cart", cartSchema)

export default Cart
