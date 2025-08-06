const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); 
const { getProfile } = require('../controller/userController');

// @route   GET /api/profile
// @desc    Get the profile data for the logged-in user
// @access  Private
router.get('/profile', protect, getProfile)


module.exports = router