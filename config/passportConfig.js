// const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const User = require("../models/userModel");
// const passport = require("passport");
// // require("./passportConfig")(passport);
// const JwtStrategy = require("passport-jwt").Strategy;
// const { ExtractJwt } = require("passport-jwt");
// module.exports = (passport) => {
//     passport.use(new GoogleStrategy)(
//         // <em>// Google strategyem</em>
//     );
//     passport.use(
//         new JwtStrategy(
//             {
//                 jwtFromRequest: ExtractJwt.fromHeader("authorization"),
//                 secretOrKey: "secretKey",
//             },
//             async (jwtPayload, done) => {
//                 try {
//                     // <em>// Extract userem</em>
//                     const user = jwtPayload.user;
//                     done(null, user);
//                 } catch (error) {
//                     done(error, false);
//                 }
//             }
//         )
//     );
// }