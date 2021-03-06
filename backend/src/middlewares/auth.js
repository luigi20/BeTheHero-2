const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send({ Error: "No token provided" })
    }
    const parts = authHeader.split(' ');
    if (!parts.length === 2) {
        res.status(401).send({ Error: "Token error" })
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        res.status(401).send({ Error: "Token malformatted" })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ Error: "Token Invalid" })
        }
        req.userId = decoded.id;
        return next();
    })
}