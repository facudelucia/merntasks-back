const {response} = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res=response, next) => {


    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "no token in the request"
        })
    }
    try {
        const encryption = jwt.verify(
            token,
            process.env.SECRET
        )
        req.user = encryption.user
        
    } catch (err) {
        return res.status(401).json({
            msg: "invalid token"
        })

    }

    next()
}


module.exports = validateJWT