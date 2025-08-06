// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import EventCard from '../components/EventCard';
// import LoadingSpinner from '../components/LoadingSpinner';

// const API_BASE_URL = 'http://localhost:5000/api';

// const MyEventsPage = () => {
//     const { currentUser, isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Redirect to login if user is not authenticated and auth check is ready
//         if (isAuthReady && !currentUser) {
//             navigate('/login');
//             toast.error("Please log in to view your events.");
//             return;
//         }

//         if (currentUser) {
//             const fetchMyEvents = async () => {
//                 try {
//                     const headers = getAuthHeaders();
//                     const response = await fetch(`${API_BASE_URL}/events/my-events`, {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             ...headers
//                         },
//                     });

//                     const data = await response.json();

//                     if (response.ok) {
//                         setEvents(data);
//                     } else {
//                         setError(data.message || "Failed to fetch your events.");
//                         toast.error(data.message || "Failed to fetch your events.");
//                     }
//                 } catch (err) {
//                     console.error("Error fetching user's events:", err);
//                     setError("An error occurred while fetching your events.");
//                     toast.error("Server error. Could not load your events.");
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchMyEvents();
//         }
//     }, [currentUser, isAuthReady, getAuthHeaders, navigate]);

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
//                     <p className="text-xl font-bold mb-4">Error</p>
//                     <p>{error}</p>
//                 </div>
//             </div>
//         );
//     }
    
//     return (
//         <div className="container mx-auto p-8 min-h-screen">
//             <h2 className="text-4xl font-bold text-white mb-8 text-center">My Events</h2>
            
//             {events.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {events.map((event) => (
//                         <EventCard key={event._id} event={event} />
//                     ))}
//                 </div>
//             ) : (
//                 <div className="flex flex-col items-center justify-center text-center p-12 bg-gray-800 rounded-xl shadow-lg">
//                     <svg className="w-20 h-20 text-gray-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
//                     <p className="text-xl font-semibold text-white mb-2">No Events Found</p>
//                     <p className="text-gray-400">It looks like you haven't RSVP'd for any events yet. Browse our events to get started!</p>
//                     <button
//                         onClick={() => navigate('/events')}
//                         className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition duration-300"
//                     >
//                         Browse All Events
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyEventsPage;




// // src/pages/MyEventsPage.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import EventCard from '../components/EventCard';
// import LoadingSpinner from '../components/LoadingSpinner';

// const API_BASE_URL = 'http://localhost:5000/api';

// const MyEventsPage = () => {
//     const { currentUser, isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Redirect to login if user is not authenticated and auth check is ready
//         if (isAuthReady && !currentUser) {
//             navigate('/login');
//             toast.error("Please log in to view your events.");
//             return;
//         }

//         if (currentUser) {
//             const fetchMyEvents = async () => {
//                 try {
//                     const headers = getAuthHeaders();
//                     const response = await fetch(`${API_BASE_URL}/events/my-events`, {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             ...headers
//                         },
//                     });

//                     const data = await response.json();

//                     if (response.ok) {
//                         // Naya functionality: Sirf accepted events ko display karein
//                         // Is assumption par ki server RSVP status ke saath events data bhej raha hai
//                         const acceptedEvents = data.filter(event => event.rsvp && event.rsvp.status === 'accepted');
//                         setEvents(acceptedEvents);
//                     } else {
//                         setError(data.message || "Failed to fetch your events.");
//                         toast.error(data.message || "Failed to fetch your events.");
//                     }
//                 } catch (err) {
//                     console.error("Error fetching user's events:", err);
//                     setError("An error occurred while fetching your events.");
//                     toast.error("Server error. Could not load your events.");
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchMyEvents();
//         }
//     }, [currentUser, isAuthReady, getAuthHeaders, navigate]);

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
//                     <p className="text-xl font-bold mb-4">Error</p>
//                     <p>{error}</p>
//                     <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Browse All Events</button>
//                 </div>
//             </div>
//         );
//     }
    
//     return (
//         <div className="container mx-auto p-8 min-h-screen">
//             <h2 className="text-4xl font-bold text-white mb-8 text-center">My Accepted Events</h2>
            
