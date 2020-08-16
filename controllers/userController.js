const express = require("express")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const createUser = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.mapped()
        })
    }
    const {email, password} = req.body
    
    try {
        let user = await User.findOne({email})
        if(user){
            return (
                res.status(400).json({
                    msg: "email already exists"
                })
            )
        }
        user = new User(req.body)
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)
        await user.save()
        
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
        res.status(400).send("bad")
    }
}

module.exports=createUser