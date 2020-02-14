const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    username:{type:String,required:true},
    cin:{type:Number,required:true},
    gender:{type:String,require:true},
    age:{type:Number,required:true},
    profession:{type:String,required:true},
    email : {
        type : String,
        required : true, 
        unique : true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type : String, required: true}
})

module.exports = mongoose.model('User', userSchema);