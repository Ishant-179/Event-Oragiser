const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createRsvp, checkRsvpById, getRsvpsForEvent } = require('../controller/rsvpController');



// @route   POST /api/rsvps
// @desc    Create a new RSVP
// @access  Private
router.post('/', protect,  createRsvp);



// @route   GET /api/rsvps/check/:eventId
// @desc    Check if user has RSVPd for an event
// @access  Private
router.get('/check/:eventId', protect, checkRsvpById);


// Get all RSVPs for a specific event
// @route GET /api/rsvps/:eventId
// @access Private (Admin only)
router.get('/:eventId', protect, getRsvpsForEvent);


module.exports = router;