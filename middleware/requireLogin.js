const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const mongoose = require('mongoose')
const User = mongoose.model("User")
module.exports = async(req,res,next)=>{
    // const {authorization} = req.headers
    // //authorization === Bearer ewefwegwrherhe
    // if(!authorization){
    //    return res.status(401).json({error:"you must be logged in"})
    // }
    // const token = authorization.replace("Bearer ","")

    let token 
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }
    if (!token) {
        return next (
            new AppError('You are not logged in! Please log in to get access.', 401),
        )
    }
    
    // 2) Verification token 
    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    jwt.verify(token, process.env.JWT_SECRET,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
        
        
    })
}