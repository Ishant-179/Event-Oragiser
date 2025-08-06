// // src/pages/CreateEventPage.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { toast } from 'sonner'; // Import toast

// import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { GlowCard } from '../components/GlowCard';

// // Backend API Base URL
// const API_BASE_URL = 'http://localhost:5000/api';

// // Create Event Page component
// const CreateEventPage = () => {
//     const { isAdmin, isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate(); // Hook for programmatic navigation

//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         privacy: 'Public',
//         medium: 'In Person',
//         startDate: '',
//         startTime: '',
//         endDate: '',
//         endTime: '',
//         category: 'General',
//         attendees: 0,
//         speakers: 0,
//         workshops: 0,
//         location: '',
//         price: 'Free',
//     });
//     const [imageFile, setImageFile] = useState(null);
//     const [bannerFile, setBannerFile] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         // Redirect if not authenticated or not an admin
//         if (isAuthReady && !isAdmin) {
//             toast.error("You need to be an admin to create events.");
//             navigate('/home');
//         }
//     }, [isAuthReady, isAdmin, navigate]);

//     const handleChange = (e) => {
//         const { name, value, type } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'number' ? Number(value) : value
//         }));
//     };

//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         if (name === 'imageFile') {
//             setImageFile(files[0]);
//         } else if (name === 'bannerFile') {
//             setBannerFile(files[0]);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         // Basic validation
//         if (!formData.title || !formData.description || !formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
//             toast.error("Please fill in all required fields.");
//             setLoading(false);
//             return;
//         }
//         if (formData.medium === 'In Person' && !formData.location) {
//             toast.error("Location is required for 'In Person' events.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const dataToSend = new FormData();
//             for (const key in formData) {
//                 dataToSend.append(key, formData[key]);
//             }
//             if (imageFile) {
//                 dataToSend.append('image', imageFile);
//             }
//             if (bannerFile) {
//                 dataToSend.append('banner', bannerFile);
//             }

//             const response = await fetch(`${API_BASE_URL}/events`, {
//                 method: 'POST',
//                 headers: {
//                     ...getAuthHeaders() // Include Authorization header
//                 },
//                 body: dataToSend, // FormData does not need 'Content-Type': 'application/json'
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 toast.success("Event created successfully!");
//                 setFormData({ // Reset form
//                     title: '', description: '', privacy: 'Public', medium: 'In Person',
//                     startDate: '', startTime: '', endDate: '', endTime: '', category: 'General',
//                     attendees: 0, speakers: 0, workshops: 0,
//                     location: '', price: 'Free',
//                 });
//                 setImageFile(null);
//                 setBannerFile(null);
//                 navigate('/events'); // Navigate back to events list
//             } else {
//                 toast.error(result.message || "Failed to create event.");
//             }
//         } catch (error) {
//             console.error("Error creating event:", error);
//             toast.error("Failed to create event. Server error.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!isAdmin && isAuthReady) { // Render loading spinner if not ready, or access denied if ready but not admin
//         return (
//             // Consistent dark, transparent background for access denied message
//             <div className="container mx-auto p-6 text-center text-red-400 text-xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
//                 Access Denied: You must be an admin to create events.
//                 <button
//                     className="mt-4 bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition duration-300"
//                     onClick={() => navigate('/home')}
//                 >
//                     Go to Home
//                 </button>
//             </div>
//         );
//     }

//     if (!isAuthReady || loading) {
//         return <LoadingSpinner />;
//     }

//     return (
//         // Main container for the Create Event Page with consistent dark, transparent background

// //   <GlowCard 
// //         className='w-full cursor-pointer transform transition-all duration-300 hover:-translate-y-2 min-h-screen'
// //         glowColor='green'
// //         >

