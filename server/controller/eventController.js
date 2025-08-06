// const Event = require('../models/event');
// const Rsvp = require('../models/rsvp')
// const asyncHandler = require('express-async-handler');
// const { upload } = require('../utils/cloudinary'); 


// const getAllEvent = asyncHandler(async(req, res) => {
//      try {
//         const events = await Event.find({ privacy: 'Public' }).sort({ startDate: 1, startTime: 1 });
//         res.json(events);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })


// const getEventById = async(req, res) => {
//      try {
//         const event = await Event.findById(req.params.id);
//         if (event) {
//             res.json(event);
//         } else {
//             res.status(404).json({ message: 'Event not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }


// // @desc    Get all events for the logged-in user
// // @route   GET /api/events/my-events
// // @access  Private
// const getMyEvents = async (req, res) => {
//     try {
//         const userId = req.user._id;

//         // Find all RSVPs for the current user
//         const rsvps = await Rsvp.find({ user: userId });

//         // Extract event IDs from the RSVPs
//         const eventIds = rsvps.map(rsvp => rsvp.event);

//         // Find all events that match these IDs
//         const myEvents = await Event.find({ _id: { $in: eventIds } });

//         if (myEvents.length > 0) {
//             res.json(myEvents);
//         } else {
//             res.json([]);
//         }
//     } catch (error) {
//         console.error("Error fetching user's events:", error);
//         res.status(500).json({ message: 'Server error: ' + error.message });
//     }
// };


// const createEvent = asyncHandler(async (req, res) => {
//     // files upload karne ke liye Multer middleware ko yahan use karein
        
//         const { title, description, privacy, medium, startDate, startTime, endDate, endTime, category, attendees, speakers, workshops, location, price } = req.body;

//         // Get uploaded file URLs from Cloudinary
//         const imageUrl = req.files && req.files['image'] ? req.files['image'][0].path : 'https://placehold.co/600x400/E0E0E0/333333?text=Event+Image';
//         const bannerUrl = req.files && req.files['banner'] ? req.files['banner'][0].path : 'https://placehold.co/1200x400/E0E0E0/333333?text=Event+Banner';

//         // Basic validation
//         if (!title || !description || !startDate || !startTime || !endDate || !endTime) {
//             res.status(400);
//             throw new Error('Please fill in all required fields.');
//         }

//         try {
//             const event = new Event({
//                 title, description, privacy, medium, startDate, startTime, endDate, endTime, category, attendees, speakers, workshops, location, price,
//                 imageUrl, bannerUrl,
//                 createdBy: req.user._id // Set the creator to the logged-in admin
//             });

//             const createdEvent = await event.save();
//             res.status(201).json(createdEvent);
//         } catch (error) {
//             res.status(400);
//             throw new Error(error.message);
//         }
//     });


// const deleteEvent = async(req, res) => {
//     try {
//         const event = await Event.findById(req.params.id);
//         if (event) {
//             await event.deleteOne(); // Use deleteOne() for Mongoose 6+
//             res.json({ message: 'Event removed' });
//         } else {
//             res.status(404).json({ message: 'Event not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }


// module.exports = {
//     getAllEvent,
//     createEvent,
//     deleteEvent,
//     getEventById,
//     getMyEvents
// }





// const getEventById = async(req, res) => {
//      try {
//         const data = fs.readFileSync(DUMMY_EVENTS_FILE, 'utf8');
//         const events = JSON.parse(data);
        
//         // Find the event with the matching ID
//         const event = events.find(e => e._id === req.params.id);

//         if (event) {
//             res.json(event);
//         } else {
//             res.status(404).json({ message: 'Event not found in dummy data' });
//         }
//     } catch (error) {
//         console.error("Error fetching event by ID from JSON:", error);
//         res.status(500).json({ message: 'Server error: ' + error.message });
//     }
// }


// const getEvents = asyncHandler(async(req, res) => {
//   fs.readFile(DUMMY_EVENTS_FILE, 'utf8', (err, data) => {
//         if (err) {
//             console.error("Error reading events file:", err);
//             return res.status(500).json({ message: 'Error reading events file', error: err });
//         }
//         try {
//             const events = JSON.parse(data);
//             res.status(200).json(events);
//         } catch (parseErr) {
//             console.error("Error parsing JSON:", parseErr);
//             res.status(500).json({ message: 'Error parsing JSON', error: parseErr });
//         }
//     });
// }
// );


