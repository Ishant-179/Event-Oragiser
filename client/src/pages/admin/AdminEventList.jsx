// // src/pages/admin/AdminEventList.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../../context/AuthContext';
// import LoadingSpinner from '../../components/LoadingSpinner';

// // Backend API Base URL ko mock server ke naye port ke hisaab se update karein
// const API_BASE_URL = 'http://localhost:5001/api';

// const AdminEventList = () => {
//     const { isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [eventToDelete, setEventToDelete] = useState(null);
//     const navigate = useNavigate();

//     const fetchEvents = async () => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/events/all`, {
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setEvents(data);
//             } else {
//                 toast.error(data.message || "Failed to load events for admin.");
//             }
//         } catch (error) {
//             console.error("Error fetching events for admin:", error);
//             toast.error("Failed to load events for admin. Server error.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (!isAuthReady) return;
//         fetchEvents();
//     }, [isAuthReady, getAuthHeaders]);

//     const confirmDelete = (eventId) => {
//         setEventToDelete(eventId);
//         setShowDeleteModal(true);
//     };

//     const handleDeleteEvent = async () => {
//         if (!eventToDelete) return;

//         try {
//             const response = await fetch(`${API_BASE_URL}/events/${eventToDelete}`, {
//                 method: 'DELETE',
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 toast.success("Event deleted successfully!");
//                 // Event ko list se hata dein
//                 setEvents(prevEvents => prevEvents.filter(event => event._id !== eventToDelete));
//                 setShowDeleteModal(false);
//                 setEventToDelete(null);
//             } else {
//                 toast.error(data.message || "Failed to delete event.");
//             }
//         } catch (error) {
//             console.error("Error deleting event:", error);
//             toast.error("Failed to delete event. Server error.");
//         }
//     };

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <div className="p-6 bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-3xl font-bold text-white">All Events</h2>
//                 {/* Link component ka use karein navigation ke liye */}
//                 <Link
//                     to="/admin/create-event"
//                     className="bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 font-semibold flex items-center"
//                 >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
//                     Create New Event
//                 </Link>
//             </div>
//             {events.length > 0 ? (
//                 <div className="overflow-x-auto rounded-lg">
//                     <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg text-white">
//                         <thead className="bg-gray-700">
//                             <tr>
//                                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Title</th>
//                                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Category</th>
//                                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Date</th>
//                                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Medium</th>
//                                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {events.map(event => (
//                                 <tr key={event._id} className="border-b border-gray-700 hover:bg-gray-700">
//                                     <td className="py-3 px-4 text-gray-200 font-medium">{event.title}</td>
//                                     <td className="py-3 px-4 text-gray-300">{event.category}</td>
//                                     <td className="py-3 px-4 text-gray-300">
//                                         {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'N/A'}
//                                     </td>
//                                     <td className="py-3 px-4 text-gray-300">{event.medium}</td>
//                                     <td className="py-3 px-4">
//                                         <div className="flex space-x-2">
//                                             {/* Link component ka use karein view ke liye */}
//                                             <Link
//                                                 to={`/events/${event._id}`}
//                                                 className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition duration-200"
//                                             >
//                                                 View
//                                             </Link>
//                                             <button
//                                                 className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition duration-200"
//                                                 onClick={() => confirmDelete(event._id)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p className="text-center text-gray-300 text-lg py-8">No events to manage.</p>
//             )}

//             {showDeleteModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 max-w-sm w-full">
//                         <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
//                         <p className="text-gray-300 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
//                         <div className="flex justify-end space-x-4">
//                             <button
//                                 className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
//                                 onClick={() => setShowDeleteModal(false)}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
//                                 onClick={handleDeleteEvent}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminEventList;


// // src/pages/admin/AdminEventList.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../../context/AuthContext';
// import LoadingSpinner from '../../components/LoadingSpinner';

// // Backend API Base URL ko mock server ke naye port ke hisaab se update karein
// const API_BASE_URL = 'http://localhost:5000/api';

// const AdminEventList = () => {
//     // Auth context se authentication state aur headers lene ke liye useContext ka istemal
//     const { isAuthReady, getAuthHeaders } = useContext(AuthContext);
    
//     // State variables
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [eventToDelete, setEventToDelete] = useState(null);
//     const navigate = useNavigate();

//     // Backend se events fetch karne ke liye async function
//     const fetchEvents = async () => {
//         try {
//             // API call karne ke liye headers ko auth context se obtain karein
//             const response = await fetch(`${API_BASE_URL}/events/all`, {
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();