//         <div className="container mx-auto p-6 min-h-screen mt-4 max-w-3xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
//             <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Create New Event</h1>
//             <form onSubmit={handleSubmit} className="p-8 space-y-6"> {/* Removed bg-white, shadow, border from form */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="title" className="block text-gray-300 text-sm font-medium mb-2">Title <span className="text-red-400">*</span></label>
//                         <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="category" className="block text-gray-300 text-sm font-medium mb-2">Category</label>
//                         <input type="text" id="category" name="category" value={formData.category} onChange={handleChange}
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-2">Description <span className="text-red-400">*</span></label>
//                     <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows="4"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"></textarea>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="privacy" className="block text-gray-300 text-sm font-medium mb-2">Privacy <span className="text-red-400">*</span></label>
//                         <select id="privacy" name="privacy" value={formData.privacy} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200">
//                             <option value="Public">Public</option>
//                             <option value="Private">Private</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label htmlFor="medium" className="block text-gray-300 text-sm font-medium mb-2">Medium <span className="text-red-400">*</span></label>
//                         <select id="medium" name="medium" value={formData.medium} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200">
//                             <option value="In Person">In Person</option>
//                             <option value="Online">Online</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="startDate" className="block text-gray-300 text-sm font-medium mb-2">Start Date <span className="text-red-400">*</span></label>
//                         <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="startTime" className="block text-gray-300 text-sm font-medium mb-2">Start Time <span className="text-red-400">*</span></label>
//                         <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="endDate" className="block text-gray-300 text-sm font-medium mb-2">End Date <span className="text-red-400">*</span></label>
//                         <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="endTime" className="block text-gray-300 text-sm font-medium mb-2">End Time <span className="text-red-400">*</span></label>
//                         <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 </div>

//                 {formData.medium === 'In Person' && (
//                     <div>
//                         <label htmlFor="location" className="block text-gray-300 text-sm font-medium mb-2">Location <span className="text-red-400">*</span></label>
//                         <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required={formData.medium === 'In Person'}
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 )}

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                         <label htmlFor="attendees" className="block text-gray-300 text-sm font-medium mb-2">Attendees (Estimated)</label>
//                         <input type="number" id="attendees" name="attendees" value={formData.attendees} onChange={handleChange} min="0"
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="speakers" className="block text-gray-300 text-sm font-medium mb-2">Speakers (Estimated)</label>
//                         <input type="number" id="speakers" name="speakers" value={formData.speakers} onChange={handleChange} min="0"
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="workshops" className="block text-gray-300 text-sm font-medium mb-2">Workshops (Estimated)</label>
//                         <input type="number" id="workshops" name="workshops" value={formData.workshops} onChange={handleChange} min=""
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="price" className="block text-gray-300 text-sm font-medium mb-2">Price</label>
//                     <input type="text" id="price" name="price" value={formData.price} onChange={handleChange}
//                         className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                 </div>
//                 <div>
//                     <label htmlFor="imageFile" className="block text-gray-300 text-sm font-medium mb-2">Event Image</label>
//                     <input type="file" id="imageFile" name="imageFile" accept="image/*" onChange={handleFileChange}
//                         className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600" /> {/* Adjusted file input button style */}
//                     {imageFile && <p className="text-gray-400 text-sm mt-2">Selected: {imageFile.name}</p>}
//                 </div>
//                 <div>
//                     <label htmlFor="bannerFile" className="block text-gray-300 text-sm font-medium mb-2">Event Banner</label>
//                     <input type="file" id="bannerFile" name="bannerFile" accept="image/*" onChange={handleFileChange}
//                         className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600" /> {/* Adjusted file input button style */}
//                     {bannerFile && <p className="text-gray-400 text-sm mt-2">Selected: {bannerFile.name}</p>}
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
//                     disabled={loading}
//                 >
//                     {loading ? 'Creating Event...' : 'Create Event'}
//                 </button>
//             </form>
//         </div>

//         // </GlowCard>
//     );
// };

// export default CreateEventPage;



// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { GlowCard } from '../components/GlowCard';