//             {events.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {events.map((event) => (
//                         <EventCard key={event._id} event={event} />
//                     ))}
//                 </div>
//             ) : (
//                 <div className="flex flex-col items-center justify-center text-center p-12 bg-gray-800 rounded-xl shadow-lg">
//                     <svg className="w-20 h-20 text-gray-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
//                     <p className="text-xl font-semibold text-white mb-2">No Accepted Events Found</p>
//                     <p className="text-gray-400">You haven't been accepted to any events yet. Check back later or browse other events.</p>
//                     <button
//                         onClick={() => navigate('/events')}
//                         className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition duration-300"
//                     >
//                         Browse All Events
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyEventsPage;



// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import EventCard from '../components/EventCard';
// import LoadingSpinner from '../components/LoadingSpinner';

// const API_BASE_URL = 'http://localhost:5000/api';

// const MyEventsPage = () => {
//     const { currentUser, isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Redirect to login if user is not authenticated and auth check is ready
//         if (isAuthReady && !currentUser) {
//             navigate('/login');
//             toast.error("Please log in to view your events.");
//             return;
//         }

//         if (currentUser) {
//             const fetchMyEvents = async () => {
//                 try {
//                     const headers = getAuthHeaders();
//                     const response = await fetch(`${API_BASE_URL}/events/my-events`, {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             ...headers
//                         },
//                     });

//                     const data = await response.json();

//                     if (response.ok) {
//                         // Naya functionality: Sirf accepted aur pending events ko display karein
//                         // Is assumption par ki server RSVP status ke saath events data bhej raha hai
//                         const filteredEvents = data.filter(event => event.rsvp && (event.rsvp.status === 'accepted' || event.rsvp.status === 'pending'));
//                         setEvents(filteredEvents);
//                     } else {
//                         setError(data.message || "Failed to fetch your events.");
//                         toast.error(data.message || "Failed to fetch your events.");
//                     }
//                 } catch (err) {
//                     console.error("Error fetching user's events:", err);
//                     setError("An error occurred while fetching your events.");
//                     toast.error("Server error. Could not load your events.");
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchMyEvents();
//         }
//     }, [currentUser, isAuthReady, getAuthHeaders, navigate]);

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
//                     <p className="text-xl font-bold mb-4">Error</p>
//                     <p>{error}</p>
//                     <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Browse All Events</button>
//                 </div>
//             </div>
//         );
//     }
    
//     return (
//         <div className="container mx-auto p-8 min-h-screen">
//             <h2 className="text-4xl font-bold text-white mb-8 text-center">My RSVP'd Events</h2>
            
//             {events.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {events.map((event) => (
//                         <EventCard key={event._id} event={event} />
//                     ))}
//                 </div>
//             ) : (
//                 <div className="flex flex-col items-center justify-center text-center p-12 bg-gray-800 rounded-xl shadow-lg">
//                     <svg className="w-20 h-20 text-gray-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
//                     <p className="text-xl font-semibold text-white mb-2">No RSVP'd Events Found</p>
//                     <p className="text-gray-400">You haven't RSVP'd to any events yet. Check out our other events!</p>
//                     <button
//                         onClick={() => navigate('/events')}
//                         className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition duration-300"
//                     >
//                         Browse All Events
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyEventsPage;



// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import EventCard from '../components/EventCard';
// import LoadingSpinner from '../components/LoadingSpinner';

// const API_BASE_URL = 'http://localhost:5000/api';

// const MyEventsPage = () => {
//     const { currentUser, isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Redirect to login if user is not authenticated and auth check is ready
//         if (isAuthReady && !currentUser) {
//             navigate('/login');
//             toast.error("Please log in to view your events.");
//             return;
//         }

//         if (currentUser) {
//             const fetchMyEvents = async () => {
//                 try {
//                     const headers = getAuthHeaders();
//                     const response = await fetch(`${API_BASE_URL}/events/my-events`, {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             ...headers
//                         },
//                     });

//                     if (!response.ok) {
//                         const errorData = await response.json();
//                         throw new Error(errorData.message || "Failed to fetch your events.");
//                     }

