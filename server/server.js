// server.js
const dotenv = require('dotenv');

dotenv.config(); 

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');



connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(cors({
    origin: ["https://event-organiser-beige.vercel.app",
        "http://localhost:5173",
    ],  
    credentials: true
}));
// Yahan hum Express body-parser ki limit badha rahe hain taaki badi files upload ho sakein.
// isliye limit ko 50mb tak badha diya gaya hai.
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Routes import
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require("./routes/eventRoutes")
const rsvpRoutes = require('./routes/rsvpRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require("./routes/userRoutes")
const contentRoutes = require("./routes/contentRoutes")



// Routes
app.use('/api', userRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/rsvps', rsvpRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api', contentRoutes)


app.get('/', (req, res) => {
    res.send('Event Organizer API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
