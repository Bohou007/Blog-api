const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_ACCESS, JWT_EXPIRES_IN } = process.env;

exports.TokenVerification = (req, res, next) => {
    const token = req.header('Auth-token');
    console.log(token);

    if (!token) { res.status(401).json('Access denied !'); }
    // invalid token - synchronous
    try {
        var verify = jwt.verify(token, JWT_ACCESS);
        console.log(verify);
        req.user = verify ;
        next;
    } catch(err) {
        console.log(err);
        res.status(400).json('Token invalid !');
    }
}