// const User = require('../models/user');
// const jwt = require('jsonwebtoken');


// const generateToken = (id, email, isAdmin) => {
//     return jwt.sign({ userId: id, email, isAdmin }, process.env.JWT_SECRET, {
//         expiresIn: '7d',
//     });
// };


// const registerUser = async(req, res) => {
//     const {name, email, password } = req.body;
//     try{
//             let user = await User.findOne({ email })
//             if(user) return res.status(400).json({message: "User Already Exist"})

//                 user = new User({ name, email, password })
//                 await user.save()

//                 //create jwt payload
//                 const payload = { userId: user._id, email: user.email, role: user.role };

//                 // Sign and return the token along with user data
//                 jwt.sign(generateToken, (err, token) => {
//                     if (err) throw err;

//                     //send the user and token in response
//                     res.status(201).json({
//                         user: {
//                             _id: user._id,
//                             name: user.name,
//                             email: user.email,
//                             role: user.role,
//                         },
//                         token,
//                     })
//                 }) 
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }


// const loginUser = async(req, res) => {
//      const { email, password } = req.body;
//    try {
//         let user = await User.findOne({ email })

//         if (!user) return res.status(400).json({ message: "Invalid Credientials" })
//             const isMatch = await user.matchPassword(password);

//         if(!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

//           //create jwt payload
//                 const payload = { userId: user._id, email: user.email, role: user.role  };

//                 // Sign and return the token along with user data
//                 jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" }, (err, token) => {
//                     if (err) throw err;

//                     //send the user and token in response
//                     res.json({
//                         user: {
//                             _id: user._id,
//                             name: user.name,
//                             email: user.email,
//                             role: user.role,
//                         },
//                         token,
//                     })
//                 })
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }



// module.exports = {
//     registerUser,
//     loginUser
// }



// const User = require('../models/user');
// const jwt = require('jsonwebtoken');


// const registerUser = async (req, res) => {
//     const { name, email, password } = req.body;

//     try{
//             let user = await User.findOne({ email })
//             if(user) return res.status(400).json({message: "User Already Exist"})

//                 user = new User({ name, email, password })
//                 await user.save()

//                 //create jwt payload
//                 const payload = { user: { id: user._id, role: user.role } };

//                 // Sign and return the token along with user data
//                 jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" }, (err, token) => {
//                     if (err) throw err;

//                     //send the user and token in response
//                     res.status(201).json({
//                         user: {
//                             _id: user._id,
//                             name: user.name,
//                             email: user.email,
//                             role: user.role,
//                         },
//                         token,
//                     })
//                 }) 

//     } catch(err)
//     {
//         console.log(err)
//         res.status(500).send("Server Error");
//     }
// }


// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         let user = await User.findOne({ email })

//         if (!user) return res.status(400).json({ message: "Invalid Credientials" })
//             const isMatch = await user.matchPassword(password);

//         if(!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

//           //create jwt payload
//                 const payload = { user: { id: user._id, role: user.role } };

//                 // Sign and return the token along with user data
//                 jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" }, (err, token) => {
//                     if (err) throw err;

//                     //send the user and token in response
//                     res.json({
//                         user: {
//                             _id: user._id,
//                             name: user.name,
//                             email: user.email,
//                             role: user.role,
//                         },
//                         token,
//                     })
//                 }) 
//     } catch(err) {
//         console.error(err)
//         res.status(500).send("server error")
//     }
// }


// module.exports = {
//     registerUser,
//     loginUser
// }




const User = require('../models/user');
const jwt = require('jsonwebtoken');


const generateToken = (id, email, role) => { 
    return jwt.sign({ id: id, email, role: role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};


const registerUser = async(req, res) => {
    const {name, email, password } = req.body;
    try{
        let user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({ message: "User Already Exist" });
        }

 
        user = new User({ name, email, password });
        await user.save(); 


        const token = generateToken(user._id, user.email, user.role); 


        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, 
            token,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: error.message || "Server Error during registration." });
    }
}


const loginUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

      
        const payload = { id: user._id, email: user.email, name: user.name, role: user.role };

       
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" }, (err, token) => {
            if (err) {
                console.error("JWT sign error during login:", err);
                return res.status(500).json({ message: "Token generation failed." });
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            });
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: error.message || "Server Error during login." });
    }
}


module.exports = {
    registerUser,
    loginUser
}

