const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    email: {
        type: String,
        required: [true, "Email address is required!"]
    },
    phone: {
        type: Number,
        required: [true, "Phone number is required"]
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Contact", contactSchema);