// // src/pages/admin/AdminEditEvent.jsx

// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { AuthContext } from '../../context/AuthContext';
// import LoadingSpinner from '../../components/LoadingSpinner';

// // Backend API Base URL
// const API_BASE_URL = 'http://localhost:5000/api';

// const AdminEditEvent = () => {
//     // useParams hook se URL se eventId nikaalein
//     const { id: eventId } = useParams();
//     // useNavigate hook ka istemal redirection ke liye
//     const navigate = useNavigate();
//     // Auth context se authentication state aur headers lene ke liye
//     const { isAuthReady, getAuthHeaders } = useContext(AuthContext);

//     // State variables
//     const [eventData, setEventData] = useState({
//         title: '',
//         category: '',
//         description: '',
//         startDate: '',
//         endDate: '',
//         medium: '',
//         imageUrl: '',
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Backend se event details fetch karne ke liye async function
//     const fetchEvent = async () => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
//                 headers: getAuthHeaders()
//             });
//             const data = await response.json();

//             if (response.ok) {
//                 // Fetched data ko state mein set karein
//                 // Server se mili dates ko input type="date" ke format mein convert karein
//                 setEventData({
//                     ...data,
//                     startDate: data.startDate ? data.startDate.split('T')[0] : '',
//                     endDate: data.endDate ? data.endDate.split('T')[0] : '',
//                 });
//             } else {
//                 setError(data.message || 'Failed to fetch event details.');
//                 toast.error('Event details load karne mein asafal.');
//             }
//         } catch (error) {
//             console.error('Error fetching event details:', error);
//             setError('Server error. Could not load event details.');
//             toast.error('Server error. Event details load nahi ho paaye.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Component mount hone par aur isAuthReady state change hone par event fetch karein
//     useEffect(() => {
//         if (!isAuthReady || !eventId) return;
//         fetchEvent();
//     }, [isAuthReady, eventId, getAuthHeaders]);

//     // Form field values ko handle karne ke liye function
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEventData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     // Form submit hone par event update karne ke liye async function
//     const handleUpdateEvent = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             // PUT request backend ko bhejkar event update karein
//             const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
//                 method: 'PUT',
//                 headers: {
//                     ...getAuthHeaders(),
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(eventData)
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 toast.success('Event safaltapurvak update ho gaya!');
//                 // User ko events list page par redirect karein
//                 navigate('/admin/event-list');
//             } else {
//                 toast.error(data.message || 'Event update karne mein asafal.');
//                 setError(data.message || 'Event update karne mein asafal.');
//             }
//         } catch (error) {
//             console.error('Error updating event:', error);
//             toast.error('Event update karne mein asafal. Server error.');
//             setError('Server error. Event update nahi ho paaya.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Loading state ke liye spinner display karein
//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     // Agar error ho toh error message dikhayein
//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen text-center text-white">
//                 <p className="text-xl text-red-500">{error}</p>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto p-8 min-h-screen text-gray-200">
//             <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-800">
//                 <h1 className="text-4xl font-extrabold text-green-400 mb-6 text-center">Event Update Karein</h1>
//                 <form onSubmit={handleUpdateEvent} className="space-y-6">
//                     {/* Event Title Field */}
//                     <div>
//                         <label htmlFor="title" className="block text-sm font-medium text-gray-300">
//                             Title
//                         </label>
//                         <input
//                             type="text"
//                             name="title"
//                             id="title"
//                             value={eventData.title}
//                             onChange={handleInputChange}
//                             required
//                             className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
//                         />
//                     </div>
//                     {/* Category Field */}
//                     <div>
//                         <label htmlFor="category" className="block text-sm font-medium text-gray-300">
//                             Category
//                         </label>
//                         <input
//                             type="text"
//                             name="category"
//                             id="category"
//                             value={eventData.category}
//                             onChange={handleInputChange}
//                             required
//                             className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
//                         />
//                     </div>
//                     {/* Description Field */}
//                     <div>
//                         <label htmlFor="description" className="block text-sm font-medium text-gray-300">
//                             Description
//                         </label>
//                         <textarea
//                             name="description"
//                             id="description"
//                             rows="4"
//                             value={eventData.description}
//                             onChange={handleInputChange}
//                             required
//                             className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
//                         ></textarea>
//                     </div>
//                     {/* Date Fields (Start and End) */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                         <div>
//                             <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">
//                                 Start Date
//                             </label>
//                             <input
//                                 type="date"
//                                 name="startDate"
//                                 id="startDate"
//                                 value={eventData.startDate}
//                                 onChange={handleInputChange}
//                                 required
//                                 className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="endDate" className="block text-sm font-medium text-gray-300">
//                                 End Date
//                             </label>
//                             <input
//                                 type="date"
//                                 name="endDate"
//                                 id="endDate"
//                                 value={eventData.endDate}
//                                 onChange={handleInputChange}
//                                 required
//                                 className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
//                             />
//                         </div>
//                     </div>
//                     {/* Medium Field */}
//                     <div>
//                         <label htmlFor="medium" className="block text-sm font-medium text-gray-300">
//                             Medium
//                         </label>
//                         <input
//                             type="text"
//                             name="medium"
//                             id="medium"
//                             value={eventData.medium}
//                             onChange={handleInputChange}
//                             className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
//                         />
//                     </div>
//                     {/* Image URL Field */}
//                     <div>
//                         <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">
//                             Image URL
//                         </label>
//                         <input
//                             type="text"
//                             name="imageUrl"
//                             id="imageUrl"
//                             value={eventData.imageUrl}
//                             onChange={handleInputChange}
//                             className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
//                         />
//                     </div>
                    
