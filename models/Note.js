const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

var NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    tags : {
        type: [String],
    },
    owner : {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    postDate: {
        type: Date,
        required: true,
    }
});

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;