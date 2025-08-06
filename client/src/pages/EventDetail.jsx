// // src/pages/EventDetailPage.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';

// const API_BASE_URL = 'http://localhost:5000/api';

// const EventDetailPage = () => {
//     const { id } = useParams();
//     const { currentUser, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [event, setEvent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isRsvpd, setIsRsvpd] = useState(false);
//     const [isCheckingRsvp, setIsCheckingRsvp] = useState(false);

//     useEffect(() => {
//         if (!id) {
//             setError("Event ID not found in URL.");
//             setLoading(false);
//             return;
//         }

//         const fetchEventDetails = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch(`${API_BASE_URL}/events/${id}`);
//                 const data = await response.json();

//                 if (response.ok) {
//                     setEvent(data);
//                 } else {
//                     setError(data.message || "Failed to fetch event details.");
//                     toast.error(data.message || "Failed to fetch event details.");
//                 }
//             } catch (err) {
//                 console.error("Error fetching event details:", err);
//                 setError("An error occurred while fetching event details. Please try again.");
//                 toast.error("Server error. Could not fetch event.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchRsvpStatus = async () => {
//             if (!currentUser) {
//                 setIsRsvpd(false);
//                 return;
//             }
//             setIsCheckingRsvp(true);
//             try {
//                 const response = await fetch(`${API_BASE_URL}/events/${id}/rsvp-status`, {
//                     headers: getAuthHeaders(),
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     setIsRsvpd(data.isRsvpd);
//                 } else {
//                     // Handle case where user is not logged in or token is invalid
//                     setIsRsvpd(false);
//                 }
//             } catch (err) {
//                 console.error("Error checking RSVP status:", err);
//             } finally {
//                 setIsCheckingRsvp(false);
//             }
//         };

//         fetchEventDetails();
//         fetchRsvpStatus();
//     }, [id, currentUser, getAuthHeaders]);

//     const handleRsvp = async () => {
//         if (!currentUser) {
//             toast.info("Please log in to register for this event.");
//             navigate('/login', { state: { redirectTo: `/events/${id}` } });
//             return;
//         }

//         if (isRsvpd) {
//             toast.info("You are already registered for this event.");
//             return;
//         }

//         try {
//             const response = await fetch(`${API_BASE_URL}/events/${id}/rsvp`, {
//                 method: 'POST',
//                 headers: getAuthHeaders(),
//             });
//             const data = await response.json();

//             if (response.ok) {
//                 toast.success("Successfully registered for the event!");
//                 setIsRsvpd(true); // Update the state to reflect the change
//             } else {
//                 toast.error(data.message || "Failed to register.");
//             }
//         } catch (error) {
//             console.error("Error during registration:", error);
//             toast.error("An error occurred during registration. Please try again.");
//         }
//     };
    
//     // Function to handle "Cancel RSVP"
//     const handleCancelRsvp = async () => {
//         // Implement logic for cancelling RSVP here
//         // This will require a new backend endpoint
//         toast.info("Cancel RSVP functionality will be implemented here!");
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
//                     <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Back to Events</button>
//                 </div>
//             </div>
//         );
//     }

//     if (!event) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
//                     <p className="text-xl font-bold mb-4">Event Not Found</p>
//                     <p>The event you are looking for does not exist.</p>
//                     <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Back to Events</button>
//                 </div>
//             </div>
//         );
//     }
    
//     const formattedStartDate = event.startDate ? new Date(event.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';
//     const formattedEndDate = event.endDate ? new Date(event.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';

//     return (
//         <div className="container mx-auto p-6 max-w-5xl min-h-screen">
//             {/* Back to Events button added here */}
//             <div className="mb-6">
//                 <button
//                     onClick={() => navigate('/events')}
//                     className="flex items-center text-green-400 hover:text-green-300 transition-colors"
//                 >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
//                     Back to Events
//                 </button>
//             </div>

