import mongoose from 'mongoose';

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
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
}, { timestamps: true })

categorySchema.pre('save', function (next) {
    this.slug = slug(this.name)
    this.nameNoUni = this.slug.replace("-", " ")
    next()
})

const Category = mongoose.model("Category", categorySchema)

export default Category