//                     const data = await response.json();
                    
//                     // Debugging: API से मिला raw data कंसोल में लॉग करें।
//                     console.log("Raw API data received:", data);

//                     // Naya functionality: Sirf accepted aur pending events ko display karein
//                     // Yahan hum data ko filter kar rahe hain.
//                     const filteredEvents = data.filter(event => event.rsvp && (event.rsvp.status === 'accepted' || event.rsvp.status === 'pending'));
                    
//                     // Debugging: Filtered events कंसोल में लॉग करें।
//                     console.log("Filtered events to be displayed:", filteredEvents);

//                     setEvents(filteredEvents);
//                 } catch (err) {
//                     console.error("Error fetching user's events:", err);
//                     setError(err.message || "An error occurred while fetching your events.");
//                     toast.error(err.message || "Server error. Could not load your events.");
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchMyEvents();
//         }
//     }, [currentUser, isAuthReady, getAuthHeaders, navigate]);

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
//                     <p className="text-xl font-bold mb-4">Error</p>
//                     <p>{error}</p>
//                     <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Browse All Events</button>
//                 </div>
//             </div>
//         );
//     }
    
//     return (
//         <div className="container mx-auto p-8 min-h-screen">
//             <h2 className="text-4xl font-bold text-white mb-8 text-center">My RSVP'd Events</h2>
            
//             {events.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {events.map((event) => (
//                         <EventCard key={event._id} event={event} />
//                     ))}
//                 </div>
//             ) : (
//                 <div className="flex flex-col items-center justify-center text-center p-12 bg-gray-800 rounded-xl shadow-lg">
//                     <svg className="w-20 h-20 text-gray-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
//                     <p className="text-xl font-semibold text-white mb-2">No RSVP'd Events Found</p>
//                     <p className="text-gray-400">You haven't RSVP'd to any events yet. Check out our other events!</p>
//                     <button
//                         onClick={() => navigate('/events')}
//                         className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition duration-300"
//                     >
//                         Browse All Events
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyEventsPage;



// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import EventCard from '../components/EventCard';
// import LoadingSpinner from '../components/LoadingSpinner';

// const API_BASE_URL = 'http://localhost:5000/api';

// const MyEventsPage = () => {
//     const { currentUser, isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (isAuthReady && !currentUser) {
//             navigate('/login');
//             toast.error("Please log in to view your events.");
//             return;
//         }

//         if (currentUser) {
//             const fetchMyEvents = async () => {
//                 try {
//                     const headers = getAuthHeaders();
//                     const response = await fetch(`${API_BASE_URL}/events/my-events`, {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             ...headers
//                         },
//                     });

//                     if (!response.ok) {
//                         const errorData = await response.json();
//                         throw new Error(errorData.message || "Failed to fetch your events.");
//                     }

//                     const data = await response.json();
                    
//                     // Debugging: API से मिला raw data कंसोल में लॉग करें।
//                     console.log("Raw API data received:", data);

//                     // Naya functionality: Sirf accepted aur pending events ko display karein
//                     const filteredEvents = data.filter(event => event.rsvp && (event.rsvp.status === 'accepted' || event.rsvp.status === 'pending'));
                    
//                     // Debugging: Filtered events कंसोल में लॉग करें।
//                     console.log("Filtered events to be displayed:", filteredEvents);

//                     setEvents(filteredEvents);
//                 } catch (err) {
//                     console.error("Error fetching user's events:", err);
//                     setError(err.message || "An error occurred while fetching your events.");
//                     toast.error(err.message || "Server error. Could not load your events.");
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchMyEvents();
//         }
//     }, [currentUser, isAuthReady, getAuthHeaders, navigate]);

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
//                     <p className="text-xl font-bold mb-4">Error</p>
//                     <p>{error}</p>
//                     <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Browse All Events</button>
//                 </div>
//             </div>
//         );
//     }
    
//     return (
//         <div className="container mx-auto p-8 min-h-screen">
//             <h2 className="text-4xl font-bold text-white mb-8 text-center">My RSVP'd Events</h2>
            