//             <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl overflow-hidden text-white">
//                 <div className="relative">
//                     <img
//                         src={event.imageUrl || 'https://placehold.co/1000x400/111827/9CA3AF?text=Event+Image'}
//                         alt={event.title}
//                         className="w-full h-96 object-cover object-center"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex items-end">
//                         <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">{event.title}</h1>
//                     </div>
//                 </div>

//                 <div className="p-8">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                         <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                             <h4 className="text-green-400 font-semibold text-sm mb-1">Category</h4>
//                             <p className="text-lg">{event.category}</p>
//                         </div>
//                         <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                             <h4 className="text-green-400 font-semibold text-sm mb-1">Date</h4>
//                             <p className="text-lg">{formattedStartDate} - {formattedEndDate}</p>
//                         </div>
//                         <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                             <h4 className="text-green-400 font-semibold text-sm mb-1">Time</h4>
//                             <p className="text-lg">{event.startTime} - {event.endTime}</p>
//                         </div>
//                     </div>

//                     <div className="mb-8">
//                         <h3 className="text-2xl font-bold mb-4">About this Event</h3>
//                         <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{event.description}</p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                         <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                             <h4 className="text-green-400 font-semibold text-sm mb-1">Location</h4>
//                             <p className="text-lg">{event.medium === 'In Person' ? event.location : 'Online'}</p>
//                         </div>
//                         <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                             <h4 className="text-green-400 font-semibold text-sm mb-1">Price</h4>
//                             <p className="text-lg font-bold text-green-400">{event.price === 'Free' ? 'Free' : `$${event.price}`}</p>
//                         </div>
//                     </div>
                    
//                     <div className="flex justify-center mt-8">
//                         {isCheckingRsvp ? (
//                             <button className="px-10 py-4 bg-gray-600 text-white font-bold text-lg rounded-full" disabled>
//                                 Checking...
//                             </button>
//                         ) : isRsvpd ? (
//                             <button
//                                 onClick={handleCancelRsvp}
//                                 className="px-10 py-4 bg-red-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
//                             >
//                                 Cancel RSVP
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={handleRsvp}
//                                 className="px-10 py-4 bg-green-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
//                             >
//                                 RSVP / Register
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EventDetailPage;





// src/pages/EventDetail.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';

// const API_BASE_URL = 'http://localhost:5000/api';

// const EventDetail = () => {
//     const { eventId } = useParams();
//     const navigate = useNavigate();
//     const { currentUser, isAuthReady, userId, getAuthHeaders } = useContext(AuthContext);
    
//     const [event, setEvent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [hasRsvped, setHasRsvped] = useState(false);
    
//     useEffect(() => {
//         if (!isAuthReady || !eventId) return;

//         const fetchEvent = async () => {
//             try {
//                 const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
//                 const data = await response.json();
//                 if (response.ok) {
//                     setEvent(data);
//                 } else {
//                     setError(data.message || "Event not found.");
//                     toast.error(data.message || "Event not found.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching event details:", error);
//                 setError("Failed to load event details. Server error.");
//                 toast.error("Failed to load event details. Server error.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const checkRsvpStatus = async () => {
//             if (!userId) {
//                 setHasRsvped(false);
//                 return;
//             }
//             try {
//                 const response = await fetch(`${API_BASE_URL}/rsvps/check/${eventId}`, {
//                     headers: getAuthHeaders()
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     setHasRsvped(data.hasRsvped);
//                 } else {
//                     console.error("Error checking RSVP status:", data.message);
//                     toast.error("Failed to check RSVP status.");
//                 }
//             } catch (error) {
//                 console.error("Error checking RSVP status:", error);
//                 toast.error("Failed to check RSVP status. Server error.");
//             }
//         };

//         fetchEvent();
//         if (currentUser) {
//             checkRsvpStatus();
//         }
//     }, [eventId, isAuthReady, currentUser, userId, getAuthHeaders]);

//     const handleRsvp = async () => {
//         if (!currentUser) {
//             toast.error("Please log in to RSVP.");
//             navigate('/login', { state: { redirectTo: `/events/${eventId}` } });
//             return;
//         }

//         if (hasRsvped) {
//             toast.info("You have already RSVP'd for this event.");
//             return;
//         }

