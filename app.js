const express=require('express')
const app=express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRoutes = require('./api/routes/users')
const droneRoutes=require('./api/routes/drones')

mongoose.connect('mongodb+srv://mohamedfedi:abcdefg1234!@cluster0-5q2tv.mongodb.net/thebridge1?retryWrites=true&w=majority', 
{
    useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true
})
mongoose.Promise = global.Promise
const connection=mongoose.connection
connection.once('open',()=>{
    console.log('connection achieved')
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','*')
    if (req.method==='OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
});

app.use('/users',userRoutes)
app.use('/drones',droneRoutes)

app.use((req,res,next) => {
    const error=new Error('Not found')
    error.status=404
    next(error)
})

app.use((error,req,res,next)=>{3000
    res.status(error.status || 500);
    res.json({
        error : {
            message: error.message 
        }
    });
});

module.exports=app;