//                     {/* Submit Button */}
//                     <div className="flex justify-end space-x-4 mt-6">
//                         <button
//                             type="button"
//                             onClick={() => navigate('/admin/event-list')}
//                             className="px-6 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 transition duration-300"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300"
//                         >
//                             Update Event
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AdminEditEvent;




// // src/pages/admin/AdminEditEvent.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { AuthContext } from '../../context/AuthContext';
// import LoadingSpinner from '../../components/LoadingSpinner';

// const API_BASE_URL = 'http://localhost:5000/api';

// const AdminEditEvent = () => {
//     const { id } = useParams();
//     const { isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(true);
//     const [eventData, setEventData] = useState({
//         title: '',
//         description: '',
//         category: '',
//         startDate: '',
//         startTime: '',
//         medium: ''
//     });

//     const [error, setError] = useState(null);

//     // Fetch event details from the server
//     useEffect(() => {
//         if (!isAuthReady || !id) return;

//         const fetchEventDetails = async () => {
//             try {
//                 const response = await fetch(`${API_BASE_URL}/events/${id}`, {
//                     headers: getAuthHeaders()
//                 });
                
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch event details');
//                 }
                
//                 const data = await response.json();
                
//                 // Format date and time for input fields
//                 const date = new Date(data.startDate);
//                 const formattedDate = date.toISOString().split('T')[0];
//                 const formattedTime = date.toTimeString().split(' ')[0].substring(0, 5);

//                 setEventData({
//                     title: data.title,
//                     description: data.description,
//                     category: data.category,
//                     startDate: formattedDate,
//                     startTime: formattedTime,
//                     medium: data.medium
//                 });

//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching event details:', error);
//                 setError('Failed to load event details. Please try again.');
//                 setLoading(false);
//                 toast.error('Failed to load event details.');
//             }
//         };

//         fetchEventDetails();
//     }, [id, isAuthReady, getAuthHeaders]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEventData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const eventToUpdate = {
//             ...eventData,
//             startDate: eventData.startDate && eventData.startTime 
//                 ? new Date(`${eventData.startDate}T${eventData.startTime}`).toISOString() 
//                 : eventData.startDate 
//         };

//         try {
//             const response = await fetch(`${API_BASE_URL}/events/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     ...getAuthHeaders(),
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(eventToUpdate)
//             });

//             if (response.ok) {
//                 toast.success('Event updated successfully!');
//                 navigate('/admin/events');
//             } else {
//                 const errorData = await response.json();
//                 toast.error(errorData.message || 'Failed to update event. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error updating event:', error);
//             toast.error('An unexpected error occurred. Please check your network connection.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <LoadingSpinner />;
//     }
    
//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen text-center text-white">
//                 <p className="text-xl text-red-500">{error}</p>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-gray-900 rounded-lg p-8 shadow-xl text-white max-w-2xl mx-auto border border-gray-700">
//             <h1 className="text-3xl font-bold text-green-400 mb-6">Edit Event: {eventData.title}</h1>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                     <label htmlFor="title" className="block text-sm font-medium text-gray-300">Event Title</label>
//                     <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={eventData.title}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={eventData.description}
//                         onChange={handleChange}
//                         rows="4"
//                         className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
//                     ></textarea>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
//                         <input
//                             type="text"
//                             id="category"
//                             name="category"
//                             value={eventData.category}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="medium" className="block text-sm font-medium text-gray-300">Medium</label>
//                         <select
//                             id="medium"
//                             name="medium"
//                             value={eventData.medium}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
//                         >
//                             <option value="">Select Medium</option>
//                             <option value="Online">Online</option>
//                             <option value="Offline">Offline</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">Date</label>
//                         <input
//                             type="date"
//                             id="startDate"
//                             name="startDate"
//                             value={eventData.startDate}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="startTime" className="block text-sm font-medium text-gray-300">Time</label>
//                         <input
//                             type="time"
//                             id="startTime"
//                             name="startTime"
//                             value={eventData.startTime}
//                             onChange={handleChange}
//                             className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
//                         />
//                     </div>
//                 </div>
                
