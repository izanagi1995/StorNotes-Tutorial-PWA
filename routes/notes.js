const express = require('express');
const passport = require('passport');
const router = express.Router();

const Note = require('../models/Note');

const authConfig = require('../config/authentication');

router.post('/', async (req, res) => {
    try {
        const { title, content, tags, postDate } = req.body;

        if (!title || !postDate) {
            return res.status(400).json({
                error : "MISSING_FIELDS"
            });
        }

        const newNote = await Note.create(new Note({ title, content, tags, owner : req.user._id, postDate }));

        return res.json(newNote);
        
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
});

router.get('/', async (req, res) => {
    const user = req.user;

    const notes = await Note.find({owner : user._id});

    return res.json(notes);
});

router.delete('/note/:id', async (req, res) => {
    return await Note.remove({owner : user._id, _id: req.params.id});
});



module.exports = router;