//             {events.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {events.map((event) => (
//                         <EventCard key={event._id} event={event} />
//                     ))}
//                 </div>
//             ) : (
//                 <div className="flex flex-col items-center justify-center text-center p-12 bg-gray-800 rounded-xl shadow-lg">
//                     <svg className="w-20 h-20 text-gray-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
//                     <p className="text-xl font-semibold text-white mb-2">No RSVP'd Events Found</p>
//                     <p className="text-gray-400">You haven't RSVP'd to any events yet. Check out our other events!</p>
//                     <button
//                         onClick={() => navigate('/events')}
//                         className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition duration-300"
//                     >
//                         Browse All Events
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyEventsPage;




// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import EventCard from '../components/EventCard';
// import LoadingSpinner from '../components/LoadingSpinner';

// const API_BASE_URL = 'http://localhost:5000/api';

// const MyEventsPage = () => {
//     const { currentUser, isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [activeTab, setActiveTab] = useState('all'); // 'all', 'accepted', 'pending'

//     useEffect(() => {
//         if (isAuthReady && !currentUser) {
//             navigate('/login');
//             toast.error("Please log in to view your events.");
//             return;
//         }

//         if (currentUser) {
//             const fetchMyEvents = async () => {
//                 try {
//                     const headers = getAuthHeaders();
//                     const response = await fetch(`${API_BASE_URL}/events/my-events`, {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             ...headers
//                         },
//                     });

//                     if (!response.ok) {
//                         const errorData = await response.json();
//                         throw new Error(errorData.message || "Failed to fetch your events.");
//                     }

//                     const data = await response.json();
                    
//                     // Debugging: API से मिला raw data कंसोल में लॉग करें।
//                     console.log("Raw API data received:", data);

//                     // Filter events: Only show accepted and pending RSVPs (exclude rejected)
//                     const filteredEvents = data.filter(event => 
//                         event.rsvp && (event.rsvp.status === 'accepted' || event.rsvp.status === 'pending')
//                     );
                    
//                     // Debugging: Filtered events कंसोल में लॉग करें।
//                     console.log("Filtered events to be displayed:", filteredEvents);

//                     setEvents(filteredEvents);
//                 } catch (err) {
//                     console.error("Error fetching user's events:", err);
//                     setError(err.message || "An error occurred while fetching your events.");
//                     toast.error(err.message || "Server error. Could not load your events.");
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchMyEvents();
//         }
//     }, [currentUser, isAuthReady, getAuthHeaders, navigate]);

//     // Filter events based on active tab
//     const getFilteredEvents = () => {
//         if (activeTab === 'accepted') {
//             return events.filter(event => event.rsvp.status === 'accepted');
//         } else if (activeTab === 'pending') {
//             return events.filter(event => event.rsvp.status === 'pending');
//         }
//         return events; // 'all' tab
//     };

//     // Enhanced EventCard component with RSVP status
//     const EventCardWithStatus = ({ event }) => {
//         const getStatusBadge = () => {
//             const status = event.rsvp?.status;
//             if (status === 'accepted') {
//                 return (
//                     <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                         ✅ Confirmed
//                     </div>
//                 );
//             } else if (status === 'pending') {
//                 return (
//                     <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                         ⏳ Pending
//                     </div>
//                 );
//             }
//             return null;
//         };

//         return (
//             <div className="relative">
//                 <EventCard event={event} />
//                 {getStatusBadge()}
//             </div>
//         );
//     };

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
//                     <p className="text-xl font-bold mb-4">Error</p>
//                     <p>{error}</p>
//                     <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Browse All Events</button>
//                 </div>
//             </div>
//         );
//     }

//     const filteredEvents = getFilteredEvents();
//     const acceptedCount = events.filter(e => e.rsvp.status === 'accepted').length;
//     const pendingCount = events.filter(e => e.rsvp.status === 'pending').length;
    
//     return (
//         <div className="container mx-auto p-8 min-h-screen">
//             <h2 className="text-4xl font-bold text-white mb-8 text-center">My RSVP'd Events</h2>
            
