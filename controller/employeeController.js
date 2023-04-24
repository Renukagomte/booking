const asyncHandler = require('express-async-handler')
const bcrypt = require("bcrypt")
const Employee = require('../models/Employee')

exports.registerEmployee = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const found = await Employee.findOne({ email })
    if (found) {
        return res.status(400).json({ message: "email already exist" })
    }

    const hashPass = bcrypt.hashSync(password, 10)


    const result = await Employee.create({ ...req.body, password: hashPass })
    res.json({ message: "employee register success" })
})


exports.getEmployees = asyncHandler(async (req, res) => {
    const result = await Employee.find()
    res.json({
        message: "employee fetch success",
        result
    })
})


exports.getDoctors = asyncHandler(async (req, res) => {
    const result = await Employee.find({ role: "doctor" }).select("name category")
    res.json({
        message: "doctor fetch success",
        result
    })
})
exports.getSingleEmployee = asyncHandler(async (req, res) => {
    const result = await Employee.findOne({ _id: req.params.eid })
    res.json({ message: "single employee fetch success", result })
})
exports.destroyEmployee = asyncHandler(async (req, res) => {
    const result = await Employee.deleteMany()
    res.json({ message: "single employee fetch success", result })
})