const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

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