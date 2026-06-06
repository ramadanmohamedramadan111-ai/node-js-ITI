const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    title: {

        type: String,

        required: true,

        minlength: 3

    },

    content: {

        type: String,

        required: true

    },

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    }

}, { versionKey: false });

module.exports = mongoose.model("Post", postSchema);