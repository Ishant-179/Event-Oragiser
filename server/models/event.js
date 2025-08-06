// models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    privacy: {
        type: String,
        enum: ['Public', 'Private'],
        default: 'Public',
        required: true
    },
    medium: {
        type: String,
        enum: ['Online', 'In Person', 'offline'],
        default: 'In Person',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    category: { type: String, default: 'General' },
    attendees: { type: Number, default: 0 },
    speakers: { type: Number, default: 0 },
    workshops: { type: Number, default: 0 },
    imageUrl: { type: String, default: 'https://placehold.co/600x400/E0E0E0/333333?text=Event+Image' },
    location: { type: String, trim: true },
    price: { type: String, default: 'Free' },
    bannerUrl: { type: String, default: 'https://placehold.co/1200x400/E0E0E0/333333?text=Event+Banner' },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
