const jwt=require('jsonwebtoken');

module.exports= function isAuthenticated(req,res,next){
    try{
        const decoded=jwt.verify(req.body.token, "secret" );
    }catch(error){
        return res.status(401).json({
            message :'Auth failed'
        });
    }
    next();
    
};