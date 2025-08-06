// src/pages/admin/RsvpManagement.jsx
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';

import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

// Backend API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

const RsvpManagement = () => {
    const { isAuthReady, getAuthHeaders } = useContext(AuthContext);
    const [rsvps, setRsvps] = useState([]);
    // CORRECTED LINE: Changed 'true)' to 'useState(true)'
    const [loading, setLoading] = useState(true); 
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [rsvpToUpdate, setRsvpToUpdate] = useState(null);
    const [newRsvpStatus, setNewRsvpStatus] = useState('');

    const fetchRsvps = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/rsvps`, {
                headers: getAuthHeaders()
            });
            const data = await response.json();
            if (response.ok) {
                setRsvps(data);
            } else {
                toast.error(data.message || "Failed to load RSVPs.");
            }
        } catch (error) {
            console.error("Error fetching RSVPs:", error);
            toast.error("Failed to load RSVPs. Server error.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthReady) return;
        fetchRsvps();
    }, [isAuthReady, getAuthHeaders]);

    const openStatusModal = (rsvpId, currentStatus) => {
        setRsvpToUpdate(rsvpId);
        setNewRsvpStatus(currentStatus); // Pre-fill with current status
        setShowStatusModal(true);
    };

    const handleUpdateRsvpStatus = async () => {
        if (!rsvpToUpdate || !newRsvpStatus) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/rsvps/${rsvpToUpdate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify({ status: newRsvpStatus })
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(`RSVP ${newRsvpStatus} successfully!`);
                setRsvps(prevRsvps => prevRsvps.map(rsvp =>
                    rsvp._id === rsvpToUpdate ? { ...rsvp, status: data.status } : rsvp
                ));
                setShowStatusModal(false);
                setRsvpToUpdate(null);
                setNewRsvpStatus('');
            } else {
                toast.error(data.message || `Failed to update RSVP status to ${newRsvpStatus}.`);
            }
        } catch (error) {
            console.error(`Error updating RSVP status to ${newRsvpStatus}:`, error);
            toast.error(`Failed to update RSVP status to ${newRsvpStatus}. Server error.`);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-6 bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Manage RSVPs</h2>
            {rsvps.length > 0 ? (
                <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg text-white">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Event Title</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">User ID</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Status</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rsvps.map(rsvp => (
                                <tr key={rsvp._id} className="border-b border-gray-700 hover:bg-gray-700">
                                    <td className="py-3 px-4 text-gray-200 font-medium">{rsvp.eventTitle || 'N/A'}</td>
                                    <td className="py-3 px-4 text-gray-300">{rsvp.userId && rsvp.userId._id ? rsvp.userId._id.substring(0, 10) + '...' : 'N/A'}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                            ${rsvp.status === 'pending' ? 'bg-yellow-600 text-white' :
                                            rsvp.status === 'accepted' ? 'bg-green-600 text-white' :
                                            'bg-red-600 text-white'}`}>
                                            {rsvp.status.charAt(0).toUpperCase() + rsvp.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex space-x-2">
                                            {rsvp.status === 'pending' && (
                                                <>
                                                    <button
                                                        className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition duration-200"
                                                        onClick={() => openStatusModal(rsvp._id, 'accepted')}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition duration-200"
                                                        onClick={() => openStatusModal(rsvp._id, 'rejected')}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {rsvp.status !== 'pending' && (
                                                <span className="text-gray-400 text-sm">Actioned</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-300 text-lg py-8">No RSVPs to manage.</p>
            )}

            {/* Custom Status Update Modal */}
            {showStatusModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 max-w-sm w-full">
                        <h3 className="text-xl font-bold text-white mb-4">Update RSVP Status</h3>
                        <p className="text-gray-300 mb-6">Are you sure you want to change this RSVP status to "{newRsvpStatus}"?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                                onClick={() => setShowStatusModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                onClick={handleUpdateRsvpStatus}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RsvpManagement;





