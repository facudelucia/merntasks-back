const express = require("express")
const router = express.Router()
const {check} = require("express-validator")
const createUser = require("../controllers/userController")
///api/users
router.post("/",
    [
        check("name", "name is required").not().isEmpty(),
        check("email", "email is required").isEmail(),
        check("password", "password must be at least 6 characters").isLength({min: 6})
    ] ,
    createUser)
module.exports = router;