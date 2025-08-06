// models/Rsvp.js
const mongoose = require('mongoose');

const RsvpSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // },
    // eventTitle: { // Denormalized for easier admin view
    //     type: String,
    //     required: true
    // },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// Ensure a user can only RSVP once per event
RsvpSchema.index({ eventId: 1, userId: 1 }, { unique: true });

const Rsvp = mongoose.model('Rsvp', RsvpSchema);
module.exports = Rsvp;
