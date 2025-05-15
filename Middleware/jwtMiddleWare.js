const jwt = require('jsonwebtoken');

const jsonverify = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // console.log('Authorization Header:', authHeader); // For debugging

    if (authHeader) {
        try {
            const token = authHeader.split(' ')[1]; 
            const jwtResponse = jwt.verify(token, process.env.JWTSECRETKEY);
            const userId = jwtResponse.userId;
            req.userId = userId; 
          
            
            next();
        } catch (error) {
            res.status(403).json("Please provide a valid token!");
        }
    } else {

        res.status(401).json("Please Login to Continue!");
    }
};

module.exports = jsonverify;
