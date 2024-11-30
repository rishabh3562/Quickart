// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the User schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: false,
            unique: false,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String, // Store refresh token here (optional)
            required: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare the password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
