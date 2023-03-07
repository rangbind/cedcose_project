const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];        
        const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(verified){
            next();
        }else{
            return res.status(401).send();
        }
        
    } catch (error) {
        res.status(401).send();
    }
}
 
module.exports = {
    authenticate,
}