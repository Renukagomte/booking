const { readUsers, readSingleUsers, register, continueWithGoogle, handleAccount, updateUser, deleteUser, destroyUser, login } = require("../controller/userController")

const router = require("express").Router()

router
    .get("/", readUsers)
    .get("/:id", readSingleUsers)
    .post("/register", register)
    .post("/login", login)
    .post("/continue-with-google", continueWithGoogle)
    .put("/account/:id", handleAccount)
    .put("/update/:id", updateUser)
    .delete("/destroy", destroyUser)
    .delete("/delete/:id", deleteUser)


module.exports = router