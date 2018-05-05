const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/User');
const authConfig = require('../config/authentication');

router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({
                error : "MISSING_FIELDS"
            });
        }

        const newUser = await User.register(new User({ email, username }), password);

        return res.json(newUser);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error
        });
    }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log("Login");
    res.json({userId : req.user._id, username: req.user.username});
});

router.post('/logout', authConfig.isAuth, (req, res) => {
    req.logout();
    res.status(200).end();
});



module.exports = router;