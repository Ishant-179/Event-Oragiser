// const Rsvp = require('../models/rsvp');
// const asyncHandler = require("express-async-handler");
// const Event = require("../models/event"); 

// const createRsvp = asyncHandler(async(req, res) => {
//     const { eventId } = req.body;
//     const userId = req.user._id;

//     if (!eventId) {
//         res.status(400);
//         throw new Error('Event ID is required.');
//     }

//     try {
        
//         const existingRsvp = await Rsvp.findOne({ eventId, userId });
//         if (existingRsvp) {
//             return res.status(400).json({ message: 'You have already RSVPd for this event.' });
//         }


//         const rsvp = new Rsvp({
//             eventId,
//             userId,
//             status: 'pending'
//         });

//         const createdRsvp = await rsvp.save();
//         res.status(201).json(createdRsvp);
//     } catch (error) {

//         console.error("Error creating RSVP:", error);
//         res.status(500).json({ message: error.message });
//     }
// });


// const checkRsvpById = asyncHandler(async(req, res) => {
//     try {
//         const rsvp = await Rsvp.findOne({ eventId: req.params.eventId, userId: req.user._id });
//         res.json({ hasRsvped: !!rsvp });
//     } catch (error) {
//         console.error("Error checking RSVP:", error);
//         res.status(500).json({ message: error.message });
//     }
// });


// const updateRsvpStatus = asyncHandler(async (req, res) => {
//     const { rsvpId } = req.params;
//     const { status } = req.body;

//     if (!['accepted', 'rejected', 'pending'].includes(status)) {
//         return res.status(400).json({ message: 'Invalid status provided.' });
//     }

//     try {
//         const updatedRsvp = await Rsvp.findByIdAndUpdate(
//             rsvpId,
//             { status: status },
//             { new: true, runValidators: true }
//         );

//         if (!updatedRsvp) {
//             return res.status(404).json({ message: 'RSVP not found.' });
//         }

//         res.status(200).json(updatedRsvp);
//     } catch (error) {
//         console.error("Error updating RSVP status:", error);
//         res.status(500).json({ message: error.message });
//     }
// });



// const getRsvpsForEvent = asyncHandler(async (req, res) => {
//     const { eventId } = req.params;

//     try {
//         const rsvps = await Rsvp.find({ eventId }).populate('userId', 'username email');
//         res.status(200).json(rsvps);
//     } catch (error) {
//         console.error("Error fetching RSVPs for event:", error);
//         res.status(500).json({ message: error.message });
//     }
// });


// module.exports = {
//     createRsvp,
//     checkRsvpById,
//     updateRsvpStatus,
//     getRsvpsForEvent
// };



const Rsvp = require('../models/rsvp');
const asyncHandler = require("express-async-handler");

const createRsvp = asyncHandler(async(req, res) => {
    const { eventId } = req.body;
    const userId = req.user._id;


    if (!eventId) {
        res.status(400);
        throw new Error('Event ID is required in request body.');
    }

    try {
  
        const existingRsvp = await Rsvp.findOne({ eventId, userId });
        if (existingRsvp) {
            return res.status(400).json({ message: 'You have already RSVPd for this event.' });
        }
  
        const rsvp = new Rsvp({
            eventId,
            userId,
            status: 'pending'
        });

        
        const createdRsvp = await rsvp.save();
        res.status(201).json(createdRsvp);
    } catch (error) {
        
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ message: 'You have already RSVPd for this event.' });
        } else {
            console.error("Error creating RSVP:", error);
            res.status(500).json({ message: error.message });
        }
    }
});


const checkRsvpById = asyncHandler(async(req, res) => {
    const { eventId } = req.params;
    
 
    if (!eventId) {
        res.status(400);
        throw new Error('Event ID is required in URL parameter.');
    }
    
    try {
        const rsvp = await Rsvp.findOne({ eventId, userId: req.user._id });
        res.json({ hasRsvped: !!rsvp });
    } catch (error) {
        console.error("Error checking RSVP status:", error);
        res.status(500).json({ message: error.message });
    }
});


const updateRsvpStatus = asyncHandler(async (req, res) => {
    const { rsvpId } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected', 'pending'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status provided.' });
    }

    try {
        const updatedRsvp = await Rsvp.findByIdAndUpdate(
            rsvpId,
            { status: status },
            { new: true, runValidators: true }
        );

        if (!updatedRsvp) {
            return res.status(404).json({ message: 'RSVP not found.' });
        }

        res.status(200).json(updatedRsvp);
    } catch (error) {
        console.error("Error updating RSVP status:", error);
        res.status(500).json({ message: error.message });
    }
});


const getRsvpsForEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    try {
        const rsvps = await Rsvp.find({ eventId }).populate('userId', 'username email');
        res.status(200).json(rsvps);
    } catch (error) {
        console.error("Error fetching RSVPs for event:", error);
        res.status(500).json({ message: error.message });
    }
});


module.exports = {
    createRsvp,
    checkRsvpById,
    updateRsvpStatus,
    getRsvpsForEvent
};
