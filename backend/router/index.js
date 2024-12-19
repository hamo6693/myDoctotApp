const express = require("express")
const userController = require("../controller/userController")
const {userValidationRules,validate} = require("../middlewares/validator")
const isLoggedIn = require("../middlewares/auth")

const doctorController = require("../controller/doctorControoler")

const router = express.Router()

router.get("/",(req,res) => {
    res.json({message:"hello word"})    
})


router.post("/register",userValidationRules(),validate,userController.register)

router.post("/login",userController.login)

router.get("/me",isLoggedIn,userController.me)

router.get("/profile",isLoggedIn,userController.getProfile)

router.put("/update-profile",isLoggedIn,userController.updateProfile)


router.delete("/delete-profile",isLoggedIn,userController.deleteProfile)


router.get("/doctor",isLoggedIn,doctorController.index)

module.exports = router