const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken')
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password || !pic) {
        res.status(404);
        throw new Error("please Enter all the Fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ status: "Failed", message: "User already exists" });
        return;
        // throw Error("User already exists");
    }

    const user = await User.create({ name, email, password, pic });

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(404);
        throw new Error("failed to create the user")
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(401).json({ status: "Failed", message: "Invalid Email or Password" });
    }

})

// /api/user/?search=test
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }]
    } : {};
    const userRes = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(userRes);
})

module.exports = { registerUser, authUser, allUsers };