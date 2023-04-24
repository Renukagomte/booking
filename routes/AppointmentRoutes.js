const { getAppointments, getSingleAppointment, bookingAppointment, destroyAppointment } = require("../controller/appointmentController")
const { authProtected } = require("../middlewares/auth")

const router = require("express").Router()

router
    .get("/", getAppointments)
    .get("/:aid", getSingleAppointment)
    .post("/book",authProtected, bookingAppointment)
    .delete("/destroy", destroyAppointment)


module.exports = router