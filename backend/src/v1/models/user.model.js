import mongoose from "mongoose";

const { Schema } = mongoose

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
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
    if(!this.role) {
        this.role = "user"
    }
    next()
})

const User = mongoose.model("User", userSchema)

export default User
