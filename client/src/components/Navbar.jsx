// src/components/Navbar.jsx
// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; // Corrected import path
// import Particles from './Particles'; // Import the Particles component
// import { Icons } from './ui/Icons'; // Import Icons for the logo

// // Navigation bar component
// const Navbar = () => {
//     const { currentUser, isAdmin, logout } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//         await logout();
//         navigate('/login'); // Redirect to login page after logout
//     };

//     return (
//         // Main container for the Navbar, relative positioning for particles
//         <nav className="relative w-full p-4 shadow-lg rounded-b-xl overflow-hidden z-10"
//              style={{ background: '#1a1a2e' }}> {/* Solid dark background to match the image */}
//             {/* Particles background for the Navbar */}
//             <div className="absolute inset-0 z-0">
//                 {/* Adjust Particles props to create a subtle, starry background */}
//                 <Particles
//                     particleColors={['#FFFFFF']} // White particles for starry effect
//                     particleCount={200} // Increased particles for denser stars
//                     particleSpread={100} // Increased spread to cover more area
//                     speed={0.02} // Very slow speed for subtle movement
//                     particleBaseSize={1} // Very small particles for star-like appearance
//                     moveParticlesOnHover={true}
//                     alphaParticles={true} // Enable alpha for subtle effect
//                     disableRotation={true} // No rotation for Navbar particles
//                 />
//             </div>

