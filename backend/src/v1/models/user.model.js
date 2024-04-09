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
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"]
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

userSchema.pre("save", function(next) {
    if(!this.role.trim().length) {
        this.role = "user"
    }
    next()
})

const User = mongoose.model("User", userSchema)

export default User
