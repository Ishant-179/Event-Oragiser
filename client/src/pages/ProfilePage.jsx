import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { User, Mail, Shield, LogOut, Phone, BookOpen } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

const ProfilePage = () => {
    const { currentUser, isAuthReady, logout, getAuthHeaders } = useAuth();
    const navigate = useNavigate();

    // प्रोफाइल डेटा, लोडिंग और एरर के लिए नए स्टेट
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // जब component mount होता है, तब backend से डेटा fetch करें
    useEffect(() => {
        // ProtectedRoute पहले ही unauthorized access को रोकता है,
        // लेकिन यह जाँच करना अच्छा अभ्यास है।
        if (!isAuthReady || !currentUser) {
            setLoading(false);
            navigate('/login');
            return;
        }

        const fetchProfileData = async () => {
            try {
                const headers = getAuthHeaders();
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setProfileData(data);
                } else {
                    setError(data.message || 'Failed to fetch profile data.');
                    toast.error(data.message || 'Failed to fetch profile.');
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError('Server error. Could not load profile.');
                toast.error('Server error. Could not load profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [currentUser, isAuthReady, getAuthHeaders, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-center text-white">
                <p className="text-xl">{error}</p>
            </div>
        );
    }
    
    // यदि कोई डेटा नहीं है तो एक fallback message दिखाएं
    if (!profileData) {
        return (
            <div className="flex items-center justify-center min-h-screen text-center text-white">
                <p className="text-xl">Profile data not found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8 min-h-screen">
            <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-8">
                <div className="flex items-center space-x-6 mb-6">
                    <div className="flex-shrink-0">
                        <User className="h-16 w-16 text-green-400 p-2 rounded-full border-2 border-gray-700" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">My Profile</h2>
                        <p className="text-gray-400">Manage your account settings and details.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* User Details Section */}
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Personal Information</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <User className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-300 font-medium">Name:</span>
                                <span className="text-white">{profileData.name}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-300 font-medium">Email:</span>
                                <span className="text-white">{profileData.email}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Shield className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-300 font-medium">Role:</span>
                                <span className="text-white capitalize">{profileData.role}</span>
                            </div>
                            {/* यहाँ और भी फ़ील्ड जोड़ सकते हैं जैसे बायो, फ़ोन नंबर आदि */}
                            {profileData.phone && (
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                    <span className="text-gray-300 font-medium">Phone:</span>
                                    <span className="text-white">{profileData.phone}</span>
                                </div>
                            )}
                            {profileData.bio && (
                                <div className="flex items-center space-x-3">
                                    <BookOpen className="h-5 w-5 text-gray-400" />
                                    <span className="text-gray-300 font-medium">Bio:</span>
                                    <span className="text-white">{profileData.bio}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions Section */}
                    <div className="flex justify-end pt-4 border-t border-gray-700">
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-6 py-3 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors duration-300"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;