//             // Check karein ki response successful hai ya nahi
//             if (response.ok) {
//                 setEvents(data);
//             } else {
//                 toast.error(data.message || "Admin ke liye events load karne mein asafal.");
//             }
//         } catch (error) {
//             console.error("Admin ke liye events fetch karne mein error:", error);
//             toast.error("Admin ke liye events load karne mein asafal. Server error.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Component mount hone par aur isAuthReady state change hone par events fetch karein
//     useEffect(() => {
//         if (!isAuthReady) return;
//         fetchEvents();
//     }, [isAuthReady, getAuthHeaders]);

//     // Delete confirmation modal dikhane ke liye function
//     const confirmDelete = (eventId) => {
//         setEventToDelete(eventId);
//         setShowDeleteModal(true);
//     };

//     // Event delete karne ke liye async function
//     const handleDeleteEvent = async () => {
//         if (!eventToDelete) return;

//         try {
//             // DELETE request backend ko bhej kar event delete karein
//             const response = await fetch(`${API_BASE_URL}/events/${eventToDelete}`, {
//                 method: 'DELETE',
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();

//             if (response.ok) {
//                 toast.success("Event safaltapurvak delete ho gaya!");
//                 // Event ko list se hata dein
//                 setEvents(prevEvents => prevEvents.filter(event => event._id !== eventToDelete));
//                 setShowDeleteModal(false);
//                 setEventToDelete(null);
//             } else {
//                 toast.error(data.message || "Event delete karne mein asafal.");
//             }
//         } catch (error) {
//             console.error("Event delete karne mein error:", error);
//             toast.error("Event delete karne mein asafal. Server error.");
//         }
//     };

//     // Loading state ke liye spinner display karein
//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <div className="p-6 bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-3xl font-bold text-white">All Events</h2>
//                 {/* Link component ka use karein navigation ke liye */}
//                 <Link
//                     to="/admin/create-event"
//                     className="bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 font-semibold flex items-center"
//                 >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
//                     Create new Event
//                 </Link>
//             </div>
//             {events.length > 0 ? (
//                 <div className="overflow-x-auto rounded-lg">
//                     <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg text-white">
//                         <thead className="bg-gray-700">
//                             <tr>
//                                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Title</th>
//                                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Category</th>
//                                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Date</th>
//                                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Medium</th>
//                                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* Events array par map karein aur har event ke liye table row render karein */}
//                             {events.map(event => (
//                                 <tr key={event._id} className="border-b border-gray-700 hover:bg-gray-700">
//                                     <td className="py-3 px-4 text-gray-200 font-medium">{event.title}</td>
//                                     <td className="py-3 px-4 text-gray-300">{event.category}</td>
//                                     <td className="py-3 px-4 text-gray-300">
//                                         {/* Date ko readable format mein convert karein */}
//                                         {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'N/A'}
//                                     </td>
//                                     <td className="py-3 px-4 text-gray-300">{event.medium}</td>
//                                     <td className="py-3 px-4">
//                                         <div className="flex space-x-2">
//                                             {/* 'View' button ke liye Link component */}
//                                             <Link
//                                                 to={`/events/${event._id}`}
//                                                 className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition duration-200"
//                                             >
//                                                 View
//                                             </Link>
//                                             <button
//                                                 className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition duration-200"
//                                                 onClick={() => confirmDelete(event._id)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p className="text-center text-gray-300 text-lg py-8">Manage karne ke liye koi events nahi hain.</p>
//             )}

//             {/* Delete confirmation modal */}
//             {showDeleteModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 max-w-sm w-full">
//                         <h3 className="text-xl font-bold text-white mb-4">Deletion ki pushti karein</h3>
//                         <p className="text-gray-300 mb-6">Kya aap is event ko delete karna chahte hain? Yah action wapas nahi liya ja sakta.</p>
//                         <div className="flex justify-end space-x-4">
//                             <button
//                                 className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
//                                 onClick={() => setShowDeleteModal(false)}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
//                                 onClick={handleDeleteEvent}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminEventList;


// src/pages/admin/AdminEventList.jsx

// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { toast } from 'sonner';
// import { AuthContext } from '../../context/AuthContext';
// import LoadingSpinner from '../../components/LoadingSpinner';

// // Backend API Base URL
// const API_BASE_URL = 'http://localhost:5000/api';

// const AdminEventList = () => {
//     // Auth context se authentication state aur headers lene ke liye useContext ka istemal
//     const { isAuthReady, getAuthHeaders } = useContext(AuthContext);
    
//     // State variables
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [eventToDelete, setEventToDelete] = useState(null);

