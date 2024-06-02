const jwt = require('jsonwebtoken');
const User = require('../models/User');

const AuthMiddleware = (req,res,next) => {
    let token = req.cookies.jwt;
    if(token) {
        jwt.verify(token,process.env.JWT_SECRET,(err,decodedValue) => {
            if(err) {
                return res.status(401).json({message : 'unauthenticated'});
            }else {
                //logged in user
                User.findById(decodedValue._id).then(user => {
                    req.user = user;
                    next()
                });
            }
        })
    }else {
        return res.status(400).json({message : 'token need to provide'});
    }
}

module.exports = AuthMiddleware;