//                 <div className="flex justify-end space-x-4 mt-6">
//                     <button
//                         type="button"
//                         onClick={() => navigate('/admin/events')}
//                         className="bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
//                         disabled={loading}
//                     >
//                         {loading ? 'Updating...' : 'Update Event'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AdminEditEvent;




// src/pages/admin/AdminEditEvent.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { AuthContext } from '../../context/AuthContext';
// import LoadingSpinner from '../../components/LoadingSpinner';

// const API_BASE_URL = 'http://localhost:5000/api';

// const AdminEditEvent = () => {
//     const { id } = useParams();
//     const { isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(true);
//     const [eventData, setEventData] = useState({
//         title: '',
//         description: '',
//         category: '',
//         startDate: '',
//         startTime: '',
//         medium: ''
//     });

//     const [error, setError] = useState(null);

//     // Fetch event details from the server
//     useEffect(() => {
//         if (!isAuthReady || !id) return;

//         const fetchEventDetails = async () => {
//             try {
//                 const response = await fetch(`${API_BASE_URL}/events/${id}`, {
//                     headers: getAuthHeaders()
//                 });
                
//                 // Server se 404 ya doosre error ke liye check karein
//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || 'Failed to fetch event details.');
//                 }
                
//                 const data = await response.json();
                
//                 // Date aur time ko input fields ke liye format karein
//                 const date = new Date(data.startDate);
//                 const formattedDate = date.toISOString().split('T')[0];
//                 const formattedTime = date.toTimeString().split(' ')[0].substring(0, 5);

//                 setEventData({
//                     title: data.title,
//                     description: data.description,
//                     category: data.category,
//                     startDate: formattedDate,
//                     startTime: formattedTime,
//                     medium: data.medium
//                 });

//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching event details:', error);
//                 setError('Failed to load event details. Please try again.');
//                 setLoading(false);
//                 toast.error(error.message); // Use the error message from the server or a generic one
//             }
//         };

//         fetchEventDetails();
//     }, [id, isAuthReady, getAuthHeaders]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEventData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const eventToUpdate = {
//             ...eventData,
//             startDate: eventData.startDate && eventData.startTime 
//                 ? new Date(`${eventData.startDate}T${eventData.startTime}`).toISOString() 
//                 : eventData.startDate 
//         };

//         try {
//             const response = await fetch(`${API_BASE_URL}/events/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     ...getAuthHeaders(),
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(eventToUpdate)
//             });

//             if (response.ok) {
//                 toast.success('Event updated successfully!');
//                 navigate('/admin/events');
//             } else {
//                 const errorData = await response.json();
//                 toast.error(errorData.message || 'Failed to update event. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error updating event:', error);
//             toast.error('An unexpected error occurred. Please check your network connection.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <LoadingSpinner />;
//     }
    
//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen text-center text-white">
//                 <p className="text-xl text-red-500">{error}</p>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-gray-900 rounded-lg p-8 shadow-xl text-white max-w-2xl mx-auto border border-gray-700">
//             <h1 className="text-3xl font-bold text-green-400 mb-6">Edit Event: {eventData.title}</h1>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                     <label htmlFor="title" className="block text-sm font-medium text-gray-300">Event Title</label>
//                     <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={eventData.title}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={eventData.description}
//                         onChange={handleChange}
//                         rows="4"
//                         className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
//                     ></textarea>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
//                         <input
//                             type="text"
//                             id="category"
//                             name="category"
//                             value={eventData.category}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="medium" className="block text-sm font-medium text-gray-300">Medium</label>
//                         <select
//                             id="medium"
//                             name="medium"
//                             value={eventData.medium}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
//                         >
//                             <option value="">Select Medium</option>
//                             <option value="Online">Online</option>
//                             <option value="Offline">Offline</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">Date</label>
//                         <input
//                             type="date"
//                             id="startDate"
//                             name="startDate"
//                             value={eventData.startDate}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="startTime" className="block text-sm font-medium text-gray-300">Time</label>
//                         <input
//                             type="time"
//                             id="startTime"
//                             name="startTime"
//                             value={eventData.startTime}
//                             onChange={handleChange}
//                             className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
//                         />
//                     </div>
//                 </div>
                
