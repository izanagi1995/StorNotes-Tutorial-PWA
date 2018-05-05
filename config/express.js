const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');
const passport = require('passport');
const usersRouter = require('../routes/users');
const notesRouter = require('../routes/notes');
const authConfig = require('./authentication');

const COOKIE_SECRET = 'example-secret';

module.exports = (app) => {

    /* To be set later when the app frontend will be ready */
    // app.use(express.static('public'))

    // We gonna send JSON so allow express to decode JSON
    app.use(bodyParser.json());
    // Allow express to use cookie for session storage
    app.use(session({
        secret: COOKIE_SECRET,
        cookie: {secure: false},
        saveUninitialized: true,
        resave: true,
    }));
    // Tell express that we will use authentication with passport, this will allow passport to set req.user
    app.use(passport.initialize());
    app.use(passport.session());
    
    // The users route are not protected (login and register)
    app.use('/api/users', usersRouter)
    // Those routes are protected (an anonymous user cannot use them)
    app.use('/api/notes', authConfig.isAuth, notesRouter)
}