const mongoose=require('mongoose')

const demandSchema=mongoose.Schema({
    distance:{type:Number,required:true},
    date:{type:Date,required:true},
    duration:{type:Number,required:true}
})

module.exports=mongoose.model('Demand',demandSchema)