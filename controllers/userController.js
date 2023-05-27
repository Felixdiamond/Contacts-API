const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register User
//@route POST /register
//@access public

const registerUser = asyncHandler ( async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    } 

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        res.status(400);
        throw new Error("User with email '" + email + "' already exists!");
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    
    if (user) {
        res.status(201).json({
            message: `New User '${username}' Registered Successfully!`,
            user_details: {
                id: user.id,
                email: email
            },
            port: process.env.PORT
        })
    } else {
        res.status(400);
        throw new Error("Error Validating Request");
    }
});

//@desc Login User
//@route POST /login
//@access public

const loginUser = asyncHandler ( async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({ email });

    // Password Comparison

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json({
            message: "Successfully Validated👍",
            accessToken: accessToken,
            port: process.env.PORT
        })
    } else {
        res.status(401);
        throw new Error("Invalid email and password combination!")
    }
});

//@desc Current User Info
//@route GET /current
//@access private

const currentUser = asyncHandler ( async (req, res) => {
    res.status(200).json({
        message: "Current User Successfully Retrieved😁",
        user_details: req.user,
        port: process.env.PORT
    })
});

module.exports = { registerUser, loginUser, currentUser };