//         try {
//             const response = await fetch(`${API_BASE_URL}/rsvps`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     ...getAuthHeaders()
//                 },
//                 body: JSON.stringify({
//                     eventId: eventId,
//                     eventTitle: event?.title || 'Unknown Event'
//                 }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 toast.success("RSVP submitted successfully! It's under review.");
//                 setHasRsvped(true);
//             } else {
//                 toast.error(data.message || "Failed to submit RSVP. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error submitting RSVP:", error);
//             toast.error("Failed to submit RSVP. Server error.");
//         }
//     };
    
//     // Render states
//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
//                     <p className="text-xl font-bold mb-4">Error</p>
//                     <p>{error}</p>
//                     <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Back to Events</button>
//                 </div>
//             </div>
//         );
//     }
    
//     if (!event) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
//                     <p className="text-xl font-bold mb-4">Event Not Found</p>
//                     <p>The event you are looking for does not exist.</p>
//                     <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Back to Events</button>
//                 </div>
//             </div>
//         );
//     }

//     const formattedStartDate = event.startDate ? new Date(event.startDate).toLocaleDateString() : 'N/A';
//     const formattedEndDate = event.endDate ? new Date(event.endDate).toLocaleDateString() : 'N/A';

//     return (
//         <div className="container mx-auto p-6 max-w-5xl">
//             <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl overflow-hidden text-white">
//                 <div className="relative">
//                     <img
//                         src={event.bannerUrl || 'https://placehold.co/1200x400/111827/9CA3AF?text=Event+Banner'}
//                         alt={event.title}
//                         className="w-full h-96 object-cover object-center"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex items-end">
//                         <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">{event.title}</h1>
//                     </div>
//                 </div>

//                 <div className="p-8">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                         <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                             <h4 className="text-green-400 font-semibold text-sm mb-1">Category</h4>
//                             <p className="text-lg">{event.category}</p>
//                         </div>
//                         <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                             <h4 className="text-green-400 font-semibold text-sm mb-1">Date</h4>
//                             <p className="text-lg">{formattedStartDate} - {formattedEndDate}</p>
//                         </div>
//                         <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                             <h4 className="text-green-400 font-semibold text-sm mb-1">Time</h4>
//                             <p className="text-lg">{event.startTime} - {event.endTime}</p>
//                         </div>
//                     </div>

//                     <div className="mb-8">
//                         <h3 className="text-2xl font-bold mb-4">About this Event</h3>
//                         <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{event.description}</p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                         <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                             <h4 className="text-green-400 font-semibold text-sm mb-1">Location</h4>
//                             <p className="text-lg">{event.medium === 'In Person' ? event.location : 'Online'}</p>
//                         </div>
//                         <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                             <h4 className="text-green-400 font-semibold text-sm mb-1">Price</h4>
//                             <p className="text-lg font-bold text-green-400">{event.price === 'Free' ? 'Free' : `$${event.price}`}</p>
//                         </div>
//                     </div>
                    
//                     <div className="flex justify-center mt-8">
//                         {currentUser ? (
//                             <button
//                                 onClick={handleRsvp}
//                                 disabled={hasRsvped}
//                                 className={`px-10 py-4 font-bold text-lg rounded-full shadow-lg transition duration-300 transform hover:scale-105 ${
//                                     hasRsvped ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
//                                 }`}
//                             >
//                                 {hasRsvped ? 'RSVP Submitted (Under Review)' : 'RSVP Now'}
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={() => navigate('/login', { state: { redirectTo: `/events/${eventId}` } })}
//                                 className="px-10 py-4 font-bold text-lg rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-lg transition duration-300 transform hover:scale-105"
//                             >
//                                 Login to RSVP
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <div className="mt-8 text-center">
//                 <button
//                     className="bg-gray-300 text-gray-800 px-6 py-3 rounded-full shadow-md hover:bg-gray-400 transition duration-300"
//                     onClick={() => navigate('/events')}
//                 >
//                     Back to All Events
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default EventDetail;



// src/pages/EventDetailPage.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { ArrowLeftCircle } from 'lucide-react'; 

