const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(403).send("not token");
        }
        try {
            const decoded = jwt.verify(token, config.TOKEN_KEY);
            req.user = decoded;
            console.log(req.user);
        } catch (err) {
            return res.status(401).send("invalid token " + err);
        }
        return next();
    }
};

module.exports = verifyToken;