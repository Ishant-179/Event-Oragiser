// // src/pages/AdminDashboard.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, Routes, Route, Link } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';
// import MagicBento from '../components/MagicBento'; // Import MagicBento
// import AdminBentoCard from '../components/AdminBentoCard'; // Import AdminBentoCard

// // Admin Dashboard sub-pages
// import AnalyticsDashboard from './admin/AnalyticsDashboard';
// import AdminEventList from './admin/AdminEventList';
// import RsvpManagement from './admin/RsvpManagement';

// // Admin Dashboard main component
// const AdminDashboard = () => {
//     const { isAdmin, isAuthReady } = useContext(AuthContext);
//     const navigate = useNavigate();

//     // Define card data for the MagicBento component
//     const adminCardData = [
//         {
//             title: "Analytics",
//             description: "View key metrics, user statistics, and event distribution.",
//             label: "Insights",
//             to: "/admin-dashboard/analytics"
//         },
//         {
//             title: "Manage Events",
//             description: "Create, edit, and delete events. Oversee all event listings.",
//             label: "Events",
//             to: "/admin-dashboard/events"
//         },
//         {
//             title: "Manage RSVPs",
//             description: "Review and manage RSVP requests for all events.",
//             label: "RSVPs",
//             to: "/admin-dashboard/rsvps"
//         },
//     ];

//     useEffect(() => {
//         if (isAuthReady && !isAdmin) {
//             toast.error("Access Denied: You must be an admin to view this page.");
//             navigate('/home');
//         }
//     }, [isAuthReady, isAdmin, navigate]);

//     if (!isAuthReady || !isAdmin) {
//         return <LoadingSpinner />;
//     }

//     return (
//         // Main container for the Admin Dashboard with a consistent, slightly transparent dark background
//         // This creates a clear, professional section for the dashboard content, floating above the global background.
//         <div className="container mx-auto p-6 min-h-screen mt-4 max-w-7xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
//             <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Admin Dashboard</h1>

//             {/* MagicBento Grid for Admin Sections - These are your navigation options */}
//             <div className="mb-12">
//                 <MagicBento
//                     cardData={adminCardData.map(card => ({
//                         ...card,
//                         onClick: () => navigate(card.to) // Add onClick handler for navigation
//                     }))}
//                     textAutoHide={true}
//                     enableStars={true}
//                     enableSpotlight={true}
//                     enableBorderGlow={true}
//                     enableTilt={true}
//                     enableMagnetism={true}
//                     clickEffect={true}
//                     spotlightRadius={300}
//                     particleCount={12}
//                     glowColor="34, 197, 94" // Green glow color
//                 />
//             </div>

//             {/* Nested Routes for Admin Dashboard Tabs - This is where the actual content of sub-dashboards appears */}
//             {/* This div itself will now contain the sub-page content (Analytics, Event List, RSVP Management) */}
//             <div className="mt-8"> 
//                 <Routes>
//                     <Route path="analytics" element={<AnalyticsDashboard />} />
//                     <Route path="events" element={<AdminEventList />} />
//                     <Route path="rsvps" element={<RsvpManagement />} />
//                     <Route path="/" element={<AnalyticsDashboard />} /> {/* Default sub-route */}
//                 </Routes>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;


// src/pages/AdminDashboard.jsx (Corrected for new layout)
// import React, { useEffect, useContext } from 'react';
// import { useNavigate, Routes, Route } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';
// import MagicBento from '../components/MagicBento';

// // Admin Dashboard sub-pages
// import AnalyticsDashboard from './admin/AnalyticsDashboard';
// import AdminEventList from './admin/AdminEventList';
// import RsvpManagement from './admin/RsvpManagement';
// import UserManagementPage from './UserManagementPage'; // <-- यहां UserManagementPage को इंपोर्ट करें

// // Admin Dashboard main component
// const AdminDashboard = () => {
//     const { isAdmin, isAuthReady } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const adminCardData = [
//         {
//             title: "Analytics",
//             description: "View key metrics, user statistics, and event distribution.",
//             label: "Insights",
//             to: "/admin/analytics"
//         },
//         {
//             title: "Manage Events",
//             description: "Create, edit, and delete events. Oversee all event listings.",
//             label: "Events",
//             to: "/admin/events"
//         },
//         {
//             title: "Manage RSVPs",
//             description: "Review and manage RSVP requests for all events.",
//             label: "RSVPs",
//             to: "/admin/rsvps"
//         },
//     ];

