const express = require("express")
const router = express.Router()
const {check} = require("express-validator")
const {authenticateUser, userAuthenticated} = require("../controllers/authController")
const validateJWT = require("../middlewares/validate-token")
///api/auth
router.post("/",
    
    authenticateUser)
router.get("/",validateJWT, userAuthenticated)
module.exports = router;