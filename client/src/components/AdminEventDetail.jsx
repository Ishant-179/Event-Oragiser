import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { AuthContext } from '../context/AuthContext'; // Ya aap isse mock kar sakte hain
import LoadingSpinner from '../components/LoadingSpinner'; // Ya aap isse mock kar sakte hain

// Backend API Base URL, yeh aapke mock server ke liye hai
const API_BASE_URL = 'http://localhost:5001/api';

const AdminEventDetails = () => {
    // Agar aapke paas AuthContext nahi hai, toh aap is line ko comment kar sakte hain
    const { isAuthReady, getAuthHeaders } = useContext(AuthContext);
    
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { eventId } = useParams(); // URL se eventId nikalne ke liye
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventDetails = async () => {
            // isAuthReady check ko hatayein agar aapke paas AuthContext nahi hai
            if (isAuthReady) {
                 try {
                    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
                        headers: getAuthHeaders() // Headers ko hatayein agar aapke paas auth nahi hai
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setEvent(data);
                    } else {
                        toast.error(data.message || "Failed to load event details.");
                        navigate('/admin/events'); // Error hone par wapas list par bhej dein
                    }
                } catch (error) {
                    console.error("Error fetching event details:", error);
                    toast.error("Failed to load event details. Server error.");
                    navigate('/admin/events');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchEventDetails();
    }, [eventId, isAuthReady, getAuthHeaders, navigate]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!event) {
        return <div className="text-center text-red-500 text-lg py-8">Event not found.</div>;
    }

    return (
        <div className="p-6 bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-4">{event.title}</h2>
            <div className="space-y-4 text-gray-300">
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
                <p><strong>Medium:</strong> {event.medium}</p>
                <p><strong>Description:</strong> {event.description}</p>
            </div>
            <button
                className="mt-6 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                onClick={() => navigate('/admin/events')}
            >
                Back to Admin Events
            </button>
        </div>
    );
};

export default AdminEventDetails;