//             {events.length > 0 ? (
//                 <>
//                     {/* Tab Navigation */}
//                     <div className="flex justify-center mb-8">
//                         <div className="bg-gray-800 rounded-lg p-1 border border-gray-700">
//                             <button
//                                 onClick={() => setActiveTab('all')}
//                                 className={`px-6 py-2 rounded-md font-semibold transition-colors ${
//                                     activeTab === 'all' 
//                                         ? 'bg-green-600 text-white' 
//                                         : 'text-gray-300 hover:text-white hover:bg-gray-700'
//                                 }`}
//                             >
//                                 All ({events.length})
//                             </button>
//                             <button
//                                 onClick={() => setActiveTab('accepted')}
//                                 className={`px-6 py-2 rounded-md font-semibold transition-colors ${
//                                     activeTab === 'accepted' 
//                                         ? 'bg-green-600 text-white' 
//                                         : 'text-gray-300 hover:text-white hover:bg-gray-700'
//                                 }`}
//                             >
//                                 Confirmed ({acceptedCount})
//                             </button>
//                             <button
//                                 onClick={() => setActiveTab('pending')}
//                                 className={`px-6 py-2 rounded-md font-semibold transition-colors ${
//                                     activeTab === 'pending' 
//                                         ? 'bg-yellow-600 text-white' 
//                                         : 'text-gray-300 hover:text-white hover:bg-gray-700'
//                                 }`}
//                             >
//                                 Pending ({pendingCount})
//                             </button>
//                         </div>
//                     </div>

//                     {/* Events Grid */}
//                     {filteredEvents.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {filteredEvents.map((event) => (
//                                 <EventCardWithStatus key={event._id} event={event} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="flex flex-col items-center justify-center text-center p-12 bg-gray-800 rounded-xl shadow-lg">
//                             <svg className="w-20 h-20 text-gray-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
//                             <p className="text-xl font-semibold text-white mb-2">
//                                 No {activeTab === 'all' ? '' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Events Found
//                             </p>
//                             <p className="text-gray-400">
//                                 {activeTab === 'accepted' && "You don't have any confirmed events yet."}
//                                 {activeTab === 'pending' && "You don't have any pending RSVPs."}
//                                 {activeTab === 'all' && "You haven't RSVP'd to any events yet."}
//                             </p>
//                         </div>
//                     )}
//                 </>
//             ) : (
//                 <div className="flex flex-col items-center justify-center text-center p-12 bg-gray-800 rounded-xl shadow-lg">
//                     <svg className="w-20 h-20 text-gray-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
//                     <p className="text-xl font-semibold text-white mb-2">No RSVP'd Events Found</p>
//                     <p className="text-gray-400">You haven't RSVP'd to any events yet. Check out our other events!</p>
//                     <button
//                         onClick={() => navigate('/events')}
//                         className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition duration-300"
//                     >
//                         Browse All Events
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyEventsPage;



import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE_URL = 'http://localhost:5000/api';

