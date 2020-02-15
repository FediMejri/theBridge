const mongoose=require('mongoose')
const User=require('./user')

const demandSchema=mongoose.Schema({
    distance:{type:Number,required:true},
    date:{type:Date,required:true},
    duration:{type:Number,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})

module.exports=mongoose.model('Demand',demandSchema)