const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const{ Op } = require('sequelize');

exports.userSignup = async ( req , res, next) =>{
    try{
        const { name, email , phonenumber , imageUrl , password } = req.body;
        let  userExist = await User.findOne({
            where:{
                [Op.or]:[{email},{phonenumber}],
            },
        });
        if(!userExist){
            const hash = await bcrypt.hash(password,10);
            const user = await User.create({
                name,
                email,
                phonenumber,
                imageUrl,
                password:hash,
            })
            const token = jwt.sign({userId:user.id}, secretKey,{
                expiresIn: "1h",
            });
            res.cookie("token",token , {maxAge:3600000});
            return res
                .status(201)
                .json({message: "user account created successfully"});
        }else{
            return res.status(402).json({message:"Email or Phonenumber already exist"});
        }
    }catch(err){
        console.log(err);
    }
}

exports.userSignIn = async (req, res , next) =>{
    try{
        const{ email, password} = req.body;
        let userExist = await User.findOne({where : {email}});
        if(userExist) {
            const isPasswordValid = await bcrypt.compare( password , userExist.password );
            if(isPasswordValid){
                const token = jwt.sign({userId:userExist.id},secretKey,{
                    expiresIn:"1h",
                });
                res.cookie("token",token,{
                    maxAge:360000
                })
                return res.status(201).json({message:'credential verified'});
            }else{
                return res.status(401).json({message:"Invalid credential"});
            }
        }else{
            return res.status(409).json({message:"Account doesn't Exist"})
        }
    }catch(err){
        console.log(err);
    }
}