// // Backend API Base URL
// const API_BASE_URL = 'http://localhost:5000/api'; // Update to a consistent port

// // Create Event Page component
// const CreateEventPage = () => {
//     const { isAdmin, isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         privacy: 'Public',
//         medium: 'In Person',
//         startDate: '',
//         startTime: '',
//         endDate: '',
//         endTime: '',
//         category: 'General',
//         attendees: 0,
//         speakers: 0,
//         workshops: 0,
//         location: '',
//         price: 'Free',
//     });
//     const [imageFile, setImageFile] = useState(null);
//     const [bannerFile, setBannerFile] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         // Redirect if not authenticated or not an admin
//         if (isAuthReady && !isAdmin) {
//             toast.error("You need to be an admin to create events.");
//             navigate('/home');
//         }
//     }, [isAuthReady, isAdmin, navigate]);

//     const handleChange = (e) => {
//         const { name, value, type } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'number' ? Number(value) : value
//         }));
//     };

//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         if (files[0] && files[0].size > 5 * 1024 * 1024) { // Check for file size > 5MB
//             toast.error("File size should not exceed 5MB.");
//             e.target.value = null; // Clear the input
//             if (name === 'imageFile') {
//                 setImageFile(null);
//             } else if (name === 'bannerFile') {
//                 setBannerFile(null);
//             }
//             return;
//         }

//         if (name === 'imageFile') {
//             setImageFile(files[0]);
//         } else if (name === 'bannerFile') {
//             setBannerFile(files[0]);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         // Basic validation
//         if (!formData.title || !formData.description || !formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
//             toast.error("Please fill in all required fields.");
//             setLoading(false);
//             return;
//         }
//         if (formData.medium === 'In Person' && !formData.location) {
//             toast.error("Location is required for 'In Person' events.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const dataToSend = new FormData();
//             for (const key in formData) {
//                 dataToSend.append(key, formData[key]);
//             }
//             if (imageFile) {
//                 dataToSend.append('image', imageFile);
//             }
//             if (bannerFile) {
//                 dataToSend.append('banner', bannerFile);
//             }

//             const response = await fetch(`${API_BASE_URL}/events`, {
//                 method: 'POST',
//                 headers: {
//                     ...getAuthHeaders()
//                 },
//                 body: dataToSend,
//             });

//             // Check for a specific 413 error and handle it before trying to parse JSON
//             if (response.status === 413) {
//                 toast.error("File upload failed: The images you are trying to upload are too large.");
//                 setLoading(false);
//                 return;
//             }

//             const result = await response.json();

//             if (response.ok) {
//                 toast.success("Event created successfully!");
//                 // Clear the form after successful submission
//                 setFormData({
//                     title: '', description: '', privacy: 'Public', medium: 'In Person',
//                     startDate: '', startTime: '', endDate: '', endTime: '', category: 'General',
//                     attendees: 0, speakers: 0, workshops: 0,
//                     location: '', price: 'Free',
//                 });
//                 setImageFile(null);
//                 setBannerFile(null);
//                 navigate('/admin/event-list'); // Navigate to the admin event list page
//             } else {
//                 toast.error(result.message || "Failed to create event.");
//             }
//         } catch (error) {
//             console.error("Error creating event:", error);
//             toast.error("Failed to create event. An unexpected error occurred.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!isAdmin && isAuthReady) {
//         return (
//             <div className="container mx-auto p-6 text-center text-red-400 text-xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
//                 Access Denied: You must be an admin to create events.
//                 <button
//                     className="mt-4 bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition duration-300"
//                     onClick={() => navigate('/home')}
//                 >
//                     Go to Home
//                 </button>
//             </div>
//         );
//     }

