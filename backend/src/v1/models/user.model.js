import mongoose from "mongoose";

const { Schema } = mongoose

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    deleteFlag: {
        type: Boolean,
        default: false,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
}, { timestamps: true });

const User = mongoose.model("User", userSchema)

export default User
