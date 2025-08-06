//     const mongoose = require("mongoose");
//     const dotenv = require("dotenv");
//     const User = require("./models/User"); // Assuming you have a User model
//     const Event = require("./models/event"); // Import the Event model
//     const { eventsData } = require("./data/event"); // Import your events JSON data
// const Rsvp = require("./models/rsvp");

//     dotenv.config();

//     // Connect to mongoose
//     mongoose.connect(process.env.MONGO_URI)
//       .then(() => console.log("MongoDB Connected for Seeding"))
//       .catch(err => console.error("MongoDB Connection Error:", err));

//     // Function to seed data
//     const seedData = async () => {
//         try {
//             // Clear existing data
//             // await Event.deleteMany(); // Clear existing events
//             // await User.deleteMany(); // Clear existing users

//             // Create a default admin user
//             const createdUser = await User.create({
//                 name: "Admin User",
//                 email: "admin@example.com",
//                 password: "password123", 
//                 role: "admin",
//             });

//             // Assign the default user ID to each event
//             const userID = createdUser._id;

//             const sampleEvents = eventsData.map((event) => {
//                 return { ...event, createdBy: userID };
//             });

//             // Insert the events into the database
//             await Event.insertMany(sampleEvents);

//             console.log("Event data seeded successfully");
//             process.exit();

//         } catch (error) {
//             console.error("Error seeding the data: ", error);
//             process.exit(1);
//         }
//     };

//     seedData();
    



const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User"); // Assuming you have a User model
const Event = require("./models/event"); // Import the Event model
const { eventsData } = require("./data/event"); // Import your events JSON data
const Rsvp = require("./models/rsvp"); // Assuming you have an Rsvp model

dotenv.config();

// Connect to mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected for Seeding"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Function to seed data
const seedData = async () => {
    try {
        // NOTE: Comment out or remove these lines if you DO NOT want to clear existing data
        // If you want a fresh start, uncomment these lines ONCE, run the seeder, then comment them again.
        // await Event.deleteMany(); // Clear existing events
        // await User.deleteMany(); // Clear existing users
        // await Rsvp.deleteMany(); // Clear existing RSVPs (if you want to reset them too)

        // Create a default admin user ONLY IF they don't already exist
        let adminUser = await User.findOne({ email: "admin@example.com" });
        if (!adminUser) {
            adminUser = await User.create({
                name: "Admin User",
                email: "admin@example.com",
                password: "password123",
                role: "admin",
            });
            console.log("Admin user created.");
        } else {
            console.log("Admin user already exists, skipping creation.");
        }

        // Assign the default user ID to each event
        const userID = adminUser._id;

        // Filter out events that might already exist to prevent duplicates
        // This is a basic check based on title. You might need a more robust check
        // depending on your event data and unique constraints.
        const existingEventTitles = (await Event.find({}, { title: 1 })).map(e => e.title);
        const newEventsToInsert = eventsData.filter(event => !existingEventTitles.includes(event.title));

        if (newEventsToInsert.length > 0) {
            const sampleEvents = newEventsToInsert.map((event) => {
                return { ...event, createdBy: userID };
            });

            // Insert the events into the database
            await Event.insertMany(sampleEvents);
            console.log(`${newEventsToInsert.length} new event(s) seeded successfully`);
        } else {
            console.log("No new events to seed.");
        }

        console.log("Seeding process completed.");
        process.exit();

    } catch (error) {
        console.error("Error seeding the data: ", error);
        process.exit(1);
    }
};

seedData();