//     // Backend se events fetch karne ke liye async function
//     const fetchEvents = async () => {
//         try {
//             // API call karne ke liye headers ko auth context se obtain karein
//             // Corrected URL to fetch all events
//             const response = await fetch(`${API_BASE_URL}/events`, {
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();

//             // Check karein ki response successful hai ya nahi
//             if (response.ok) {
//                 setEvents(data);
//             } else {
//                 setError(data.message || "Admin ke liye events load karne mein asafal.");
//             }
//         } catch (error) {
//             console.error("Admin ke liye events fetch karne mein error:", error);
//             setError("Server error. Could not load events.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Component mount hone par aur isAuthReady state change hone par events fetch karein
//     useEffect(() => {
//         if (!isAuthReady) return;
//         fetchEvents();
//     }, [isAuthReady, getAuthHeaders]);

//     // Delete confirmation modal dikhane ke liye function
//     const confirmDelete = (eventId) => {
//         setEventToDelete(eventId);
//         setShowDeleteModal(true);
//     };

//     // Event delete karne ke liye async function
//     const handleDeleteEvent = async () => {
//         if (!eventToDelete) return;

//         try {
//             // DELETE request backend ko bhej kar event delete karein
//             const response = await fetch(`${API_BASE_URL}/events/${eventToDelete}`, {
//                 method: 'DELETE',
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();

//             if (response.ok) {
//                 toast.success("Event safaltapurvak delete ho gaya!");
//                 // Event ko list se hata dein
//                 setEvents(prevEvents => prevEvents.filter(event => event._id !== eventToDelete));
//                 setShowDeleteModal(false);
//                 setEventToDelete(null);
//             } else {
//                 toast.error(data.message || "Event delete karne mein asafal.");
//             }
//         } catch (error) {
//             console.error("Event delete karne mein error:", error);
//             toast.error("Event delete karne mein asafal. Server error.");
//         }
//     };

//     // Loading state ke liye spinner display karein
//     if (loading) {
//         return <LoadingSpinner />;
//     }
    
//     // Agar error ho toh error message dikhayein
//     if (error) {
//       return (
//           <div className="flex items-center justify-center min-h-screen text-center text-white">
//               <p className="text-xl text-red-500">{error}</p>
//           </div>
//       );
//     }

//     return (
//         <div className="container mx-auto p-8 min-h-screen text-gray-200">
//             <div className="max-w-7xl mx-auto">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-4xl font-extrabold text-green-400">All Events</h1>
//                     <Link
//                         to="/admin/create-event"
//                         className="bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 font-semibold flex items-center"
//                     >
//                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
//                         Create new Event
//                     </Link>
//                 </div>

//                 {events.length > 0 ? (
//                     <div className="overflow-x-auto bg-gray-900 rounded-xl shadow-lg border border-gray-800">
//                         <table className="min-w-full divide-y divide-gray-700">
//                             <thead className="bg-gray-800">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Medium</th>
//                                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-800">
//                                 {/* Events array par map karein aur har event ke liye table row render karein */}
//                                 {events.map(event => (
//                                     <tr key={event._id} className="hover:bg-gray-850 transition-colors">
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{event.title}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.category}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                                             {/* Date ko readable format mein convert karein */}
//                                             {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'N/A'}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.medium}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                             <div className="flex justify-end space-x-2">
//                                                 {/* 'View' button ke liye Link component */}
//                                                 <Link
//                                                     to={`/events/${event._id}`}
//                                                     className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition duration-200"
//                                                 >
//                                                     View
//                                                 </Link>
//                                                 {/* 'Update' button ke liye Link component */}
//                                                 <Link
//                                                     to={`/admin/edit-event/${event._id}`}
//                                                     className="bg-yellow-600 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-700 transition duration-200"
//                                                 >
//                                                     Update
//                                                 </Link>
//                                                 <button
//                                                     className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition duration-200"
//                                                     onClick={() => confirmDelete(event._id)}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 ) : (
//                     <p className="text-center text-gray-300 text-lg py-8">Manage karne ke liye koi events nahi hain.</p>
//                 )}

//                 {/* Delete confirmation modal */}
//                 {showDeleteModal && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 max-w-sm w-full">
//                             <h3 className="text-xl font-bold text-white mb-4">Deletion ki pushti karein</h3>
//                             <p className="text-gray-300 mb-6">Kya aap is event ko delete karna chahte hain? Yah action wapas nahi liya ja sakta.</p>
//                             <div className="flex justify-end space-x-4">
//                                 <button
//                                     className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
//                                     onClick={() => setShowDeleteModal(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
//                                     onClick={handleDeleteEvent}
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminEventList;