// import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';

// const API_BASE_URL = 'http://localhost:5001/api';

// const EventDetailPage = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { currentUser, isAuthReady, userId, getAuthHeaders } = useContext(AuthContext);
    
//     const [event, setEvent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [hasRsvped, setHasRsvped] = useState(false);

//     useEffect(() => {
//         if (!isAuthReady || !id) return;

//         // Fetch event details for everyone (public access)
//         const fetchEventDetails = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch(`${API_BASE_URL}/events/${id}`);
//                 const data = await response.json();
//                 if (response.ok) {
//                     setEvent(data);
//                 } else {
//                     setError(data.message || "Event not found.");
//                     toast.error(data.message || "Event not found.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching event details:", error);
//                 setError("Failed to load event details. Server error.");
//                 toast.error("Failed to load event details. Server error.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         // Fetch RSVP status only if a user is logged in
//         const fetchRsvpStatus = async () => {
//             if (!currentUser) return; // Only run for logged-in users
//             try {
//                 const response = await fetch(`${API_BASE_URL}/rsvps/check/${id}`, {
//                     headers: getAuthHeaders()
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     setHasRsvped(data.hasRsvped);
//                 } else {
//                     console.error("Error checking RSVP status:", data.message);
//                     toast.error("Failed to check RSVP status.");
//                 }
//             } catch (error) {
//                 console.error("Error checking RSVP status:", error);
//                 toast.error("Failed to check RSVP status. Server error.");
//             }
//         };

//         fetchEventDetails();
//         fetchRsvpStatus(); // Call this regardless of login status, it will handle its own logic
//     }, [id, isAuthReady, currentUser, getAuthHeaders]);

//     const handleRsvp = async () => {
//         if (!currentUser) {
//             toast.error("Please log in to RSVP.");
//             navigate('/login', { state: { redirectTo: `/events/${id}` } });
//             return;
//         }

//         if (hasRsvped) {
//             toast.info("You have already RSVP'd for this event.");
//             return;
//         }

//         try {
//             const response = await fetch(`${API_BASE_URL}/rsvps`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     ...getAuthHeaders()
//                 },
//                 body: JSON.stringify({
//                     eventId: id,
//                     eventTitle: event?.title || 'Unknown Event'
//                 }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 toast.success("RSVP submitted successfully! It's under review.");
//                 setHasRsvped(true);
//             } else {
//                 toast.error(data.message || "Failed to submit RSVP. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error submitting RSVP:", error);
//             toast.error("Failed to submit RSVP. Server error.");
//         }
//     };
    
//     const formattedStartDate = event?.startDate ? new Date(event.startDate).toLocaleDateString() : 'N/A';
//     const formattedEndDate = event?.endDate ? new Date(event.endDate).toLocaleDateString() : 'N/A';

//     // Loading and Error states
//     if (loading) return <LoadingSpinner />;
//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
//                     <p className="text-xl font-bold mb-4">Error</p>
//                     <p>{error}</p>
//                     <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Back to Events</button>
//                 </div>
//             </div>
//         );
//     }
//     if (!event) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
//                     <p className="text-xl font-bold mb-4">Event Not Found</p>
//                     <p>The event you are looking for does not exist.</p>
//                     <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Back to Events</button>
//                 </div>
//             </div>
//         );
//     }

//     // Main component rendering
//     return (
//         <div className="container mx-auto p-6 max-w-5xl min-h-screen">
//             <div className="mb-6">
//                 <button
//                     onClick={() => navigate('/events')}
//                     className="flex items-center text-green-400 hover:text-green-300 transition-colors"
//                 >
//                     <ArrowLeftCircle className="w-5 h-5 mr-2" />
//                     Back to Events
//                 </button>
//             </div>

//             <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl overflow-hidden text-white">
//                 <div className="relative">
//                     <img
//                         src={event.bannerUrl || 'https://placehold.co/1200x400/111827/9CA3AF?text=Event+Banner'}
//                         alt={event.title}
//                         className="w-full h-96 object-cover object-center"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex items-end">
//                         <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">{event.title}</h1>
//                     </div>
//                 </div>

