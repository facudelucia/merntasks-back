const express = require("express")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const authenticateUser = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.mapped()
        })
    }
    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                msg: "user does not exists"
            })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg:"incorrect password "
            })
        }
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, process.env.SECRET,{
            expiresIn:"2h"
        },(err,token)=>{
            if(err) throw err;
            
            res.json({token});
            
        })
    } catch (error) {
        console.log(error)
    }
}
const userAuthenticated = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "there was a mistake"})
    }
}

module.exports={authenticateUser, userAuthenticated}