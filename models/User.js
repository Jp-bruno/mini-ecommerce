const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required."],
        maxlenght: [40]
    },
    email: {
        type: String,
        required: [true, "Email required."],
        maxlenght: [40],
    },
    password: {
        type: String,
        required: [true],
        maxlenght: [40]
    }
});

UserSchema.pre("save", function (next) {
    const user = this
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, (saltError, salt) => {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, (hashError, hash) => {
                    if (hashError) {
                        return next(hashError)
                    }

                    user.password = hash;
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);