//     useEffect(() => {
//         if (isAuthReady && !isAdmin) {
//             toast.error("Access Denied: You must be an admin to view this page.");
//             navigate('/home');
//         }
//     }, [isAuthReady, isAdmin, navigate]);

//     if (!isAuthReady || !isAdmin) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <div className="container mx-auto p-6 min-h-screen mt-4 max-w-7xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
//             <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Admin Dashboard</h1>

//             <div className="mb-12">
//                 <MagicBento
//                     cardData={adminCardData.map(card => ({
//                         ...card,
//                         onClick: () => navigate(card.to)
//                     }))}
//                     textAutoHide={true}
//                     enableStars={true}
//                     enableSpotlight={true}
//                     enableBorderGlow={true}
//                     enableTilt={true}
//                     enableMagnetism={true}
//                     clickEffect={true}
//                     spotlightRadius={300}
//                     particleCount={12}
//                     glowColor="34, 197, 94"
//                 />
//             </div>

//             {/* User Management Page को हमेशा दिखाने के लिए */}
//             <div className="mt-8">
//                 <UserManagementPage />
//             </div>

//             {/* Nested Routes for other admin pages */}
//             <div className="mt-8">
//                 <Routes>
//                     <Route path="analytics" element={<AnalyticsDashboard />} />
//                     <Route path="events" element={<AdminEventList />} />
//                     <Route path="rsvps" element={<RsvpManagement />} />
//                     {/* Default route की अब जरूरत नहीं है, क्योंकि UserManagementPage हमेशा दिखेगा */}
//                 </Routes>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;




// import React, { useEffect, useContext } from 'react';
// import { useNavigate, Routes, Route } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';
// import MagicBento from '../components/MagicBento';

// // Admin Dashboard sub-pages
// import AnalyticsDashboard from './admin/AnalyticsDashboard';
// import AdminEventList from './admin/AdminEventList';
// import RsvpManagement from './admin/RsvpManagement';
// import UserManagementPage from './UserManagementPage'; // Naya component import kiya gaya hai

// // Admin Dashboard main component
// const AdminDashboard = () => {
//     const { isAdmin, isAuthReady } = useContext(AuthContext);
//     const navigate = useNavigate();

//     // MagicBento component ke liye card data
//     const adminCardData = [
//         {
//             title: "Analytics",
//             description: "View key metrics, user statistics, and event distribution.",
//             label: "Insights",
//             to: "/admin/analytics"
//         },
//         {
//             title: "Manage Events",
//             description: "Create, edit, and delete events. Oversee all event listings.",
//             label: "Events",
//             to: "/admin/events"
//         },
//         {
//             title: "Manage RSVPs",
//             description: "Review and manage RSVP requests for all events.",
//             label: "RSVPs",
//             to: "/admin/rsvps"
//         },
//         {
//             title: "Manage Users", // User Management ke liye naya card
//             description: "View, manage, and edit user accounts and roles.",
//             label: "Users",
//             to: "/admin/users"
//         },
//     ];

//     useEffect(() => {
//         if (isAuthReady && !isAdmin) {
//             toast.error("Access Denied: You must be an admin to view this page.");
//             navigate('/home');
//         }
//     }, [isAuthReady, isAdmin, navigate]);

//     if (!isAuthReady || !isAdmin) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <div className="container mx-auto p-6 min-h-screen mt-4 max-w-7xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
//             <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Admin Dashboard</h1>

//             <div className="mb-12">
//                 <MagicBento
//                     cardData={adminCardData.map(card => ({
//                         ...card,
//                         onClick: () => navigate(card.to)
//                     }))}
//                     textAutoHide={true}
//                     enableStars={true}
//                     enableSpotlight={true}
//                     enableBorderGlow={true}
//                     enableTilt={true}
//                     enableMagnetism={true}
//                     clickEffect={true}
//                     spotlightRadius={300}
//                     particleCount={12}
//                     glowColor="34, 197, 94"
//                 />
//             </div>

//             {/* Admin sub-pages ke liye Nested Routes - ab users bhi shamil hai */}
//             <div className="mt-8">
//                 <Routes>
//                     <Route path="analytics" element={<AnalyticsDashboard />} />
//                     <Route path="events" element={<AdminEventList />} />
//                     <Route path="rsvps" element={<RsvpManagement />} />
//                     <Route path="users" element={<UserManagementPage />} /> {/* Naya user management route */}
//                     <Route path="/" element={<AnalyticsDashboard />} />
//                 </Routes>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;




// import React, { useEffect, useContext } from 'react';
// import { useNavigate, Routes, Route } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';
// import MagicBento from '../components/MagicBento';

