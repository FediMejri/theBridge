const express=require('express')
const router=express.Router()
const Drone=require('../models/drone')

router.get('/',(req,res,next)=>{
    Drone.find()
    .select('reference distance')
    .exec()
    .then(docs=>{
        const response={
            count: docs.length,
            drones:docs.map(doc=>{
                return{
                    id:doc._id,
                    reference:doc.reference,
                    distance:doc.distance
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
})

module.exports=router