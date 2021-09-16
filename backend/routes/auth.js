const express = require('express');

// creating router obj from expres  
const router = express.Router();

// importing models User file
const User = require('../models/User');

// for correct or valid input of data entered by User 
const { body, validationResult } = require('express-validator');

// bcypt for security purpose or adding salt concept in passwords
const bcrypt = require('bcryptjs');

// Creating a User using: POST "api/auth/createuser"   | No login required 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must contain atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {

    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with this email exists already
    try {
        // findOne is an asynchronous func to check for a particular field (here email) value already exists or not 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'Sorry! User with this email already exists' })
        }

        // Creates a User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json(user)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

module.exports = router;