// // Admin Dashboard sub-pages
// import AnalyticsDashboard from './admin/AnalyticsDashboard';
// import AdminEventList from './admin/AdminEventList';
// import AdminEditEvent from './admin/AdminEditEvent'; // Naya component import kiya gaya hai
// import RsvpManagement from './admin/RsvpManagement';
// import UserManagementPage from './UserManagementPage';

// // Admin Dashboard main component
// const AdminDashboard = () => {
//     const { isAdmin, isAuthReady } = useContext(AuthContext);
//     const navigate = useNavigate();

//     // MagicBento component ke liye card data
//     const adminCardData = [
//         {
//             title: "Analytics",
//             description: "View key metrics, user statistics, and event distribution.",
//             label: "Insights",
//             to: "/admin/analytics"
//         },
//         {
//             title: "Manage Events",
//             description: "Create, edit, and delete events. Oversee all event listings.",
//             label: "Events",
//             to: "/admin/events"
//         },
//         {
//             title: "Manage RSVPs",
//             description: "Review and manage RSVP requests for all events.",
//             label: "RSVPs",
//             to: "/admin/rsvps"
//         },
//         {
//             title: "Manage Users",
//             description: "View, manage, and edit user accounts and roles.",
//             label: "Users",
//             to: "/admin/users"
//         },
//     ];

//     useEffect(() => {
//         if (isAuthReady && !isAdmin) {
//             toast.error("Access Denied: You must be an admin to view this page.");
//             navigate('/home');
//         }
//     }, [isAuthReady, isAdmin, navigate]);

//     if (!isAuthReady || !isAdmin) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <div className="container mx-auto p-6 min-h-screen mt-4 max-w-7xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
//             <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Admin Dashboard</h1>

//             <div className="mb-12">
//                 <MagicBento
//                     cardData={adminCardData.map(card => ({
//                         ...card,
//                         onClick: () => navigate(card.to)
//                     }))}
//                     textAutoHide={true}
//                     enableStars={true}
//                     enableSpotlight={true}
//                     enableBorderGlow={true}
//                     enableTilt={true}
//                     enableMagnetism={true}
//                     clickEffect={true}
//                     spotlightRadius={300}
//                     particleCount={12}
//                     glowColor="34, 197, 94"
//                 />
//             </div>

//             {/* Admin sub-pages ke liye Nested Routes. 'events' route ke andar ab uske sub-routes hain */}
//             <div className="mt-8">
//                 <Routes>
//                     <Route path="analytics" element={<AnalyticsDashboard />} />
//                     <Route path="rsvps" element={<RsvpManagement />} />
//                     <Route path="users" element={<UserManagementPage />} />

//                     {/* Events management ke liye nested routes */}
//                     <Route path="events/*" element={
//                       <Routes>
//                         <Route path="/" element={<AdminEventList />} />
//                         <Route path="edit-event/:id" element={<AdminEditEvent />} />
//                       </Routes>
//                     } />
                    
//                     <Route path="/" element={<AnalyticsDashboard />} />
//                 </Routes>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;





// import React, { useEffect, useContext } from 'react';
// import { useNavigate, Routes, Route } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';
// import MagicBento from '../components/MagicBento';

// // Admin Dashboard sub-pages
// import AnalyticsDashboard from './admin/AnalyticsDashboard';
// import AdminEventList from './admin/AdminEventList';
// import AdminEditEvent from './admin/AdminEditEvent';
// import CreateEventPage from './CreateEventPage'; // Naya component import kiya gaya hai
// import RsvpManagement from './admin/RsvpManagement';
// import UserManagementPage from './UserManagementPage';

// // Admin Dashboard main component
// const AdminDashboard = () => {
//     const { isAdmin, isAuthReady } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const adminCardData = [
//         {
//             title: "Analytics",
//             description: "View key metrics, user statistics, and event distribution.",
//             label: "Insights",
//             to: "/admin/analytics"
//         },
//         {
//             title: "Manage Events",
//             description: "Create, edit, and delete events. Oversee all event listings.",
//             label: "Events",
//             to: "/admin/events"
//         },
//         {
//             title: "Manage RSVPs",
//             description: "Review and manage RSVP requests for all events.",
//             label: "RSVPs",
//             to: "/admin/rsvps"
//         },
//         {
//             title: "Manage Users",
//             description: "View, manage, and edit user accounts and roles.",
//             label: "Users",
//             to: "/admin/users"
//         },
//     ];

