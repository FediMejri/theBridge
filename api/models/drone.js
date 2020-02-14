const mongoose=require('mongoose')

const droneSchema=mongoose.Schema({
    reference:{type:String,required:true},
    distance:{type:String,required:true}
})

module.exports=mongoose.model('Drone',droneSchema)