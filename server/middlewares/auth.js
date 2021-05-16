const jwt = require('jsonwebtoken');
const config = require('config');


//Auth middleware
module.exports = (req, res, next) => {
    const token  = req.header('x-auth-token');
    if(!token) {
        return res.status(401).send("Access Denied!");
    }

    try {
        const decodedToken = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedToken;
        next();
    } catch(err) {
        res.status(401).send('Authorization information is missing or invalid')
    }
}