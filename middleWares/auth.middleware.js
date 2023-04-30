let jwt = require('jsonwebtoken');

const Auth=(req,res,next)=>{
    const token=req.headers.authorization ;
    if(token){
        try {
            const decoded = jwt.verify(token.split(' ')[1],'Masai');
            if(decoded){
                // console.log('decoded:', decoded)
                req.body.authorID=decoded.authorID;
                req.body.author=decoded.author;
                next()
            }else{
                res.send({'msg':'Please Login first!!'})
            }
        } catch (error) {
            res.send({'msg':error.message})
        }
    }else{
        res.send({'msg':'Please Login first!!'})
    }
}

module.exports=Auth;