// const path = require('path');
// const fs = require('fs');



// Path to the dummy data file
// const DUMMY_EVENTS_FILE = path.join(__dirname, '../data/events.json');







// const Event = require('../models/event');
// const Rsvp = require('../models/rsvp');
// const asyncHandler = require('express-async-handler');
// const { cloudinary } = require('../utils/cloudinary'); // Cloudinary object ko import karein
// const streamifier = require('streamifier'); 



// const getAllEvent = asyncHandler(async(req, res) => {
//     try {
//         const events = await Event.find({ privacy: 'Public' }).sort({ startDate: 1, startTime: 1 });
//         res.json(events);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });



// const getEventById = async(req, res) => {
//     try {
//         const event = await Event.findById(req.params.eventId);
//         if (event) {
//             res.json(event);
//         } else {
//             res.status(404).json({ message: 'Event not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



// // @desc    Get all events for the logged-in user
// // @route   GET /api/events/my-events
// // @access  Private
// const getMyEvents = asyncHandler(async (req, res) => {
//     try {
//         const userId = req.user._id;

         
//         console.log('Fetching events for userId:', userId);

//          if (!userId) {
//             console.log('User ID not found in request. User may not be logged in.');
//             return res.status(401).json({ message: 'Not authorized, please log in.' });
//         }
       
//         const rsvps = await Rsvp.find({ user: userId }).populate('event');



//         console.log('Found RSVPs:', rsvps);

//        const myEvents = rsvps.map(rsvp => {

//         if (rsvp.event) {
//             return {
//                 ...rsvp.event.toObject(), // Spread the event data
//                 rsvp: {
//                     _id: rsvp._id,
//                     status: rsvp.status // Add the RSVP status from the Rsvp document
//                 }
//             };
//         }
//         return null;
//     }).filter(event => event !== null);

//             console.log('API is sending back:', myEvents); 
//             res.status(201).json(myEvents);
//     } catch (error) {
//         console.error("Error fetching user's events:", error);
//         res.status(500).json({ message: 'Server error: ' + error.message });
//     }
// });

// const uploadToCloudinary = (fileBuffer, folder) => {
//     return new Promise((resolve, reject) => {
//         const cld_upload_stream = cloudinary.uploader.upload_stream(
//             { folder: folder },
//             (error, result) => {
//                 if (error) {
//                     return reject(error);
//                 }
//                 resolve(result);
//             }
//         );
//         streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
//     });
// };

// const createEvent = asyncHandler(async (req, res) => {
//     const { title, description, privacy, medium, startDate, startTime, endDate, endTime, category, attendees, speakers, workshops, location, price } = req.body;

//     // Basic validation: Yeh check karta hai ki sabhi zaroori fields bhare hain ya nahi
//     if (!title || !description || !startDate || !startTime || !endDate || !endTime) {
//         res.status(400);
//         throw new Error('Please fill in all required fields.');
//     }

//     try {
//         // Files ko Cloudinary par upload karein
//         let imageUrl = 'https://placehold.co/600x400/E0E0E0/333333?text=Event+Image';
//         let bannerUrl = 'https://placehold.co/1200x400/E0E0E0/333333?text=Event+Banner';

//         if (req.files && req.files['image']) {
//             const imageResult = await uploadToCloudinary(req.files['image'][0].buffer, 'event-images');
//             imageUrl = imageResult.secure_url;
//         }

//         if (req.files && req.files['banner']) {
//             const bannerResult = await uploadToCloudinary(req.files['banner'][0].buffer, 'event-banners');
//             bannerUrl = bannerResult.secure_url;
//         }

//         const event = new Event({
//             title, description, privacy, medium, startDate, startTime, endDate, endTime, category, attendees, speakers, workshops, location, price,
//             imageUrl, bannerUrl,
//             createdBy: req.user._id // Set the creator to the logged-in admin
//         });

//         const createdEvent = await event.save();
//         res.status(201).json(createdEvent);
//     } catch (error) {
//         console.error("Error creating event:", error);
//         res.status(400).json({ message: error.message });
//     }
// });