// // src/pages/admin/AdminEventList.jsx

// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { toast } from 'sonner';
// import { AuthContext } from '../../context/AuthContext';
// import LoadingSpinner from '../../components/LoadingSpinner';

// // Backend API Base URL
// const API_BASE_URL = 'http://localhost:5000/api';

// const AdminEventList = () => {
//     // Use useContext to get authentication state and headers from the AuthContext
//     const { isAuthReady, getAuthHeaders } = useContext(AuthContext);
    
//     // State variables
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [eventToDelete, setEventToDelete] = useState(null);

//     // Async function to fetch events from the backend
//     const fetchEvents = async () => {
//         try {
//             // Obtain headers from auth context for the API call
//             // Corrected URL to fetch all events
//             const response = await fetch(`${API_BASE_URL}/events`, {
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();

//             // Check if the response was successful
//             if (response.ok) {
//                 setEvents(data);
//             } else {
//                 setError(data.message || "Failed to load events for admin.");
//             }
//         } catch (error) {
//             console.error("Error fetching events for admin:", error);
//             setError("Server error. Could not load events.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch events on component mount and when the isAuthReady state changes
//     useEffect(() => {
//         if (!isAuthReady) return;
//         fetchEvents();
//     }, [isAuthReady, getAuthHeaders]);

//     // Function to show the delete confirmation modal
//     const confirmDelete = (eventId) => {
//         setEventToDelete(eventId);
//         setShowDeleteModal(true);
//     };

//     // Async function to delete an event
//     const handleDeleteEvent = async () => {
//         if (!eventToDelete) return;

//         try {
//             // Send a DELETE request to the backend to delete the event
//             const response = await fetch(`${API_BASE_URL}/events/${eventToDelete}`, {
//                 method: 'DELETE',
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();

//             if (response.ok) {
//                 toast.success("Event deleted successfully!");
//                 // Remove the event from the list
//                 setEvents(prevEvents => prevEvents.filter(event => event._id !== eventToDelete));
//                 setShowDeleteModal(false);
//                 setEventToDelete(null);
//             } else {
//                 toast.error(data.message || "Failed to delete event.");
//             }
//         } catch (error) {
//             console.error("Error deleting event:", error);
//             toast.error("Failed to delete event. Server error.");
//         }
//     };

//     // Display a spinner for the loading state
//     if (loading) {
//         return <LoadingSpinner />;
//     }
    
//     // Show an error message if there is an error
//     if (error) {
//       return (
//           <div className="flex items-center justify-center min-h-screen text-center text-white">
//               <p className="text-xl text-red-500">{error}</p>
//           </div>
//       );
//     }

//     return (
//         <div className="container mx-auto p-8 min-h-screen text-gray-200">
//             <div className="max-w-7xl mx-auto">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-4xl font-extrabold text-green-400">All Events</h1>
//                     <Link
//                         to="/admin/create-event"
//                         className="bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 font-semibold flex items-center"
//                     >
//                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
//                         Create new Event
//                     </Link>
//                 </div>

//                 {events.length > 0 ? (
//                     <div className="overflow-x-auto bg-gray-900 rounded-xl shadow-lg border border-gray-800">
//                         <table className="min-w-full divide-y divide-gray-700">
//                             <thead className="bg-gray-800">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Medium</th>
//                                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-800">
//                                 {/* Map over the events array and render a table row for each event */}
//                                 {events.map(event => (
//                                     <tr key={event._id} className="hover:bg-gray-850 transition-colors">
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{event.title}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.category}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                                             {/* Convert the date to a readable format */}
//                                             {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'N/A'}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.medium}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                             <div className="flex justify-end space-x-2">
//                                                 {/* Link component for the 'View' button */}
//                                                 <Link
//                                                     to={`/events/${event._id}`}
//                                                     className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition duration-200"
//                                                 >
//                                                     View
//                                                 </Link>
//                                                 {/* Link component for the 'Update' button */}
//                                                 <Link
//                                                     to={`/admin/edit-event/${event._id}`}
//                                                     className="bg-yellow-600 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-700 transition duration-200"
//                                                 >
//                                                     Update
//                                                 </Link>
//                                                 <button
//                                                     className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition duration-200"
//                                                     onClick={() => confirmDelete(event._id)}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 ) : (
//                     <p className="text-center text-gray-300 text-lg py-8">There are no events to manage.</p>
//                 )}