//                 {/* Conditional Content */}
//                 {currentUser ? (
//                     <div className="p-8">
//                         {/* Event details for logged-in users */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                                 <h4 className="text-green-400 font-semibold text-sm mb-1">Category</h4>
//                                 <p className="text-lg">{event.category}</p>
//                             </div>
//                             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                                 <h4 className="text-green-400 font-semibold text-sm mb-1">Date</h4>
//                                 <p className="text-lg">{formattedStartDate} - {formattedEndDate}</p>
//                             </div>
//                             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                                 <h4 className="text-green-400 font-semibold text-sm mb-1">Time</h4>
//                                 <p className="text-lg">{event.startTime} - {event.endTime}</p>
//                             </div>
//                         </div>

//                         <div className="mb-8">
//                             <h3 className="text-2xl font-bold mb-4">About this Event</h3>
//                             <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{event.description}</p>
//                         </div>
                        
//                         <div className="flex justify-center mt-8">
//                             <button
//                                 onClick={handleRsvp}
//                                 disabled={hasRsvped}
//                                 className={`px-10 py-4 font-bold text-lg rounded-full shadow-lg transition duration-300 transform hover:scale-105 ${
//                                     hasRsvped ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
//                                 }`}
//                             >
//                                 {hasRsvped ? 'RSVP Submitted' : 'RSVP Now'}
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="p-8 text-center">
//                         <h3 className="text-2xl font-bold mb-4">Please log in to view event details</h3>
//                         <p className="text-gray-400 mb-6">
//                             This event's full details and RSVP option are only available to registered users.
//                         </p>
//                         <button
//                             onClick={() => navigate('/login', { state: { redirectTo: `/events/${id}` } })}
//                             className="px-8 py-4 font-bold text-lg rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-lg transition duration-300 transform hover:scale-105"
//                         >
//                             Login to Continue
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default EventDetailPage;




// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { ArrowLeftCircle } from 'lucide-react'; 
// import { IoLocationOutline, IoCalendarOutline, IoTimeOutline, IoTicketOutline } from 'react-icons/io5';
// import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';

// // सुनिश्चित करें कि यह पोर्ट आपके backend server के पोर्ट से मेल खाता है (e.g., 5000 या 5001)
// const API_BASE_URL = 'http://localhost:5000/api';

// const EventDetailPage = () => {
//     // URL से 'id' प्राप्त करें
//     const { eventId } = useParams();
//     const navigate = useNavigate();
//     const { currentUser, isAuthReady, getAuthHeaders } = useContext(AuthContext);
    
//     const [event, setEvent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [hasRsvped, setHasRsvped] = useState(false);
//     const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);

//     useEffect(() => {
//         // यदि Auth ready नहीं है या id undefined है, तो आगे न बढ़ें।
//         // navigate करने से पहले id की जाँच करें ताकि 404 errors से बचा जा सके।
//         if (!isAuthReady) return;
//         if (!eventId) {
//             setError("Event not found. Invalid ID provided.");
//             toast.error("Event not found. Invalid ID provided.");
//             navigate('/events');
//             return;
//         }

//         // सभी के लिए इवेंट विवरण प्राप्त करें (सार्वजनिक पहुँच)
//         const fetchEventDetails = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
//                 const data = await response.json();
//                 if (response.ok) {
//                     setEvent(data);
//                 } else {
//                     setError(data.message || "Event not found.");
//                     toast.error(data.message || "Event not found.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching event details:", error);
//                 setError("Failed to load event details. Server error.");
//                 toast.error("Failed to load event details. Server error.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         // केवल लॉग-इन किए गए उपयोगकर्ता के लिए RSVP स्थिति प्राप्त करें
//         const fetchRsvpStatus = async () => {
//             // केवल तभी चलाएँ जब currentUser उपलब्ध हो
//             if (!currentUser) return; 
//             try {
//                 const response = await fetch(`${API_BASE_URL}/rsvps/check/${eventId}`, {
//                     headers: getAuthHeaders()
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     setHasRsvped(data.hasRsvped);
//                 } else {
//                     console.error("Error checking RSVP status:", data.message);
//                     // RSVP status check में error आने पर, toast न दिखाएँ ताकि UX बाधित न हो
//                 }
//             } catch (error) {
//                 console.error("Error checking RSVP status:", error);
//                 // RSVP status check में error आने पर, toast न दिखाएँ
//             }
//         };