const MyEventsPage = () => {
    const { currentUser, isAuthReady, getAuthHeaders } = useContext(AuthContext);
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'accepted', 'pending'

    useEffect(() => {
        if (isAuthReady && !currentUser) {
            navigate('/login');
            toast.error("Please log in to view your events.");
            return;
        }

        if (currentUser) {
            fetchMyEvents();
        }
    }, [currentUser, isAuthReady, getAuthHeaders, navigate]);

    const fetchMyEvents = async () => {
        try {
            setLoading(true);
            const headers = getAuthHeaders();
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/events/my-events`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch your events.");
            }

            const data = await response.json();
            
            console.log("Raw API data received:", data);

            // Filter events: Only show accepted and pending RSVPs (exclude rejected)
            const filteredEvents = data.filter(event => 
                event.rsvp && (event.rsvp.status === 'accepted' || event.rsvp.status === 'pending')
            );
            
            console.log("Filtered events to be displayed:", filteredEvents);

            setEvents(filteredEvents);
        } catch (err) {
            console.error("Error fetching user's events:", err);
            setError(err.message || "An error occurred while fetching your events.");
            toast.error(err.message || "Server error. Could not load your events.");
        } finally {
            setLoading(false);
        }
    };

    // Refresh events when user comes back to the page
    useEffect(() => {
        const handleFocus = () => {
            if (currentUser && !loading) {
                fetchMyEvents();
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [currentUser, loading]);

    // Auto-refresh every 30 seconds to catch real-time updates
    useEffect(() => {
        if (!currentUser) return;

        const intervalId = setInterval(() => {
            fetchMyEvents();
        }, 30000); // Refresh every 30 seconds

        return () => clearInterval(intervalId);
    }, [currentUser]);

    // Filter events based on active tab
    const getFilteredEvents = () => {
        if (activeTab === 'accepted') {
            return events.filter(event => event.rsvp?.status === 'accepted');
        } else if (activeTab === 'pending') {
            return events.filter(event => event.rsvp?.status === 'pending');
        }
        return events; // 'all' tab
    };

    // Enhanced EventCard component with RSVP status
    const EventCardWithStatus = ({ event }) => {
        const getStatusBadge = () => {
            const status = event.rsvp?.status;
            if (status === 'accepted') {
                return (
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Confirmed
                    </div>
                );
            } else if (status === 'pending') {
                return (
                    <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                    Pending Approval
                    </div>
                );
            }
            return null;
        };

        return (
            <div className="relative">
                <EventCard event={event} />
                {getStatusBadge()}
            </div>
        );
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
                    <p className="text-xl font-bold mb-4">Error</p>
                    <p>{error}</p>
                    <div className="flex gap-4 mt-4 justify-center">
                        <button 
                            onClick={fetchMyEvents} 
                            className="px-6 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition"
                        >
                            Retry
                        </button>
                        <button 
                            onClick={() => navigate('/events')} 
                            className="px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700 transition"
                        >
                            Browse All Events
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const filteredEvents = getFilteredEvents();
    const acceptedCount = events.filter(e => e.rsvp?.status === 'accepted').length;
    const pendingCount = events.filter(e => e.rsvp?.status === 'pending').length;
    
    return (
        <div className="container mx-auto p-8 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold text-white">My RSVP'd Events</h2>
                <button
                    onClick={fetchMyEvents}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    disabled={loading}
                >
                    <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
            </div>
            
            {events.length > 0 ? (
                <>
                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-gray-800 rounded-lg p-1 border border-gray-700">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                                    activeTab === 'all' 
                                        ? 'bg-green-600 text-white' 
                                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                }`}
                            >
                                All ({events.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('accepted')}
                                className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                                    activeTab === 'accepted' 
                                        ? 'bg-green-600 text-white' 
                                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                }`}
                            >
                                Confirmed ({acceptedCount})
                            </button>
                            <button
                                onClick={() => setActiveTab('pending')}
                                className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                                    activeTab === 'pending' 
                                        ? 'bg-yellow-600 text-white' 
                                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                }`}
                            >
                                Pending ({pendingCount})
                            </button>
                        </div>
                    </div>

                    {/* Events Grid */}
                    {filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.map((event) => (
                                <EventCardWithStatus key={event._id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center p-12 bg-gray-800 rounded-xl shadow-lg">
                            <svg className="w-20 h-20 text-gray-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                            <p className="text-xl font-semibold text-white mb-2">
                                No {activeTab === 'all' ? '' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Events Found
                            </p>
                            <p className="text-gray-400">
                                {activeTab === 'accepted' && "You don't have any confirmed events yet."}
                                {activeTab === 'pending' && "You don't have any pending RSVPs."}
                                {activeTab === 'all' && "You haven't RSVP'd to any events yet."}
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center text-center p-12 bg-gray-800 rounded-xl shadow-lg">
                    <svg className="w-20 h-20 text-gray-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                    <p className="text-xl font-semibold text-white mb-2">No RSVP'd Events Found</p>
                    <p className="text-gray-400">You haven't RSVP'd to any events yet. Check out our other events!</p>
                    <button
                        onClick={() => navigate('/events')}
                        className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition duration-300"
                    >
                        Browse All Events
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyEventsPage;