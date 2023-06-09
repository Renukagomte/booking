const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.register = asyncHandler(async (req, res) => {
    const { password, email } = req.body
    const found = await User.findOne({ email })
    if (found) {
        return res.status(400).json({
            message: "email already exist"
        })
    }
    const hashPass = bcrypt.hashSync(password, 10)
    const result = await User.create({ ...req.body, password: hashPass })
    res.json({
        message: "user register success"
    })
})
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const found = await User.findOne({ email })
    if (!found) {
        return res.status(400).json({ message: "Email Not found" })
    }
    const verify = bcrypt.compareSync(password, found.password)
    if (!verify) {
        return res.status(400).json({ message: "Invalid password" })
    }
    const token = jwt.sign({ id: found._id, role: found.role }, process.env.JWT_KEY)
    res.cookie("token", token)

    res.json({
        message: "user login success",
        result: found
    })
})
exports.continueWithGoogle = asyncHandler(async (req, res) => {
    res.json({
        message: "continue With Google  success"
    })
})
exports.handleAccount = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await User.findByIdAndUpdate(id, { active: req.body.active }, { new: true })
    res.json({
        message: "account block/unblock success",
        result
    })
})

exports.readUsers = asyncHandler(async (req, res) => {
    const result = await User.find()
    res.json({
        message: "user fetch success",
        result
    })
})
exports.readSingleUsers = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await User.findById(id)
    if (!result) {
        return res.status(400).json({
            message: "Invalid Id"
        })
    }
    res.json({
        message: "single user fetch success"
    })
})
exports.updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await User.findByIdAndUpdate(id, req.body, { new: true })
    if (!result) {
        return res.status(400).json({
            message: "Invalid Id"
        })
    }
    res.json({
        message: "user update success",
        result
    })
})
exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await User.findByIdAndDelete(id)
    if (!result) {
        return res.status(400).json({
            message: "Invalid Id"
        })
    }
    res.json({
        message: "user delete success"
    })
})
exports.destroyUser = asyncHandler(async (req, res) => {
    const result = await User.deleteMany()
    res.json({
        message: "user destroy success"
    })
})