//         fetchEventDetails();
//         // जब Auth ready हो और user logged-in हो, तभी RSVP स्थिति fetch करें
//         if (currentUser) {
//             fetchRsvpStatus();
//         }

//     }, [eventId, isAuthReady, currentUser, getAuthHeaders, navigate]);

//     // RSVP सबमिशन को handle करें
//     const handleRsvp = async () => {
//         if (!currentUser) {
//             toast.error("Please log in to RSVP.");
//             navigate('/login', { state: { redirectTo: `/events/${eventId}` } });
//             return;
//         }

//         if (hasRsvped) {
//             toast.info("You have already RSVP'd for this event.");
//             return;
//         }

//         setIsSubmittingRsvp(true);
//         try {
//             const response = await fetch(`${API_BASE_URL}/rsvps`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     ...getAuthHeaders()
//                 },
//                 // RSVP मॉडल में eventTitle फ़ील्ड नहीं है, इसलिए इसे हटा दिया गया है
//                 body: JSON.stringify({ eventId }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 toast.success("RSVP submitted successfully! It's under review.");
//                 setHasRsvped(true);
//             } else {
//                 throw new Error(data.message || "Failed to submit RSVP. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error submitting RSVP:", error);
//             toast.error(error.message || "Failed to submit RSVP. Server error.");
//         } finally {
//             setIsSubmittingRsvp(false);
//         }
//     };
    
//     // डेट फॉर्मेटिंग
//     const formattedDate = event?.date ? new Date(event.date).toLocaleDateString() : 'N/A';

//     // Loading और Error states
//     if (loading) return <LoadingSpinner />;
//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
//                     <p className="text-xl font-bold mb-4">Error</p>
//                     <p>{error}</p>
//                     <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Back to Events</button>
//                 </div>
//             </div>
//         );
//     }
//     if (!event) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
//                     <p className="text-xl font-bold mb-4">Event Not Found</p>
//                     <p>The event you are looking for does not exist.</p>
//                     <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Back to Events</button>
//                 </div>
//             </div>
//         );
//     }

//     // मुख्य कंपोनेंट रेंडरिंग
//     return (
//         <div className="container mx-auto p-6 max-w-5xl min-h-screen">
//             <div className="mb-6">
//                 <button
//                     onClick={() => navigate('/events')}
//                     className="flex items-center text-green-400 hover:text-green-300 transition-colors"
//                 >
//                     <ArrowLeftCircle className="w-5 h-5 mr-2" />
//                     Back to Events
//                 </button>
//             </div>

//             <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl overflow-hidden text-white">
//                 <div className="relative">
//                     <img
//                         src={event.coverImage || 'https://placehold.co/1200x400/111827/9CA3AF?text=Event+Banner'}
//                         alt={event.title}
//                         className="w-full h-96 object-cover object-center"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex items-end">
//                         <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">{event.title}</h1>
//                     </div>
//                 </div>

//                 {/* Conditional Content */}
//                 {currentUser ? (
//                     <div className="p-8">
//                         {/* Event details for logged-in users */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                                 <h4 className="text-green-400 font-semibold text-sm mb-1">Category</h4>
//                                 <p className="text-lg">{event.category}</p>
//                             </div>
//                             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                                 <h4 className="text-green-400 font-semibold text-sm mb-1">Date</h4>
//                                 <p className="text-lg">{formattedDate}</p>
//                             </div>
//                             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//                                 <h4 className="text-green-400 font-semibold text-sm mb-1">Time</h4>
//                                 <p className="text-lg">{event.startTime} - {event.endTime}</p>
//                             </div>
//                         </div>