//     useEffect(() => {
//         if (isAuthReady && !isAdmin) {
//             toast.error("Access Denied: You must be an admin to view this page.");
//             navigate('/home');
//         }
//     }, [isAuthReady, isAdmin, navigate]);

//     if (!isAuthReady || !isAdmin) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <div className="container mx-auto p-6 min-h-screen mt-4 max-w-7xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
//             <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Admin Dashboard</h1>

//             <div className="mb-12">
//                 <MagicBento
//                     cardData={adminCardData.map(card => ({
//                         ...card,
//                         onClick: () => navigate(card.to)
//                     }))}
//                     textAutoHide={true}
//                     enableStars={true}
//                     enableSpotlight={true}
//                     enableBorderGlow={true}
//                     enableTilt={true}
//                     enableMagnetism={true}
//                     clickEffect={true}
//                     spotlightRadius={300}
//                     particleCount={12}
//                     glowColor="34, 197, 94"
//                 />
//             </div>

//             <div className="mt-8">
//                 <Routes>
//                     <Route path="analytics" element={<AnalyticsDashboard />} />
//                     <Route path="rsvps" element={<RsvpManagement />} />
//                     <Route path="users" element={<UserManagementPage />} />

//                     {/* Events management ke liye nested routes */}
//                     <Route path="events/*" element={
//                         <Routes>
//                             <Route path="/" element={<AdminEventList />} />
//                             <Route path="create-event" element={<CreateEventPage />} /> 
//                             <Route path="edit-event/:id" element={<AdminEditEvent />} />
//                         </Routes>
//                     } />
                    
//                     <Route path="/" element={<AnalyticsDashboard />} />
//                 </Routes>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;



import React, { useEffect, useContext } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import MagicBento from '../components/MagicBento';

// Admin Dashboard sub-pages
import AnalyticsDashboard from './admin/AnalyticsDashboard';
import AdminEventList from './admin/AdminEventList';
import AdminEditEvent from './admin/AdminEditEvent';
import CreateEventPage from './CreateEventPage';
import RsvpManagement from './admin/RsvpManagement';
import UserManagementPage from './UserManagementPage';

// Admin Dashboard main component
const AdminDashboard = () => {
    const { isAdmin, isAuthReady } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Admin card data - Users card removed, but Analytics, Events, RSVPs cards remain
    const adminCardData = [
        {
            title: "Analytics",
            description: "View key metrics, user statistics, and event distribution.",
            label: "Insights",
            to: "/admin/analytics"
        },
        {
            title: "Manage Events",
            description: "Create, edit, and delete events. Oversee all event listings.",
            label: "Events",
            to: "/admin/events"
        },
        {
            title: "Manage RSVPs",
            description: "Review and manage RSVP requests for all events.",
            label: "RSVPs",
            to: "/admin/rsvps"
        }
    ];

    // Check if we're on the main admin dashboard page (not on sub-pages)
    const isMainDashboard = location.pathname === '/admin' || 
                           location.pathname === '/admin/' || 
                           location.pathname === '/admin/dashboard' ||
                           location.pathname.endsWith('/admin/dashboard');

    useEffect(() => {
        if (isAuthReady && !isAdmin) {
            toast.error("Access Denied: You must be an admin to view this page.");
            navigate('/home');
        }
    }, [isAuthReady, isAdmin, navigate]);

    if (!isAuthReady || !isAdmin) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto p-6 min-h-screen mt-4 max-w-7xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
            <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Admin Dashboard</h1>

            {/* Always show cards - cards will be visible on all admin pages */}
            <div className="mb-12">
                <MagicBento
                    cardData={adminCardData.map(card => ({
                        ...card,
                        onClick: () => navigate(card.to)
                    }))}
                    textAutoHide={true}
                    enableStars={true}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    clickEffect={true}
                    spotlightRadius={300}
                    particleCount={12}
                    glowColor="34, 197, 94"
                />
            </div>

            <div className="mt-8">
                <Routes>
                    <Route path="analytics" element={<AnalyticsDashboard />} />
                    <Route path="rsvps" element={<RsvpManagement />} />

                    {/* Events management ke liye nested routes */}
                    <Route path="events/*" element={
                        <Routes>
                            <Route path="/" element={<AdminEventList />} />
                            <Route path="create-event" element={<CreateEventPage />} /> 
                            <Route path="edit-event/:id" element={<AdminEditEvent />} />
                        </Routes>
                    } />
                    
                    {/* Default routes - show UserManagementPage below cards */}
                    <Route path="/" element={<UserManagementPage />} />
                    <Route path="dashboard" element={<UserManagementPage />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;