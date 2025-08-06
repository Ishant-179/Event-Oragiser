// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valids email address"],
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: String,
        default: "customer",
        enum: ["customer", "admin"],
    },
}, {
    timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
