
const User = require("../models/user")


const getProfile = async (req, res) => {
    try {
        // Find the user by their ID from the token, excluding the password
        const user = await User.findById(req.user._id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        res.json(user); // Send the user data as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// const getProfile = asyncHandler(async (req, res) => {
//   // `protect` middleware attaches `req.user`
//   const user = await User.findById(req.user._id).select('-password');
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });


module.exports = { getProfile }