const asyncHandler = require('express-async-handler')
const Appointment = require('../models/Appointment')
exports.bookingAppointment = asyncHandler(async (req, res) => {
const result = await Appointment.create({
    ...req.body,
    bookingDate : new Date(`${req.body.date} ${req.body.time}`)
})
res.json({message:"Booking Success", result})
})

exports.getAppointments = asyncHandler(async (req, res) => {
const result = await Appointment.find()
res.json({message:"Booking fetch", result})

})

exports.getSingleAppointment = asyncHandler(async (req, res) => {
const result = await Appointment.findOne({_id:req.params.aid})
res.json({message:"Booking single fetch", result})
})


exports.destroyAppointment = asyncHandler(async (req, res) => {
const result = await Appointment.deleteMany()
res.json({message:"Booking destroy success", result})
})