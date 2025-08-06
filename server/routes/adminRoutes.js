const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getAllAnalytics, getAllRsvp, updateRsvp, getUsers, deleteUser } = require('../controller/adminController');


// @route   GET /api/admin/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/users', protect, admin, getUsers);


// @route   GET /api/admin/analytics
// @desc    Get analytics data for admin dashboard
// @access  Private/Admin
router.get('/analytics', protect, admin,  getAllAnalytics);



// @route   GET /api/admin/rsvps
// @desc    Get all RSVPs for admin review
// @access  Private/Admin
router.get('/rsvps', protect, admin,  getAllRsvp);


// @route   PUT /api/admin/rsvps/:id
// @desc    Update RSVP status (accept/reject)
// @access  Private/Admin
router.put('/rsvps/:id', protect, admin, updateRsvp);


router.delete('/users/:id', protect, admin, deleteUser)



module.exports = router
