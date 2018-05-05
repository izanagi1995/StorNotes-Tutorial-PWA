const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')

/* 
 * This file is related to authentication functions
 */

module.exports = {
    /* Tell to passport to use the User model as authentication method */
    setup : () => {
        passport.use(User.createStrategy());
        /* serializeUser is the method that will be called when the user data must be transformed from app to cookie
         * In our case, passport-local-mongoose will only returns the username field. 
         */
        passport.serializeUser(User.serializeUser());
        /* serializeUser is the method that will be called when the user data must be transformed from cookie to app
         * In our case, passport-local-mongoose will transform the username to the user document.
         */
        passport.deserializeUser(User.deserializeUser());
    },
    /* This method will check if the user is authenticated by looking up req.user */
    isAuth : (req, res, next) => {
        if(req.user) {
            next(null);
        } else {
            res.status(401).json({error : "NOT_AUTHORIZED"});
        }
    }
}