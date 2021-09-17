const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

// Route 1: Fetch All the Notes using: GET "api/notes/fetchallnotes" | Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

// Route 2: Adding the Notes using: POST "api/notes/addnote" | Login Required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 10 })
], async (req, res) => {

    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;

    try {
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})


// Route 3: Update an existing Note using: PUT "api/notes/updatenote" | Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    if (note.user.toString() !== req.user.id) { return res.status(404).send("Not Found") }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json(note);
})

module.exports = router;