//     if (!isAuthReady || loading) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <div className="container mx-auto p-6 min-h-screen mt-4 max-w-3xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
//             <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Create New Event</h1>
//             <form onSubmit={handleSubmit} className="p-8 space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="title" className="block text-gray-300 text-sm font-medium mb-2">Title <span className="text-red-400">*</span></label>
//                         <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="category" className="block text-gray-300 text-sm font-medium mb-2">Category</label>
//                         <input type="text" id="category" name="category" value={formData.category} onChange={handleChange}
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-2">Description <span className="text-red-400">*</span></label>
//                     <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows="4"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"></textarea>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="privacy" className="block text-gray-300 text-sm font-medium mb-2">Privacy <span className="text-red-400">*</span></label>
//                         <select id="privacy" name="privacy" value={formData.privacy} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200">
//                             <option value="Public">Public</option>
//                             <option value="Private">Private</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label htmlFor="medium" className="block text-gray-300 text-sm font-medium mb-2">Medium <span className="text-red-400">*</span></label>
//                         <select id="medium" name="medium" value={formData.medium} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200">
//                             <option value="In Person">In Person</option>
//                             <option value="Online">Online</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="startDate" className="block text-gray-300 text-sm font-medium mb-2">Start Date <span className="text-red-400">*</span></label>
//                         <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="startTime" className="block text-gray-300 text-sm font-medium mb-2">Start Time <span className="text-red-400">*</span></label>
//                         <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="endDate" className="block text-gray-300 text-sm font-medium mb-2">End Date <span className="text-red-400">*</span></label>
//                         <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="endTime" className="block text-gray-300 text-sm font-medium mb-2">End Time <span className="text-red-400">*</span></label>
//                         <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 </div>

//                 {formData.medium === 'In Person' && (
//                     <div>
//                         <label htmlFor="location" className="block text-gray-300 text-sm font-medium mb-2">Location <span className="text-red-400">*</span></label>
//                         <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required={formData.medium === 'In Person'}
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 )}

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                         <label htmlFor="attendees" className="block text-gray-300 text-sm font-medium mb-2">Attendees (Estimated)</label>
//                         <input type="number" id="attendees" name="attendees" value={formData.attendees} onChange={handleChange} min="0"
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="speakers" className="block text-gray-300 text-sm font-medium mb-2">Speakers (Estimated)</label>
//                         <input type="number" id="speakers" name="speakers" value={formData.speakers} onChange={handleChange} min="0"
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="workshops" className="block text-gray-300 text-sm font-medium mb-2">Workshops (Estimated)</label>
//                         <input type="number" id="workshops" name="workshops" value={formData.workshops} onChange={handleChange} min="0"
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="price" className="block text-gray-300 text-sm font-medium mb-2">Price</label>
//                     <input type="text" id="price" name="price" value={formData.price} onChange={handleChange}
//                         className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                 </div>
//                 <div>
//                     <label htmlFor="imageFile" className="block text-gray-300 text-sm font-medium mb-2">Event Image</label>
//                     <input type="file" id="imageFile" name="imageFile" accept="image/*" onChange={handleFileChange}
//                         className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600" />
//                     {imageFile && <p className="text-gray-400 text-sm mt-2">Selected: {imageFile.name}</p>}
//                 </div>
//                 <div>
//                     <label htmlFor="bannerFile" className="block text-gray-300 text-sm font-medium mb-2">Event Banner</label>
//                     <input type="file" id="bannerFile" name="bannerFile" accept="image/*" onChange={handleFileChange}
//                         className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600" />
//                     {bannerFile && <p className="text-gray-400 text-sm mt-2">Selected: {bannerFile.name}</p>}
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
//                     disabled={loading}
//                 >
//                     {loading ? 'Creating Event...' : 'Create Event'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CreateEventPage;






// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { GlowCard } from '../components/GlowCard';

// // Backend API Base URL
// const API_BASE_URL = 'http://localhost:5000/api';

// // Image compression function
// const compressImage = (file, maxWidth, maxHeight, quality) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const img = new Image();
//             img.src = event.target.result;
//             img.onload = () => {
//                 const canvas = document.createElement('canvas');
//                 let width = img.width;
//                 let height = img.height;

