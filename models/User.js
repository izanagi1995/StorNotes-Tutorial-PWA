const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
});

// This will create all the methods needed for authentication and registration
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);
module.exports = User;