//                         <div className="mb-8">
//                             <h3 className="text-2xl font-bold mb-4">About this Event</h3>
//                             <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{event.description}</p>
//                         </div>
                        
//                         <div className="flex justify-center mt-8">
//                             <button
//                                 onClick={handleRsvp}
//                                 disabled={hasRsvped || isSubmittingRsvp}
//                                 className={`px-10 py-4 font-bold text-lg rounded-full shadow-lg transition duration-300 transform hover:scale-105 ${
//                                     hasRsvped ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
//                                 }`}
//                             >
//                                 {isSubmittingRsvp ? (
//                                     <div className="flex items-center">
//                                         <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Submitting...
//                                     </div>
//                                 ) : (
//                                     hasRsvped ? 'RSVP Submitted' : 'RSVP Now'
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="p-8 text-center">
//                         <h3 className="text-2xl font-bold mb-4">Please log in to view event details</h3>
//                         <p className="text-gray-400 mb-6">
//                             This event's full details and RSVP option are only available to registered users.
//                         </p>
//                         <button
//                             onClick={() => navigate('/login', { state: { redirectTo: `/events/${id}` } })}
//                             className="px-8 py-4 font-bold text-lg rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-lg transition duration-300 transform hover:scale-105"
//                         >
//                             Login to Continue
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default EventDetailPage;


import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeftCircle, MapPin, CalendarDays, Clock, Ticket } from 'lucide-react'; 
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

// सुनिश्चित करें कि यह पोर्ट आपके backend server के पोर्ट से मेल खाता है
const API_BASE_URL = 'http://localhost:5000/api';