//                 if (width > height) {
//                     if (width > maxWidth) {
//                         height = Math.round(height * (maxWidth / width));
//                         width = maxWidth;
//                     }
//                 } else {
//                     if (height > maxHeight) {
//                         width = Math.round(width * (maxHeight / height));
//                         height = maxHeight;
//                     }
//                 }

//                 canvas.width = width;
//                 canvas.height = height;
//                 const ctx = canvas.getContext('2d');
//                 ctx.drawImage(img, 0, 0, width, height);

//                 canvas.toBlob(
//                     (blob) => {
//                         if (blob) {
//                             const compressedFile = new File([blob], file.name, {
//                                 type: blob.type,
//                                 lastModified: Date.now(),
//                             });
//                             resolve(compressedFile);
//                         } else {
//                             reject(new Error('Canvas to Blob conversion failed'));
//                         }
//                     },
//                     file.type,
//                     quality
//                 );
//             };
//             img.onerror = (error) => reject(error);
//         };
//         reader.onerror = (error) => reject(error);
//         reader.readAsDataURL(file);
//     });
// };

// const CreateEventPage = () => {
//     const { isAdmin, isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         privacy: 'Public',
//         medium: 'In Person',
//         startDate: '',
//         startTime: '',
//         endDate: '',
//         endTime: '',
//         category: 'General',
//         attendees: 0,
//         speakers: 0,
//         workshops: 0,
//         location: '',
//         price: 'Free',
//     });
//     const [imageFile, setImageFile] = useState(null);
//     const [bannerFile, setBannerFile] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (isAuthReady && !isAdmin) {
//             toast.error("You need to be an admin to create events.");
//             navigate('/home');
//         }
//     }, [isAuthReady, isAdmin, navigate]);

//     const handleChange = (e) => {
//         const { name, value, type } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'number' ? Number(value) : value
//         }));
//     };

//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         if (files[0] && files[0].size > 5 * 1024 * 1024) {
//             toast.error("File size should not exceed 5MB.");
//             e.target.value = null;
//             if (name === 'imageFile') {
//                 setImageFile(null);
//             } else if (name === 'bannerFile') {
//                 setBannerFile(null);
//             }
//             return;
//         }

//         if (name === 'imageFile') {
//             setImageFile(files[0]);
//         } else if (name === 'bannerFile') {
//             setBannerFile(files[0]);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         if (!formData.title || !formData.description || !formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
//             toast.error("Please fill in all required fields.");
//             setLoading(false);
//             return;
//         }
//         if (formData.medium === 'In Person' && !formData.location) {
//             toast.error("Location is required for 'In Person' events.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const dataToSend = new FormData();
//             for (const key in formData) {
//                 dataToSend.append(key, formData[key]);
//             }

//             // Images ko compress karein before uploading
//             if (imageFile) {
//                 toast.info("Compressing event image...");
//                 const compressedImage = await compressImage(imageFile, 800, 800, 0.7);
//                 dataToSend.append('image', compressedImage);
//             }
//             if (bannerFile) {
//                 toast.info("Compressing event banner...");
//                 const compressedBanner = await compressImage(bannerFile, 1200, 600, 0.7);
//                 dataToSend.append('banner', compressedBanner);
//             }

//             const response = await fetch(`${API_BASE_URL}/events`, {
//                 method: 'POST',
//                 headers: {
//                     ...getAuthHeaders()
//                 },
//                 body: dataToSend,
//             });

//             if (response.status === 413) {
//                 toast.error("File upload failed: The images you are trying to upload are too large.");
//                 setLoading(false);
//                 return;
//             }

//             const result = await response.json();

