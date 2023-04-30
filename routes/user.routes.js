const {Router} = require('express');
const bcrypt= require('bcrypt');
const { UserModel } = require('../models/user.model');
const userRouter=Router();
let jwt = require('jsonwebtoken');

userRouter.post('/register',async(req,res)=>{
    const {email,password,name,city}=req.body ;
    try {
        bcrypt.hash(password, 5, async(err, hash)=>{
            const user=new UserModel({email,password:hash,name,city});
            await user.save();
            res.status(200).send({"msg":"New user has been registered"})
        });
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await UserModel.findOne({email})
        // console.log('user:', user)
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    const token = jwt.sign({authorID:user._id,author:user.name}, 'Masai');
                    
                    res.status(200).send({"msg":"User has been successfully login.","token":token})
                }
            });
        }else{
            res.status(200).send({"msg":"Wrong Credentials."}) 
        }
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})

module.exports=userRouter