// const deleteEvent = async(req, res) => {
//     try {
//         const event = await Event.findById(req.params.id);
//         if (event) {
//             await event.deleteOne(); // Use deleteOne() for Mongoose 6+
//             res.json({ message: 'Event removed' });
//         } else {
//             res.status(404).json({ message: 'Event not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// const updateEvent = async (req, res) => {
//     try {
//         const deletedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
//         if (!deletedEvent) {
//             return res.status(404).json({ message: 'Event not found.' });
//         }
//         res.json({ message: 'Event deleted successfully.' });
//     } catch (err) {
//         console.error('Error deleting event:', err);
//         res.status(500).json({ message: 'Error deleting event.' });
//     }
// }

// module.exports = {
//     createEvent,
//     deleteEvent,
//     getEventById,
//     getMyEvents,
//     updateEvent,
//     getAllEvent
// };





const Event = require('../models/event');
const Rsvp = require('../models/rsvp');
const asyncHandler = require('express-async-handler');
const { cloudinary } = require('../utils/cloudinary'); // Cloudinary object ko import karein
const streamifier = require('streamifier');


const getAllEvent = asyncHandler(async(req, res) => {
    try {
        const events = await Event.find({ privacy: 'Public' }).sort({ startDate: 1, startTime: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async(req, res) => {
    try {
        // req.params.id ka upyog karein taaki route parameter se match ho
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        // Server error ko 500 status code ke saath handle karein
        res.status(500).json({ message: error.message });
    }
};


// @desc    Get all events for the logged-in user
// @route   GET /api/events/my-events
// @access  Private
const getMyEvents = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        console.log('Fetching events for userId:', userId);

         if (!userId) {
            console.log('User ID not found in request. User may not be logged in.');
            return res.status(401).json({ message: 'Not authorized, please log in.' });
        }
        
        const rsvps = await Rsvp.find({ user: userId }).populate('event');

        console.log('Found RSVPs:', rsvps);

        const myEvents = rsvps.map(rsvp => {
            if (rsvp.event) {
                return {
                    ...rsvp.event.toObject(), // Spread the event data
                    rsvp: {
                        _id: rsvp._id,
                        status: rsvp.status // Add the RSVP status from the Rsvp document
                    }
                };
            }
            return null;
        }).filter(event => event !== null);

        console.log('API is sending back:', myEvents); 
        res.status(201).json(myEvents);
    } catch (error) {
        console.error("Error fetching user's events:", error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
});


const uploadToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        const cld_upload_stream = cloudinary.uploader.upload_stream(
            { folder: folder },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
    });
};

const createEvent = asyncHandler(async (req, res) => {
    const { title, description, privacy, medium, startDate, startTime, endDate, endTime, category, attendees, speakers, workshops, location, price } = req.body;

    // Basic validation: Yeh check karta hai ki sabhi zaroori fields bhare hain ya nahi
    if (!title || !description || !startDate || !startTime || !endDate || !endTime) {
        res.status(400);
        throw new Error('Please fill in all required fields.');
    }

    try {
        // Files ko Cloudinary par upload karein
        let imageUrl = 'https://placehold.co/600x400/E0E0E0/333333?text=Event+Image';
        let bannerUrl = 'https://placehold.co/1200x400/E0E0E0/333333?text=Event+Banner';

        if (req.files && req.files['image']) {
            const imageResult = await uploadToCloudinary(req.files['image'][0].buffer, 'event-images');
            imageUrl = imageResult.secure_url;
        }

        if (req.files && req.files['banner']) {
            const bannerResult = await uploadToCloudinary(req.files['banner'][0].buffer, 'event-banners');
            bannerUrl = bannerResult.secure_url;
        }

        const event = new Event({
            title, description, privacy, medium, startDate, startTime, endDate, endTime, category, attendees, speakers, workshops, location, price,
            imageUrl, bannerUrl,
            createdBy: req.user._id // Set the creator to the logged-in admin
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(400).json({ message: error.message });
    }
});


// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async(req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            await event.deleteOne(); // Use deleteOne() for Mongoose 6+
            res.json({ message: 'Event removed' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
    try {
        // Variable name ko theek kiya gaya aur new: true option add kiya gaya hai
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        // Success message ko update kiya gaya hai
        res.json({ message: 'Event updated successfully.', event: updatedEvent });
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ message: 'Error updating event.' });
    }
}

module.exports = {
    createEvent,
    deleteEvent,
    getEventById,
    getMyEvents,
    updateEvent,
    getAllEvent
};
