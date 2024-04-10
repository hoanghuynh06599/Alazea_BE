import mongoose from 'mongoose';
import { slug } from '../utils/commonUtils.js'

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    deleteFlag: {
        type: Boolean,
        default: false,
    },
    nameNoUni: {
        type: String,
    },
    slug: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
}, { timestamps: true })

categorySchema.pre('save', function (next) {
    this.slug = slug(this.name)
    this.nameNoUni = this.slug.replaceAll("-", " ")
    next()
})

const Category = mongoose.model("Category", categorySchema)

export default Category