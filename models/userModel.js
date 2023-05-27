const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required!"]
    },
    email: {
        type: String,
        required: [true, "Email Address is Required!"],
        unique: [true, "This email address already exists!"]
    },
    password: {
        type: String,
        required: [true, "A Password is Required!"]
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);