//             if (response.ok) {
//                 toast.success("Event created successfully!");
//                 setFormData({
//                     title: '', description: '', privacy: 'Public', medium: 'In Person',
//                     startDate: '', startTime: '', endDate: '', endTime: '', category: 'General',
//                     attendees: 0, speakers: 0, workshops: 0,
//                     location: '', price: 'Free',
//                 });
//                 setImageFile(null);
//                 setBannerFile(null);
//                 navigate('/admin/event-list');
//             } else {
//                 toast.error(result.message || "Failed to create event.");
//             }
//         } catch (error) {
//             console.error("Error creating event:", error);
//             toast.error("Failed to create event. An unexpected error occurred.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!isAdmin && isAuthReady) {
//         return (
//             <div className="container mx-auto p-6 text-center text-red-400 text-xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
//                 Access Denied: You must be an admin to create events.
//                 <button
//                     className="mt-4 bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition duration-300"
//                     onClick={() => navigate('/home')}
//                 >
//                     Go to Home
//                 </button>
//             </div>
//         );
//     }

//     if (!isAuthReady || loading) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <div className="container mx-auto p-6 min-h-screen mt-4 max-w-3xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
//             <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Create New Event</h1>
//             <form onSubmit={handleSubmit} className="p-8 space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="title" className="block text-gray-300 text-sm font-medium mb-2">Title <span className="text-red-400">*</span></label>
//                         <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="category" className="block text-gray-300 text-sm font-medium mb-2">Category</label>
//                         <input type="text" id="category" name="category" value={formData.category} onChange={handleChange}
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-2">Description <span className="text-red-400">*</span></label>
//                     <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows="4"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"></textarea>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="privacy" className="block text-gray-300 text-sm font-medium mb-2">Privacy <span className="text-red-400">*</span></label>
//                         <select id="privacy" name="privacy" value={formData.privacy} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200">
//                             <option value="Public">Public</option>
//                             <option value="Private">Private</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label htmlFor="medium" className="block text-gray-300 text-sm font-medium mb-2">Medium <span className="text-red-400">*</span></label>
//                         <select id="medium" name="medium" value={formData.medium} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200">
//                             <option value="In Person">In Person</option>
//                             <option value="Online">Online</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="startDate" className="block text-gray-300 text-sm font-medium mb-2">Start Date <span className="text-red-400">*</span></label>
//                         <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="startTime" className="block text-gray-300 text-sm font-medium mb-2">Start Time <span className="text-red-400">*</span></label>
//                         <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="endDate" className="block text-gray-300 text-sm font-medium mb-2">End Date <span className="text-red-400">*</span></label>
//                         <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="endTime" className="block text-gray-300 text-sm font-medium mb-2">End Time <span className="text-red-400">*</span></label>
//                         <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 </div>

//                 {formData.medium === 'In Person' && (
//                     <div>
//                         <label htmlFor="location" className="block text-gray-300 text-sm font-medium mb-2">Location <span className="text-red-400">*</span></label>
//                         <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required={formData.medium === 'In Person'}
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 )}

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                         <label htmlFor="attendees" className="block text-gray-300 text-sm font-medium mb-2">Attendees (Estimated)</label>
//                         <input type="number" id="attendees" name="attendees" value={formData.attendees} onChange={handleChange} min="0"
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="speakers" className="block text-gray-300 text-sm font-medium mb-2">Speakers (Estimated)</label>
//                         <input type="number" id="speakers" name="speakers" value={formData.speakers} onChange={handleChange} min="0"
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                     <div>
//                         <label htmlFor="workshops" className="block text-gray-300 text-sm font-medium mb-2">Workshops (Estimated)</label>
//                         <input type="number" id="workshops" name="workshops" value={formData.workshops} onChange={handleChange} min="0"
//                             className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="price" className="block text-gray-300 text-sm font-medium mb-2">Price</label>
//                     <input type="text" id="price" name="price" value={formData.price} onChange={handleChange}
//                         className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
//                 </div>
//                 <div>
//                     <label htmlFor="imageFile" className="block text-gray-300 text-sm font-medium mb-2">Event Image</label>
//                     <input type="file" id="imageFile" name="imageFile" accept="image/*" onChange={handleFileChange}
//                         className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600" />
//                     {imageFile && <p className="text-gray-400 text-sm mt-2">Selected: {imageFile.name}</p>}
//                 </div>
//                 <div>
//                     <label htmlFor="bannerFile" className="block text-gray-300 text-sm font-medium mb-2">Event Banner</label>
//                     <input type="file" id="bannerFile" name="bannerFile" accept="image/*" onChange={handleFileChange}
//                         className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600" />
//                     {bannerFile && <p className="text-gray-400 text-sm mt-2">Selected: {bannerFile.name}</p>}
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
//                     disabled={loading}
//                 >
//                     {loading ? 'Creating Event...' : 'Create Event'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CreateEventPage;




