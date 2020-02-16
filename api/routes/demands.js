const express=require('express')
const router=express.Router()
const Demand=require('../models/demand')

router.get('/',(req,res,next)=>{
    Demand.find()
    .select('distance date duration user')
    .exec()
    .then(docs=>{
        const response={
            count:docs.length,
            demands:docs.map(doc=>{
                return{
                    id:doc._id,
                    distance:doc.distance,
                    date:doc.date,
                    duration:doc.duration,
                    user:doc.user
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