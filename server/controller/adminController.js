const Event = require('../models/event');
const Rsvp = require('../models/rsvp');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');


// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // सभी यूजर्स को पासवर्ड को छोड़कर पाएं
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Could not load users.' });
    }
};


const getAllAnalytics = async(req, res) => {
     try {
        const totalEvents = await Event.countDocuments();
        const totalRsvps = await Rsvp.countDocuments();
        const totalUsers = await User.countDocuments();
        const events = await Event.find({}); // Get all events for chart data

        res.json({
            analytics: { totalEvents, totalRsvps, totalUsers },
            events // Send events data for category chart
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const getAllRsvp = async(req, res) => {
     try {
        const rsvps = await Rsvp.find({}).populate('eventId', 'title').populate('userId', 'email');
        res.json(rsvps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updateRsvp = async(req, res) => {
     const { status } = req.body;
    try {
        const rsvp = await Rsvp.findById(req.params.id);
        if (rsvp) {
            rsvp.status = status;
            const updatedRsvp = await rsvp.save();
            res.json({ message: 'RSVP status updated', status: updatedRsvp.status });
        } else {
            res.status(404).json({ message: 'RSVP not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  // Find the user by ID
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
    
  // Check if the user to be deleted is an admin
  if (user.role === 'admin') {
    res.status(403);
    throw new Error('Cannot delete an admin user');
  }

  // Use the correct static method on the User model
  await User.findByIdAndDelete(req.params.id);

  res.json({ message: 'User removed successfully' });
});


module.exports = {
    getAllAnalytics,
    getAllRsvp,
    updateRsvp,
    getUsers,
    deleteUser,
}