//                 <div className="flex justify-end space-x-4 mt-6">
//                     <button
//                         type="button"
//                         onClick={() => navigate('/admin/events')}
//                         className="bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
//                         disabled={loading}
//                     >
//                         {loading ? 'Updating...' : 'Update Event'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AdminEditEvent;





// src/pages/admin/AdminEditEvent.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const API_BASE_URL = 'http://localhost:5000/api';

const AdminEditEvent = () => {
    const { id } = useParams();
    const { isAuthReady, getAuthHeaders } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        category: '',
        startDate: '', // YYYY-MM-DD format
        startTime: '', // HH:MM format
        medium: '',
        bannerUrl: '', // Changed from coverImage to bannerUrl
        imageUrl: ''
    });

    const [error, setError] = useState(null);

    // Fetch event details from the server
    useEffect(() => {
        if (!isAuthReady || !id) return;

        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/events/${id}`, {
                    headers: getAuthHeaders()
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch event details.');
                }

                const data = await response.json();

                // Backend से प्राप्त startDate को YYYY-MM-DD फॉर्मेट में बदलें
                const fetchedStartDate = data.startDate ? new Date(data.startDate) : null;
                const formattedDate = fetchedStartDate ? fetchedStartDate.toISOString().split('T')[0] : '';

                // Backend से प्राप्त startTime को सीधे उपयोग करें या डिफ़ॉल्ट खाली स्ट्रिंग
                // सुनिश्चित करें कि यह HH:MM फॉर्मेट में है
                const formattedStartTime = data.startTime || '';

                setEventData({
                    title: data.title || '',
                    description: data.description || '',
                    category: data.category || '',
                    startDate: formattedDate,
                    startTime: formattedStartTime,
                    medium: data.medium || '',
                    bannerUrl: data.bannerUrl || '', // Populating bannerUrl from data.bannerUrl
                    imageUrl: data.imageUrl || ''
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching event details:', error);
                setError('Failed to load event details. Please try again.');
                setLoading(false);
                toast.error(error.message);
            }
        };

        fetchEventDetails();
    }, [id, isAuthReady, getAuthHeaders]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let finalStartDate = eventData.startDate; // Default to existing startDate string

        // Combine date and time into ISO string for backend
        if (eventData.startDate) {
            // If startTime is provided, combine it. Otherwise, use a default time.
            const timePart = eventData.startTime ? `${eventData.startTime}:00` : '00:00:00'; // Add seconds
            const dateTimeString = `${eventData.startDate}T${timePart}`;
            const dateObj = new Date(dateTimeString);

            // Check if the Date object is valid
            if (!isNaN(dateObj.getTime())) {
                finalStartDate = dateObj.toISOString();
            } else {
                // If invalid, show error and prevent submission
                toast.error('Invalid date or time provided. Please check the date and time fields.');
                setLoading(false);
                return;
            }
        } else {
            // If startDate is missing, show error
            toast.error('Start date is required.');
            setLoading(false);
            return;
        }

        const eventToUpdate = {
            ...eventData,
            startDate: finalStartDate, // Use the updated startDate
            // If your backend expects startTime as a separate field, keep it.
            // Otherwise, it's already merged into startDate, so you might remove it here.
            startTime: eventData.startTime // Keep if backend needs it separately
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/events/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventToUpdate)
            });

            if (response.ok) {
                toast.success('Event updated successfully!');
                navigate('/admin/events');
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to update event. Please try again.');
            }
        } catch (error) {
            console.error('Error updating event:', error);
            toast.error('An unexpected error occurred. Please check your network connection.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-center text-white">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 rounded-lg p-8 shadow-xl text-white max-w-2xl mx-auto border border-gray-700">
            <h1 className="text-3xl font-bold text-green-400 mb-6">Edit Event: {eventData.title}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300">Event Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
                    ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={eventData.category}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="medium" className="block text-sm font-medium text-gray-300">Medium</label>
                        <select
                            id="medium"
                            name="medium"
                            value={eventData.medium}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
                        >
                            <option value="">Select Medium</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">Date</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={eventData.startDate}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-300">Time</label>
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={eventData.startTime}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                    </div>
                </div>

                {/* New fields for image URLs */}
                <div>
                    <label htmlFor="bannerUrl" className="block text-sm font-medium text-gray-300">Banner Image URL</label>
                    <input
                        type="url"
                        id="bannerUrl"
                        name="bannerUrl" // Changed name to bannerUrl
                        value={eventData.bannerUrl} // Changed value to eventData.bannerUrl
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="e.g., https://example.com/banner.jpg"
                    />
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">Additional Image URL</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={eventData.imageUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="e.g., https://example.com/event-image.jpg"
                    />
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/events')}
                        className="bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Event'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminEditEvent;