//             {/* Navbar content, positioned on top of particles */}
//             <div className="container mx-auto flex justify-between items-center relative z-10"> {/* z-10 to keep content above particles */}
//                 <Link to="/home" className="text-white text-3xl font-bold tracking-wider cursor-pointer flex items-center gap-2">
//                     <Icons.logo className="w-8 h-8 text-white" /> {/* Use the imported logo icon */}
//                     EventFlow
//                 </Link>
//                 <div className="flex space-x-6 items-center">
//                     <Link
//                         to="/home"
//                         className="text-white hover:text-gray-300 text-lg font-medium transition duration-300 ease-in-out"
//                     >
//                         Home
//                     </Link>
//                     <Link
//                         to="/events"
//                         className="text-white hover:text-gray-300 text-lg font-medium transition duration-300 ease-in-out"
//                     >
//                         Events
//                     </Link>
//                     {isAdmin && (
//                         <Link
//                             to="/admin-dashboard"
//                             className="text-white hover:text-gray-300 text-lg font-medium transition duration-300 ease-in-out"
//                         >
//                             Admin
//                         </Link>
//                     )}
//                     {currentUser ? (
//                         <button
//                             className="text-white hover:text-gray-300 px-4 py-2 rounded-lg transition duration-300 ease-in-out font-semibold"
//                             onClick={handleLogout}
//                         >
//                             Logout ({currentUser.email ? currentUser.email.substring(0, 5) : ''}...)
//                         </button>
//                     ) : (
//                         <Link
//                             to="/login"
//                             className="text-white hover:text-gray-300 px-4 py-2 rounded-lg transition duration-300 ease-in-out font-semibold"
//                         >
//                             Login
//                         </Link>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, LogOut, User, LayoutDashboard, Calendar, Home, Info, DoorOpen, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser, logout, isAuthReady } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("Successfully logged out!");
        navigate('/login');
    };

    const navLinks = [
        { path: '/', name: 'Home', icon: <Home className="h-5 w-5" /> },
        { path: '/events', name: 'Events', icon: <Calendar className="h-5 w-5" /> },
        { path: '/about', name: 'About', icon: <Info className="h-5 w-5" /> },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (!isAuthReady) {
        return null; // Or a loading spinner if you prefer
    }

    return (
        <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo and Brand */}
                <div className="flex items-center">
                    <NavLink to="/" className="text-2xl font-bold text-green-400">
                        Event<span className="text-white">Hub</span>
                    </NavLink>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-2 transition-colors duration-300 ${
                                    isActive
                                        ? 'text-green-400 font-semibold'
                                        : 'text-gray-300 hover:text-green-400'
                                }`
                            }
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </NavLink>
                    ))}

                    {/* Conditional rendering for authenticated and guest users */}
                    {currentUser ? (
                        <>
                            <NavLink
                                to="/my-events"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 transition-colors duration-300 ${
                                        isActive
                                            ? 'text-green-400 font-semibold'
                                            : 'text-gray-300 hover:text-green-400'
                                    }`
                                }
                            >
                                <Calendar className="h-5 w-5" />
                                <span>My Events</span>
                            </NavLink>
                            {currentUser.role === 'admin' && (
                                <NavLink
                                    to="/admin/dashboard"
                                    className={({ isActive }) =>
                                        `flex items-center space-x-2 transition-colors duration-300 ${
                                            isActive
                                                ? 'text-green-400 font-semibold'
                                                : 'text-gray-300 hover:text-green-400'
                                        }`
                                    }
                                >
                                    <LayoutDashboard className="h-5 w-5" />
                                    <span>Dashboard</span>
                                </NavLink>
                            )}
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 transition-colors duration-300 ${
                                        isActive
                                            ? 'text-green-400 font-semibold'
                                            : 'text-gray-300 hover:text-green-400'
                                    }`
                                }
                            >
                                <User className="h-5 w-5" />
                                <span>Profile</span>
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-300"
                            >
                                <LogOut className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 transition-colors duration-300 ${
                                        isActive
                                            ? 'text-green-400 font-semibold'
                                            : 'text-gray-300 hover:text-green-400'
                                    }`
                                }
                            >
                                <DoorOpen className="h-5 w-5" />
                                <span>Login</span>
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 transition-colors duration-300 ${
                                        isActive
                                            ? 'text-green-400 font-semibold'
                                            : 'text-gray-300 hover:text-green-400'
                                    }`
                                }
                            >
                                <UserPlus className="h-5 w-5" />
                                <span>Signup</span>
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        {isMenuOpen ? (
                            <X className="h-6 w-6 text-green-400" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 p-4 space-y-4">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={toggleMenu}
                            className={({ isActive }) =>
                                `flex items-center space-x-2 p-2 rounded-lg transition-colors duration-300 ${
                                    isActive
                                        ? 'bg-green-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700'
                                }`
                            }
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </NavLink>
                    ))}

                    {/* Conditional rendering for mobile */}
                    {currentUser ? (
                        <>
                            <NavLink
                                to="/my-events"
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 p-2 rounded-lg transition-colors duration-300 ${
                                        isActive
                                            ? 'bg-green-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700'
                                    }`
                                }
                            >
                                <Calendar className="h-5 w-5" />
                                <span>My Events</span>
                            </NavLink>
                            {currentUser.role === 'admin' && (
                                <NavLink
                                    to="/admin/dashboard"
                                    onClick={toggleMenu}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-2 p-2 rounded-lg transition-colors duration-300 ${
                                            isActive
                                                ? 'bg-green-600 text-white'
                                                : 'text-gray-300 hover:bg-gray-700'
                                        }`
                                    }
                                >
                                    <LayoutDashboard className="h-5 w-5" />
                                    <span>Dashboard</span>
                                </NavLink>
                            )}
                            <NavLink
                                to="/profile"
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 p-2 rounded-lg transition-colors duration-300 ${
                                        isActive
                                            ? 'bg-green-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700'
                                    }`
                                }
                            >
                                <User className="h-5 w-5" />
                                <span>Profile</span>
                            </NavLink>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    toggleMenu();
                                }}
                                className="flex items-center space-x-2 p-2 rounded-lg text-red-400 hover:bg-gray-700 w-full text-left"
                            >
                                <LogOut className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 p-2 rounded-lg transition-colors duration-300 ${
                                        isActive
                                            ? 'bg-green-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700'
                                    }`
                                }
                            >
                                <DoorOpen className="h-5 w-5" />
                                <span>Login</span>
                            </NavLink>
                            <NavLink
                                to="/signup"
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 p-2 rounded-lg transition-colors duration-300 ${
                                        isActive
                                            ? 'bg-green-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700'
                                    }`
                                }
                            >
                                <UserPlus className="h-5 w-5" />
                                <span>Signup</span>
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;