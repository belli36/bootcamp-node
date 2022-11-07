const jwt = require("jsonwebtoken");
const config = require("../config/config");

// const verifyToken = (req, res, next) => {

//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//         console.log("please 1")
//         const token = authHeader.split(" ")[1];
//         if (!token) {
//             console.log("please")
//             // alert("please sign in")
//             return res.status(403).send("not token");

//         }
//         try {
//             console.log("please 2")
//             // alert("please")
//             const decoded = jwt.verify(token, config.TOKEN_KEY);
//             req.user = decoded;
//             console.log(req.user);
//         } catch (err) {
//             return res.status(401).send("invalid token " + err);
//         }
//         return next();
//     }
// };

// module.exports = verifyToken;

const auth = (roles) => {
    return[ (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            if (!token) {
                console.log("not token");
                return res.status(401).send("not token");
            }
            jwt.verify(token, config.TOKEN_KEY, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(403);
                }
                req.user = user;
                console.log("user", user);
                console.log("role" + user.level);
                if (!roles.includes(user.level))
                    return res.status(401).json({ message: "Unauthorized" });
            })
            return next();
        } else {
            return res.status(401).send("not token");
        }
    }]
}
module.exports = auth;