//                 {/* Delete confirmation modal */}
//                 {showDeleteModal && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 max-w-sm w-full">
//                             <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
//                             <p className="text-gray-300 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
//                             <div className="flex justify-end space-x-4">
//                                 <button
//                                     className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
//                                     onClick={() => setShowDeleteModal(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
//                                     onClick={handleDeleteEvent}
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminEventList;



// src/pages/admin/AdminEventList.jsx

// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { toast } from 'sonner';
// import { AuthContext } from '../../context/AuthContext';
// import LoadingSpinner from '../../components/LoadingSpinner';

// // Backend API Base URL
// const API_BASE_URL = 'http://localhost:5000/api';

// const AdminEventList = () => {
//     // Use useContext to get authentication state and headers from the AuthContext
//     const { isAuthReady, getAuthHeaders } = useContext(AuthContext);
    
//     // State variables
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [eventToDelete, setEventToDelete] = useState(null);

//     // Async function to fetch events from the backend
//     const fetchEvents = async () => {
//         try {
//             // Obtain headers from auth context for the API call
//             const response = await fetch(`${API_BASE_URL}/events`, {
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();

//             // Check if the response was successful
//             if (response.ok) {
//                 setEvents(data);
//             } else {
//                 setError(data.message || "Failed to load events for admin.");
//             }
//         } catch (error) {
//             console.error("Error fetching events for admin:", error);
//             setError("Server error. Could not load events.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch events on component mount and when the isAuthReady state changes
//     useEffect(() => {
//         if (!isAuthReady) return;
//         fetchEvents();
//     }, [isAuthReady, getAuthHeaders]);

//     // Function to show the delete confirmation modal
//     const confirmDelete = (eventId) => {
//         setEventToDelete(eventId);
//         setShowDeleteModal(true);
//     };

//     // Async function to delete an event
//     const handleDeleteEvent = async () => {
//         if (!eventToDelete) return;

//         try {
//             // Send a DELETE request to the backend to delete the event
//             const response = await fetch(`${API_BASE_URL}/events/${eventToDelete}`, {
//                 method: 'DELETE',
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();

//             if (response.ok) {
//                 toast.success("Event deleted successfully!");
//                 // Remove the event from the list
//                 setEvents(prevEvents => prevEvents.filter(event => event._id !== eventToDelete));
//                 setShowDeleteModal(false);
//                 setEventToDelete(null);
//             } else {
//                 toast.error(data.message || "Failed to delete event.");
//             }
//         } catch (error) {
//             console.error("Error deleting event:", error);
//             toast.error("Failed to delete event. Server error.");
//         }
//     };

//     // Display a spinner for the loading state
//     if (loading) {
//         return <LoadingSpinner />;
//     }
    
//     // Show an error message if there is an error
//     if (error) {
//       return (
//           <div className="flex items-center justify-center min-h-screen text-center text-white">
//               <p className="text-xl text-red-500">{error}</p>
//           </div>
//       );
//     }

//     return (
//         <div className="container mx-auto p-8 min-h-screen text-gray-200">
//             <div className="max-w-7xl mx-auto">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-4xl font-extrabold text-green-400">All Events</h1>
//                     <Link
//                         to="/admin/create-event"
//                         className="bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 font-semibold flex items-center"
//                     >
//                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
//                         Create new Event
//                     </Link>
//                 </div>

//                 {events.length > 0 ? (
//                     <div className="overflow-x-auto bg-gray-900 rounded-xl shadow-lg border border-gray-800">
//                         <table className="min-w-full divide-y divide-gray-700">
//                             <thead className="bg-gray-800">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Medium</th>
//                                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-800">
//                                 {/* Map over the events array and render a table row for each event */}
//                                 {events.map(event => (
//                                     <tr key={event._id} className="hover:bg-gray-850 transition-colors">
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{event.title}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.category}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                                             {/* Convert the date to a readable format */}
//                                             {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'N/A'}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.medium}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                             <div className="flex justify-end space-x-2">
//                                                 {/* Link component for the 'View' button */}
//                                                 <Link
//                                                     to={`/events/${event._id}`}
//                                                     className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition duration-200"
//                                                 >
//                                                     View
//                                                 </Link>
//                                                 {/* Link component for the 'Update' button */}
//                                                 <Link
//                                                     to={`/admin/edit-event/${event._id}`}
//                                                     className="bg-yellow-600 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-700 transition duration-200"
//                                                 >
//                                                     Update
//                                                 </Link>
//                                                 <button
//                                                     className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition duration-200"
//                                                     onClick={() => confirmDelete(event._id)}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 ) : (
//                     <p className="text-center text-gray-300 text-lg py-8">There are no events to manage.</p>
//                 )}

