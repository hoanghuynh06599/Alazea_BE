import mongoose from "mongoose";
import { slug } from "../utils/commonUtils";

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
    categoryLv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    deleteFlag: {
        type: Boolean,
        default: false,
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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true })

productSchema.pre('save', function (next) {
    this.slug = slug(this.name)
    this.nameNoUni = this.slug.replace("-", " ")
    next()
})

const Product = mongoose.model("Product", productSchema)
export default Product
