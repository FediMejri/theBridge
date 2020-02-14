const express=require('express')
const router=express.Router()
const User=require('../models/user')
const Drone=require('../models/drone')
const Demand=require('../models/demand')
const dates=require('../dates')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if (user.length>=1){
            return res.status(409).json({
                message:'mail already exists'
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({error:err})
                }else{
                    const user= new User({
                        firstname:req.body.firstname,
                        lastname:req.body.lastname,
                        username:req.body.username,
                        cin:req.body.cin,
                        gender:req.body.gender,
                        age:req.body.age,
                        profession:req.body.profession,
                        email:req.body.email,
                        password:hash
                    })
                    user.save()
                    .then(result=>{
                        const response={
                            username:result.username
                        }
                        res.status(201).json({
                            message:'successful singup',
                            result:response
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({error:err})
                    })
                }
            })
        }
    })
})

router.post('/login',(req,res,next)=>{
    const email=req.body.email
    const psd=req.body.password
    User.findOne({email})
    .exec()
    .then(result=>{
        if(!result){
            res.status(500).json({message: 'No user found'})
        }
        const pswd=result.password
        bcrypt.compare(psd,pswd,(err,resultat)=>{
            if (err){
                res.status(501).json({message : err})
            }
            if(!resultat){
                res.status(500).json({message: 'wrong password'})
            }
            const token=jwt.sign(
                {email:email,
                userId:result._id
                },"secret",{expiresIn:"1h"}
            )
            return res.json({
                message:'logged in',
                Auth:true,
                token: token
            })
        })
    })
})

router.post('/createDemand',dates.date,(req,res,next)=>{
    const drone = new Drone({
        reference:req.body.ref,
        distance:req.body.dronedistance
    })
    drone.save().
    then(result=>{
        const reponse={id:result._id}
        const demand=new Demand({
            distance:req.body.demanddistance,
            date:req.requestTime,
            duration:req.body.duration
        })
        demand.save()
        .then(resultat=>{
            const response={
                id:result._id,
                time:resultat.date
            }
            res.status(200).json({
                message:'demand and drone created',
                resultat1:response,
                resultat2:reponse
            })
        })
        .catch(err=>{
            res.status(500).json({error:err})
        })
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
})

module.exports=router