//                 {/* Delete confirmation modal */}
//                 {showDeleteModal && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 max-w-sm w-full">
//                             <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
//                             <p className="text-gray-300 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
//                             <div className="flex justify-end space-x-4">
//                                 <button
//                                     className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
//                                     onClick={() => setShowDeleteModal(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
//                                     onClick={handleDeleteEvent}
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminEventList;




// src/pages/admin/AdminEventList.jsx

// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { AuthContext } from '../../context/AuthContext';
// import LoadingSpinner from '../../components/LoadingSpinner';

// // Backend API Base URL
// const API_BASE_URL = 'http://localhost:5000/api';

// const AdminEventList = () => {
//     // Use useContext to get authentication state and headers from the AuthContext
//     const { isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate(); // useNavigate hook for programmatic navigation
    
//     // State variables
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [eventToDelete, setEventToDelete] = useState(null);

//     // Async function to fetch events from the backend
//     const fetchEvents = async () => {
//         try {
//             // Obtain headers from auth context for the API call
//             const response = await fetch(`${API_BASE_URL}/events`, {
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();

//             // Check if the response was successful
//             if (response.ok) {
//                 setEvents(data);
//             } else {
//                 setError(data.message || "Failed to load events for admin.");
//             }
//         } catch (error) {
//             console.error("Error fetching events for admin:", error);
//             setError("Server error. Could not load events.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch events on component mount and when the isAuthReady state changes
//     useEffect(() => {
//         if (!isAuthReady) return;
//         fetchEvents();
//     }, [isAuthReady, getAuthHeaders]);

//     // Function to show the delete confirmation modal
//     const confirmDelete = (eventId) => {
//         setEventToDelete(eventId);
//         setShowDeleteModal(true);
//     };

//     // Async function to delete an event
//     const handleDeleteEvent = async () => {
//         if (!eventToDelete) return;

//         try {
//             // Send a DELETE request to the backend to delete the event
//             const response = await fetch(`${API_BASE_URL}/events/${eventToDelete}`, {
//                 method: 'DELETE',
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();

//             if (response.ok) {
//                 toast.success("Event deleted successfully!");
//                 // Remove the event from the list
//                 setEvents(prevEvents => prevEvents.filter(event => event._id !== eventToDelete));
//                 setShowDeleteModal(false);
//                 setEventToDelete(null);
//             } else {
//                 toast.error(data.message || "Failed to delete event.");
//             }
//         } catch (error) {
//             console.error("Error deleting event:", error);
//             toast.error("Failed to delete event. Server error.");
//         }
//     };

//     // Function to handle programmatic navigation to the update page
//     const handleUpdateClick = (eventId) => {
//       // Navigate to the nested admin edit route
//       navigate(`/admin/edit-event/${eventId}`);
//     };

//     // Display a spinner for the loading state
//     if (loading) {
//         return <LoadingSpinner />;
//     }
    
//     // Show an error message if there is an error
//     if (error) {
//       return (
//           <div className="flex items-center justify-center min-h-screen text-center text-white">
//               <p className="text-xl text-red-500">{error}</p>
//           </div>
//       );
//     }

//     return (
//         <div className="container mx-auto p-8 min-h-screen text-gray-200">
//             <div className="max-w-7xl mx-auto">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-4xl font-extrabold text-green-400">All Events</h1>
//                     <Link
//                         to="/admin/create-event"
//                         className="bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 font-semibold flex items-center"
//                     >
//                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
//                         Create new Event
//                     </Link>
//                 </div>

//                 {events.length > 0 ? (
//                     <div className="overflow-x-auto bg-gray-900 rounded-xl shadow-lg border border-gray-800">
//                         <table className="min-w-full divide-y divide-gray-700">
//                             <thead className="bg-gray-800">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Medium</th>
//                                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-800">
//                                 {/* Map over the events array and render a table row for each event */}
//                                 {events.map(event => (
//                                     <tr key={event._id} className="hover:bg-gray-850 transition-colors">
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{event.title}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.category}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                                             {/* Convert the date to a readable format */}
//                                             {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'N/A'}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.medium}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                             <div className="flex justify-end space-x-2">
//                                                 <Link
//                                                     to={`/events/${event._id}`}
//                                                     className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition duration-200"
//                                                 >
//                                                     View
//                                                 </Link>
//                                                 {/* Use a button with onClick for the 'Update' action */}
//                                                 <button
//                                                     onClick={() => handleUpdateClick(event._id)}
//                                                     className="bg-yellow-600 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-700 transition duration-200"
//                                                 >
//                                                     Update
//                                                 </button>
//                                                 <button
//                                                     className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition duration-200"
//                                                     onClick={() => confirmDelete(event._id)}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 ) : (
//                     <p className="text-center text-gray-300 text-lg py-8">There are no events to manage.</p>
//                 )}

