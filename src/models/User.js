const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {

        type: String,

        required: true,

        minlength: 3,

        maxlength: 30

    },

    email: {

        type: String,

        required: true,

        unique: true

    },

    password: {

        type: String,

        required: true,

        minlength: 6,

        select: false

    },

    role: {

        type: String,

        required: true,

        enum: ["admin", "user"]

    }

}, { versionKey: false });

module.exports = mongoose.model("User", userSchema);