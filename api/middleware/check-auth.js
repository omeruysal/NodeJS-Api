const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //Header value da Bearer kismindan sonrasini aliriz

        const decoded = jwt.verify(token, "secret"); //decoded  bilgileri aliriz
        
        req.userData = decoded; // requeste koyariz ve ihtiyacimiz oldugunda ordan aliriz
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};