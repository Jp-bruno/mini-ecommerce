const mongoose = require('mongoose');

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

module.exports = mongoose.models.Note || mongoose.model("User", UserSchema);