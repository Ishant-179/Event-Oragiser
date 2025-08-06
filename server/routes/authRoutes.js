const express = require('express');
const { registerUser, loginUser} = require('../controller/authConroller');
const router = express.Router();


// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/signup', registerUser)

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser)


module.exports = router;