const EventDetailPage = () => {
    // URL से 'id' प्राप्त करें - आपके backend routes से मेल खाने के लिए ठीक किया गया है
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser, isAuthReady, getAuthHeaders } = useContext(AuthContext);
    
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasRsvped, setHasRsvped] = useState(false);
    const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);

    useEffect(() => {
        // AbortController का उपयोग race conditions को रोकने के लिए
        const controller = new AbortController();
        const signal = controller.signal;

        // यदि Auth ready नहीं है या id undefined है, तो आगे न बढ़ें।
        if (!isAuthReady || !id) {
            if (!id) {
                setError("Event not found. Invalid ID provided.");
                toast.error("Event not found. Invalid ID provided.");
                // navigate करने के लिए timeout का उपयोग करें ताकि toast को दिखने का समय मिल सके
                setTimeout(() => navigate('/events'), 6000);
            }
            setLoading(false);
            return;
        }

        // सभी के लिए इवेंट विवरण प्राप्त करें (सार्वजनिक पहुँच)
        const fetchEventDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/events/${id}`, { signal });
                const data = await response.json();
                if (response.ok) {
                    setEvent(data);
                } else {
                    setError(data.message || "Event not found.");
                    toast.error(data.message || "Event not found.");
                }
            } catch (error) {
                if (error.name === 'AbortError') return;
                console.error("Error fetching event details:", error);
                setError("Failed to load event details. Server error.");
                toast.error("Failed to load event details. Server error.");
            } finally {
                setLoading(false);
            }
        };

        // केवल लॉग-इन किए गए उपयोगकर्ता के लिए RSVP स्थिति प्राप्त करें
        const fetchRsvpStatus = async () => {
            // केवल तभी चलाएँ जब currentUser उपलब्ध हो
            if (!currentUser) return; 
            try {
                const response = await fetch(`${API_BASE_URL}/rsvps/check/${id}`, {
                    headers: getAuthHeaders(),
                    signal
                });
                const data = await response.json();
                if (response.ok) {
                    setHasRsvped(data.hasRsvped);
                } else {
                    console.error("Error checking RSVP status:", data.message);
                }
            } catch (error) {
                if (error.name === 'AbortError') return;
                console.error("Error checking RSVP status:", error);
            }
        };

        fetchEventDetails();
        // जब Auth ready हो और user logged-in हो, तभी RSVP स्थिति fetch करें
        if (currentUser) {
            fetchRsvpStatus();
        }

        // Cleanup function
        return () => {
            controller.abort();
        };

    }, [id, isAuthReady, currentUser, getAuthHeaders, navigate]);

    // RSVP सबमिशन को handle करें
    const handleRsvp = async () => {
        if (!currentUser) {
            toast.error("Please log in to RSVP.");
            navigate('/login', { state: { redirectTo: `/events/${id}` } });
            return;
        }

        if (hasRsvped) {
            toast.info("You have already RSVP'd for this event.");
            return;
        }

        setIsSubmittingRsvp(true);
        try {
            const response = await fetch(`${API_BASE_URL}/rsvps`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify({ eventId: id }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("RSVP submitted successfully! It's under review.");
                setHasRsvped(true);
            } else {
                throw new Error(data.message || "Failed to submit RSVP. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting RSVP:", error);
            toast.error(error.message || "Failed to submit RSVP. Server error.");
        } finally {
            setIsSubmittingRsvp(false);
        }
    };
    
   const formattedDate = (() => {
        const start = event?.startDate ? new Date(event.startDate) : null;
        const end = event?.endDate ? new Date(event.endDate) : null;

        if (start && end) {
            // Check if start and end dates are the same day
            if (start.toDateString() === end.toDateString()) {
                return start.toLocaleDateString(); // Just show one date if they are the same
            }
            return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
        } else if (start) {
            return start.toLocaleDateString();
        }
        return 'N/A';
    })();

    if (loading) return <LoadingSpinner />;
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
                    <p className="text-xl font-bold mb-4">Error</p>
                    <p>{error}</p>
                    <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Back to Events</button>
                </div>
            </div>
        );
    }
    if (!event) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
                    <p className="text-xl font-bold mb-4">Event Not Found</p>
                    <p>The event you are looking for does not exist.</p>
                    <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700">Back to Events</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-5xl min-h-screen">
            <div className="mb-6">
                <button
                    onClick={() => navigate('/events')}
                    className="flex items-center text-green-400 hover:text-green-300 transition-colors"
                >
                    <ArrowLeftCircle className="w-5 h-5 mr-2" />
                    Back to Events
                </button>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl overflow-hidden text-white">
                <div className="relative">
                    <img
                        src={event.bannerUrl || 'https://placehold.co/1200x400/111827/9CA3AF?text=Event+Banner'}
                        alt={event.title}
                        className="w-full h-96 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex items-end">
                        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">{event.title}</h1>
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="flex items-center space-x-3 bg-gray-800 p-4 rounded-xl border border-gray-700">
                            <CalendarDays className="w-6 h-6 text-green-400" />
                            <div>
                                <h4 className="text-green-400 font-semibold text-sm mb-1">Date</h4>
                                <p className="text-lg">{formattedDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 bg-gray-800 p-4 rounded-xl border border-gray-700">
                            <Clock className="w-6 h-6 text-green-400" />
                            <div>
                                <h4 className="text-green-400 font-semibold text-sm mb-1">Time</h4>
                                <p className="text-lg">{event.startTime} - {event.endTime}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 bg-gray-800 p-4 rounded-xl border border-gray-700">
                            <MapPin className="w-6 h-6 text-green-400" />
                            <div>
                                <h4 className="text-green-400 font-semibold text-sm mb-1">Location</h4>
                                <p className="text-lg">{event.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 bg-gray-800 p-4 rounded-xl border border-gray-700">
                            <Ticket className="w-6 h-6 text-green-400" />
                            <div>
                                <h4 className="text-green-400 font-semibold text-sm mb-1">Category</h4>
                                <p className="text-lg">{event.category}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-4">About this Event</h3>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{event.description}</p>
                    </div>
                    
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleRsvp}
                            disabled={hasRsvped || isSubmittingRsvp}
                            className={`px-10 py-4 font-bold text-lg rounded-full shadow-lg transition duration-300 transform hover:scale-105 ${
                                hasRsvped ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                        >
                            {isSubmittingRsvp ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </div>
                            ) : (
                                hasRsvped ? 'RSVP Submitted' : 'RSVP Now'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;
