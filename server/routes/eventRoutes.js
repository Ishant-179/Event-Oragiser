const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../utils/cloudinary');
const { getEventById, createEvent, deleteEvent, getMyEvents, updateEvent, getAllEvent } = require('../controller/eventController');


// @route   GET /api/events
// @desc    Get all public events
// @access  Public
router.get('/', getAllEvent);


// @route   GET /api/events/my-events
// @desc    Get events for the logged-in user (RSVP'd events)
// @access  Private
// **This route must be placed before the :id route**
router.get('/my-events', protect, getMyEvents);


// @route   GET /api/events/:id
// @desc    Get single event by ID
// @access  Public
// NOTE: Using :id for consistency with other routes.
router.get('/:id', getEventById );


// @route   POST /api/events
// @desc    Create a new event
// @access  Private/Admin
router.post(
    '/',
    protect,
    admin, 
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner', maxCount: 1 }]),
    createEvent);


// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteEvent);


// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private/Admin
router.put('/:id', protect, admin, updateEvent);

module.exports = router;
