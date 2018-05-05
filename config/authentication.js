const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')

module.exports = {
    setup : () => {
        passport.use(User.createStrategy());
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
    },
    isAuth : (req, res, next) => {
        if(req.user) {
            next(null);
        } else {
            res.status(401).json({error : "NOT_AUTHORIZED"});
        }
    }
}