import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { GlowCard } from '../components/GlowCard';

// Backend API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Image compression function
const compressImage = (file, maxWidth, maxHeight, quality) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round(height * (maxWidth / width));
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round(width * (maxHeight / height));
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const compressedFile = new File([blob], file.name, {
                                type: blob.type,
                                lastModified: Date.now(),
                            });
                            resolve(compressedFile);
                        } else {
                            reject(new Error('Canvas to Blob conversion failed'));
                        }
                    },
                    file.type,
                    quality
                );
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

const CreateEventPage = () => {
    const { isAdmin, isAuthReady, getAuthHeaders } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        privacy: 'Public',
        medium: 'In Person',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        category: 'General',
        attendees: 0,
        speakers: 0,
        workshops: 0,
        location: '',
        price: 'Free',
    });
    const [imageFile, setImageFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthReady && !isAdmin) {
            toast.error("You need to be an admin to create events.");
            navigate('/home');
        }
    }, [isAuthReady, isAdmin, navigate]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files[0] && files[0].size > 5 * 1024 * 1024) {
            toast.error("File size should not exceed 5MB.");
            e.target.value = null;
            if (name === 'imageFile') {
                setImageFile(null);
            } else if (name === 'bannerFile') {
                setBannerFile(null);
            }
            return;
        }

        if (name === 'imageFile') {
            setImageFile(files[0]);
        } else if (name === 'bannerFile') {
            setBannerFile(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.title || !formData.description || !formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
            toast.error("Please fill in all required fields.");
            setLoading(false);
            return;
        }
        if (formData.medium === 'In Person' && !formData.location) {
            toast.error("Location is required for 'In Person' events.");
            setLoading(false);
            return;
        }

        try {
            const dataToSend = new FormData();
            for (const key in formData) {
                dataToSend.append(key, formData[key]);
            }

            // Images ko compress karein before uploading
            if (imageFile) {
                toast.info("Compressing event image...");
                const compressedImage = await compressImage(imageFile, 800, 800, 0.7);
                dataToSend.append('image', compressedImage);
            }
            if (bannerFile) {
                toast.info("Compressing event banner...");
                const compressedBanner = await compressImage(bannerFile, 1200, 600, 0.7);
                dataToSend.append('banner', compressedBanner);
            }

            const response = await fetch(`${API_BASE_URL}/events`, {
                method: 'POST',
                headers: getAuthHeaders(), // Ab yahan `getAuthHeaders` ka upyog kiya gaya hai
                body: dataToSend,
            });

            if (response.status === 413) {
                toast.error("File upload failed: The images you are trying to upload are too large.");
                setLoading(false);
                return;
            }

            const result = await response.json();

            if (response.ok) {
                toast.success("Event created successfully!");
                setFormData({
                    title: '', description: '', privacy: 'Public', medium: 'In Person',
                    startDate: '', startTime: '', endDate: '', endTime: '', category: 'General',
                    attendees: 0, speakers: 0, workshops: 0,
                    location: '', price: 'Free',
                });
                setImageFile(null);
                setBannerFile(null);
                navigate('/admin/events');
            } else {
                toast.error(result.message || "Failed to create event.");
            }
        } catch (error) {
            console.error("Error creating event:", error);
            toast.error("Failed to create event. An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin && isAuthReady) {
        return (
            <div className="container mx-auto p-6 text-center text-red-400 text-xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
                Access Denied: You must be an admin to create events.
                <button
                    className="mt-4 bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition duration-300"
                    onClick={() => navigate('/home')}
                >
                    Go to Home
                </button>
            </div>
        );
    }

    if (!isAuthReady || loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto p-6 min-h-screen mt-4 max-w-3xl bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
            <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Create New Event</h1>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="block text-gray-300 text-sm font-medium mb-2">Title <span className="text-red-400">*</span></label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-2">Description <span className="text-red-400">*</span></label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="privacy" className="block text-gray-300 text-sm font-medium mb-2">Privacy <span className="text-red-400">*</span></label>
                        <select id="privacy" name="privacy" value={formData.privacy} onChange={handleChange} required
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200">
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="medium" className="block text-gray-300 text-sm font-medium mb-2">Medium <span className="text-red-400">*</span></label>
                        <select id="medium" name="medium" value={formData.medium} onChange={handleChange} required
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200">
                            <option value="In Person">In Person</option>
                            <option value="Online">Online</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="startDate" className="block text-gray-300 text-sm font-medium mb-2">Start Date <span className="text-red-400">*</span></label>
                        <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
                    </div>
                    <div>
                        <label htmlFor="startTime" className="block text-gray-300 text-sm font-medium mb-2">Start Time <span className="text-red-400">*</span></label>
                        <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="endDate" className="block text-gray-300 text-sm font-medium mb-2">End Date <span className="text-red-400">*</span></label>
                        <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
                    </div>
                    <div>
                        <label htmlFor="endTime" className="block text-gray-300 text-sm font-medium mb-2">End Time <span className="text-red-400">*</span></label>
                        <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} required
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
                    </div>
                </div>

                {formData.medium === 'In Person' && (
                    <div>
                        <label htmlFor="location" className="block text-gray-300 text-sm font-medium mb-2">Location <span className="text-red-400">*</span></label>
                        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required={formData.medium === 'In Person'}
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="attendees" className="block text-gray-300 text-sm font-medium mb-2">Attendees (Estimated)</label>
                        <input type="number" id="attendees" name="attendees" value={formData.attendees} onChange={handleChange} min="0"
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
                    </div>
                    <div>
                        <label htmlFor="speakers" className="block text-gray-300 text-sm font-medium mb-2">Speakers (Estimated)</label>
                        <input type="number" id="speakers" name="speakers" value={formData.speakers} onChange={handleChange} min="0"
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
                    </div>
                    <div>
                        <label htmlFor="workshops" className="block text-gray-300 text-sm font-medium mb-2">Workshops (Estimated)</label>
                        <input type="number" id="workshops" name="workshops" value={formData.workshops} onChange={handleChange} min="0"
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
                    </div>
                </div>

                <div>
                    <label htmlFor="price" className="block text-gray-300 text-sm font-medium mb-2">Price</label>
                    <input type="text" id="price" name="price" value={formData.price} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" />
                </div>
                <div>
                    <label htmlFor="imageFile" className="block text-gray-300 text-sm font-medium mb-2">Event Image</label>
                    <input type="file" id="imageFile" name="imageFile" accept="image/*" onChange={handleFileChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600" />
                    {imageFile && <p className="text-gray-400 text-sm mt-2">Selected: {imageFile.name}</p>}
                </div>
                <div>
                    <label htmlFor="bannerFile" className="block text-gray-300 text-sm font-medium mb-2">Event Banner</label>
                    <input type="file" id="bannerFile" name="bannerFile" accept="image/*" onChange={handleFileChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600" />
                    {bannerFile && <p className="text-gray-400 text-sm mt-2">Selected: {bannerFile.name}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                    disabled={loading}
                >
                    {loading ? 'Creating Event...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
};

export default CreateEventPage;



