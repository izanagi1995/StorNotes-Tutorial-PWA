const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');
const passport = require('passport');
const usersRouter = require('../routes/users');
const notesRouter = require('../routes/notes');
const authConfig = require('./authentication');

const COOKIE_SECRET = 'example-secret';

module.exports = (app) => {

    // To be set later when the app frontend will be ready
    // app.use(express.static('public'))

    app.use(bodyParser.json());
    app.use(session({
        secret: COOKIE_SECRET,
        cookie: {secure: false},
        saveUninitialized: true,
        resave: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api/users', usersRouter)
    app.use('/api/notes', authConfig.isAuth, notesRouter)
}