const jwt = rquire('jsonwebtoken')

module.exports= (req, res, next)=>{
    const authHeader = req.header('Authorization')
    if(!authHeader)
        return res.status(401).json({message:'Acsess Denied'})
    const token = authHeader.split(" ")[1];// Bearer token
    if(!token)
        return res.status(401).json({message:'Invalid token'})
    try{
        const verified = jwt.verify(token, ProcessingInstruction.env.JWT_SECRET)
        req.doctor =verified;
        next()
    }catch(err){
        res.status(403).json({message: 'token is invalid or expired'})
    }
}