//                 {/* Delete confirmation modal */}
//                 {showDeleteModal && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 max-w-sm w-full">
//                             <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
//                             <p className="text-gray-300 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
//                             <div className="flex justify-end space-x-4">
//                                 <button
//                                     className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
//                                     onClick={() => setShowDeleteModal(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
//                                     onClick={handleDeleteEvent}
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminEventList;




// src/pages/admin/AdminEventList.jsx

// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // useNavigate import kiya gaya hai
// import { toast } from 'sonner';
// import { AuthContext } from '../../context/AuthContext';
// import LoadingSpinner from '../../components/LoadingSpinner';

// // Backend API Base URL
// const API_BASE_URL = 'http://localhost:5000/api';

// const AdminEventList = () => {
//     // Use useContext to get authentication state and headers from the AuthContext
//     const { isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate(); // useNavigate hook for programmatic navigation
    
//     // State variables
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [eventToDelete, setEventToDelete] = useState(null);

//     // Async function to fetch events from the backend
//     const fetchEvents = async () => {
//         try {
//             // Obtain headers from auth context for the API call
//             const response = await fetch(`${API_BASE_URL}/events`, {
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();

//             // Check if the response was successful
//             if (response.ok) {
//                 setEvents(data);
//             } else {
//                 setError(data.message || "Failed to load events for admin.");
//             }
//         } catch (error) {
//             console.error("Error fetching events for admin:", error);
//             setError("Server error. Could not load events.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch events on component mount and when the isAuthReady state changes
//     useEffect(() => {
//         if (!isAuthReady) return;
//         fetchEvents();
//     }, [isAuthReady, getAuthHeaders]);

//     // Function to show the delete confirmation modal
//     const confirmDelete = (eventId) => {
//         setEventToDelete(eventId);
//         setShowDeleteModal(true);
//     };

//     // Async function to delete an event
//     const handleDeleteEvent = async () => {
//         if (!eventToDelete) return;

//         try {
//             // Send a DELETE request to the backend to delete the event
//             const response = await fetch(`${API_BASE_URL}/events/${eventToDelete}`, {
//                 method: 'DELETE',
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();

//             if (response.ok) {
//                 toast.success("Event deleted successfully!");
//                 // Remove the event from the list
//                 setEvents(prevEvents => prevEvents.filter(event => event._id !== eventToDelete));
//                 setShowDeleteModal(false);
//                 setEventToDelete(null);
//             } else {
//                 toast.error(data.message || "Failed to delete event.");
//             }
//         } catch (error) {
//             console.error("Error deleting event:", error);
//             toast.error("Failed to delete event. Server error.");
//         }
//     };

//     // Function to handle programmatic navigation to the update page
//     const handleUpdateClick = (eventId) => {
//       // Ab hum relative path use kar rahe hain kyunki AdminEventList nested route mein hai
//       navigate(`edit-event/${eventId}`);
//     };

//     // Display a spinner for the loading state
//     if (loading) {
//         return <LoadingSpinner />;
//     }
    
//     // Show an error message if there is an error
//     if (error) {
//       return (
//           <div className="flex items-center justify-center min-h-screen text-center text-white">
//               <p className="text-xl text-red-500">{error}</p>
//           </div>
//       );
//     }

//     return (
//         <div className="container mx-auto p-8 min-h-screen text-gray-200">
//             <div className="max-w-7xl mx-auto">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-4xl font-extrabold text-green-400">All Events</h1>
//                     <Link
//                         to="/admin/create-event"
//                         className="bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 font-semibold flex items-center"
//                     >
//                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
//                         Create new Event
//                     </Link>
//                 </div>

