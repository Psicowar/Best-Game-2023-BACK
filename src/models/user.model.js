const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt");

// User schema

const UserSchema = Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        remainingVotes: { type: Number },
        role: { type: String },
        token: { type: String }
    },
    {
        timestamps: true,
    }
)

// Encrypt password method

UserSchema.pre('save', async function passwordEncrypt(next) {
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        return next();
    } catch (error) {
        return next(error);
    }
})

const UserModel = model('User', UserSchema);

module.exports = UserModel;