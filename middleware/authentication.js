const User = require('../models/users');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

exports.authorization = async (req, res, next) =>{
    try{
        const token = req.cookies.token;
        const decode = jwt.verify(token,secretKey);
        const user = await User.findByPk(decode.userId);
        if(user){
            req.user = user;
            next();
        }else{
            res.status(401).send({message:"Unauthorized"});
        }
    }catch(err){
        if(err.name === 'TokenExpiredError'){
            res.status(401).json({message:"you have been logged out, kindly login again"});
        }else{
            res.status(500).json({message:"Internal Server Error in Authentication"});
        }
    }
}