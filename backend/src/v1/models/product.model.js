import mongoose from "mongoose";
import { slug } from "../utils/commonUtils.js";

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    nameNoUni: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    deleteFlag: {
        type: Boolean,
        default: false,
    },
    imagePublicId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true })

productSchema.pre('save', function (next) {
    this.slug = slug(this.name)
    this.nameNoUni = this.slug.replaceAll("-", " ")
    next()
})

const Product = mongoose.model("Product", productSchema)
export default Product
