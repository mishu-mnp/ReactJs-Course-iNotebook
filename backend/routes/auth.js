const express = require('express');

// creating router obj from expres  
const router = express.Router();

// importing models User file
const User = require('../models/User');

// for correct or valid input of data entered by User 
const { body, validationResult } = require('express-validator');

// bcypt for security purpose or adding salt concept in passwords
const bcrypt = require('bcryptjs');

// jsonWebToken
const jwt = require('jsonwebtoken');

const JWT_SECRET = "duniyaMastHai";
const fetchuser = require('../middleware/fetchuser')

// ROUTE 1: Creating a User using: POST "api/auth/createuser"   | No login required 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must contain atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {
    let success = false;
    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }


    // Check whether the user with this email exists already
    try {
        // findOne is an asynchronous func to check for a particular field (here email) value already exists or not 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: 'Sorry! User with this email already exists' })
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        console.log(secPassword)

        // Creates a User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        });

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        // res.json(user)
        success = true;
        res.json({ success, authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})


// ROUTE 2: Login for  a User using: POST "api/auth/login"   | No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 3: Get loggedin User details using: POST "/api/auth/getuser" | Login Required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;