const jwt = require('jsonwebtoken');
const {User} = require('../models/user.models');

const authenticate = async (req, res, next) => {
    try{
        const token = req.cookies.jwt_token;
        const verify = jwt.verify(token, 'iamanundergradfromkalyanigovernmentengineeringcollegeandiamworkingwithhexaware');
    
        const user = await User.findOne({_id: verify._id});

        if(user){
            req.user = user;
        }

        next();
    
    } catch (err) {
        res.status(401).json({status: 401, user: false, message: err});
    }
    
}

module.exports = authenticate;