//                 {events.length > 0 ? (
//                     <div className="overflow-x-auto bg-gray-900 rounded-xl shadow-lg border border-gray-800">
//                         <table className="min-w-full divide-y divide-gray-700">
//                             <thead className="bg-gray-800">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Medium</th>
//                                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-800">
//                                 {/* Map over the events array and render a table row for each event */}
//                                 {events.map(event => (
//                                     <tr key={event._id} className="hover:bg-gray-850 transition-colors">
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{event.title}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.category}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                                             {/* Convert the date to a readable format */}
//                                             {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'N/A'}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.medium}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                             <div className="flex justify-end space-x-2">
//                                                 <Link
//                                                     to={`/events/${event._id}`}
//                                                     className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition duration-200"
//                                                 >
//                                                     View
//                                                 </Link>
//                                                 {/* Use a button with onClick for the 'Update' action */}
//                                                 <button
//                                                     onClick={() => handleUpdateClick(event._id)}
//                                                     className="bg-yellow-600 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-700 transition duration-200"
//                                                 >
//                                                     Update
//                                                 </button>
//                                                 <button
//                                                     className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition duration-200"
//                                                     onClick={() => confirmDelete(event._id)}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 ) : (
//                     <p className="text-center text-gray-300 text-lg py-8">There are no events to manage.</p>
//                 )}

//                 {/* Delete confirmation modal */}
//                 {showDeleteModal && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 max-w-sm w-full">
//                             <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
//                             <p className="text-gray-300 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
//                             <div className="flex justify-end space-x-4">
//                                 <button
//                                     className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
//                                     onClick={() => setShowDeleteModal(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
//                                     onClick={handleDeleteEvent}
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminEventList;



// src/pages/admin/AdminEventList.jsx

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

// Backend API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

const AdminEventList = () => {
    // Use useContext to get authentication state and headers from the AuthContext
    const { isAuthReady, getAuthHeaders } = useContext(AuthContext);
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation
    
    // State variables
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    // Async function to fetch events from the backend
    const fetchEvents = async () => {
        try {
            // Obtain headers from auth context for the API call
            const response = await fetch(`${API_BASE_URL}/events`, {
                headers: getAuthHeaders()
            });
            const data = await response.json();

            // Check if the response was successful
            if (response.ok) {
                setEvents(data);
            } else {
                setError(data.message || "Failed to load events for admin.");
            }
        } catch (error) {
            console.error("Error fetching events for admin:", error);
            setError("Server error. Could not load events.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch events on component mount and when the isAuthReady state changes
    useEffect(() => {
        if (!isAuthReady) return;
        fetchEvents();
    }, [isAuthReady, getAuthHeaders]);

    // Function to show the delete confirmation modal
    const confirmDelete = (eventId) => {
        setEventToDelete(eventId);
        setShowDeleteModal(true);
    };

    // Async function to delete an event
    const handleDeleteEvent = async () => {
        if (!eventToDelete) return;

        try {
            // Send a DELETE request to the backend to delete the event
            const response = await fetch(`${API_BASE_URL}/events/${eventToDelete}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            const data = await response.json();

            if (response.ok) {
                toast.success("Event deleted successfully!");
                // Remove the event from the list
                setEvents(prevEvents => prevEvents.filter(event => event._id !== eventToDelete));
                setShowDeleteModal(false);
                setEventToDelete(null);
            } else {
                toast.error(data.message || "Failed to delete event.");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            toast.error("Failed to delete event. Server error.");
        }
    };

    // Function to handle programmatic navigation to the update page
    const handleUpdateClick = (eventId) => {
      // Ab hum relative path use kar rahe hain
      navigate(`edit-event/${eventId}`);
    };

    // Display a spinner for the loading state
    if (loading) {
        return <LoadingSpinner />;
    }
    
    // Show an error message if there is an error
    if (error) {
      return (
          <div className="flex items-center justify-center min-h-screen text-center text-white">
              <p className="text-xl text-red-500">{error}</p>
          </div>
      );
    }

    return (
        <div className="container mx-auto p-8 min-h-screen text-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-extrabold text-green-400">All Events</h1>
                    <Link
                        to="/create-event" // Path ko nested route ke hisaab se update kiya gaya hai
                        className="bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 font-semibold flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        Create new Event
                    </Link>
                </div>

                {events.length > 0 ? (
                    <div className="overflow-x-auto bg-gray-900 rounded-xl shadow-lg border border-gray-800">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Medium</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {events.map(event => (
                                    <tr key={event._id} className="hover:bg-gray-850 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{event.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.medium}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    to={`/events/${event._id}`}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition duration-200"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => handleUpdateClick(event._id)}
                                                    className="bg-yellow-600 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-700 transition duration-200"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition duration-200"
                                                    onClick={() => confirmDelete(event._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-300 text-lg py-8">There are no events to manage.</p>
                )}

                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 max-w-sm w-full">
                            <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
                            <p className="text-gray-300 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                    onClick={handleDeleteEvent}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminEventList;
