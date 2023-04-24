const { registerEmployee, getEmployees, getSingleEmployee, destroyEmployee, getDoctors } = require("../controller/employeeController")

const router = require("express").Router()

router
    .get("/", getEmployees)
    .get("/doctors", getDoctors)
    .get("/:eid", getSingleEmployee)
    .post("/register", registerEmployee)
    .delete("/destroy", destroyEmployee)


module.exports = router