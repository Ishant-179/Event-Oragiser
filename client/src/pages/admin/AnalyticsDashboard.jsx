// src/pages/admin/AnalyticsDashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ParticleCard } from '../../components/MagicBento'; // ParticleCard को MagicBento से इम्पोर्ट करें

// Backend API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

const AnalyticsDashboard = () => {
    const { isAdmin, isAuthReady, getAuthHeaders } = useContext(AuthContext);
    const [analytics, setAnalytics] = useState({ totalEvents: 0, totalRsvps: 0, totalUsers: 0 });
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Define the green glow color for the cards
    const greenGlowColor = "34, 197, 94"; // RGB for Tailwind green-500

    useEffect(() => {
        if (!isAuthReady) return;

        const fetchAnalytics = async () => {
            if (!isAdmin) {
                setLoading(false);
                return; // Only fetch analytics if user is admin
            }
            try {
                const response = await fetch(`${API_BASE_URL}/admin/analytics`, {
                    headers: getAuthHeaders()
                });
                const data = await response.json();
                if (response.ok) {
                    setAnalytics(data.analytics);
                    // Prepare chart data (example: events by category)
                    const categoryCounts = {};
                    data.events.forEach(event => {
                        const category = event.category || 'Uncategorized';
                        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
                    });
                    const newChartData = Object.keys(categoryCounts).map(category => ({
                        name: category,
                        Events: categoryCounts[category]
                    }));
                    setChartData(newChartData);
                } else {
                    toast.error(data.message || "Failed to load analytics data.");
                }
            } catch (error) {
                console.error("Error fetching analytics:", error);
                toast.error("Failed to load analytics data. Server error.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [isAdmin, isAuthReady, getAuthHeaders]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-6 bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Analytics </h2>

            

            <h3 className="text-2xl font-bold text-white mb-6 text-center">Events by Category</h3>
            <div className="p-6 bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} tick={{ fontSize: 12, fill: '#E5E7EB' }} />
                        <YAxis tick={{ fill: '#E5E7EB' }} />
                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#E5E7EB' }} />
                        <Legend wrapperStyle={{ color: '#E5E7EB' }} />
                        <Bar dataKey="Events" fill="#22C55E" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;







// {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//                 {/* Total Events Card */}
//                 <ParticleCard
//                     className="card card--text-autohide card--border-glow"
//                     style={{
//                         backgroundColor: "#001006", // Dark green background for the card
//                         "--glow-color": greenGlowColor,
//                         minHeight: '180px' // Adjusted min-height
//                     }}
//                     disableAnimations={false}
//                     particleCount={12}
//                     glowColor={greenGlowColor}
//                     enableTilt={true}
//                     clickEffect={true}
//                     enableMagnetism={true}
//                 >
//                     <div className="card__header">
//                         <div className="card__label">Total Events</div>
//                     </div>
//                     <div className="card__content">
//                         <h2 className="card__title text-4xl font-extrabold text-green-400">{analytics.totalEvents}</h2> {/* Adjusted font size */}
//                         <p className="card__description">Number of events created</p>
//                     </div>
//                 </ParticleCard>

//                 {/* Total RSVPs Card */}
//                 <ParticleCard
//                     className="card card--text-autohide card--border-glow"
//                     style={{
//                         backgroundColor: "#001006", // Dark green background for the card
//                         "--glow-color": greenGlowColor,
//                         minHeight: '180px' // Adjusted min-height
//                     }}
//                     disableAnimations={false}
//                     particleCount={12}
//                     glowColor={greenGlowColor}
//                     enableTilt={true}
//                     clickEffect={true}
//                     enableMagnetism={true}
//                 >
//                     <div className="card__header">
//                         <div className="card__label">Total RSVPs</div>
//                     </div>
//                     <div className="card__content">
//                         <h2 className="card__title text-4xl font-extrabold text-green-400">{analytics.totalRsvps}</h2> {/* Adjusted font size */}
//                         <p className="card__description">Total registrations across all events</p>
//                     </div>
//                 </ParticleCard>

//                 {/* Total Users Card */}
//                 <ParticleCard
//                     className="card card--text-autohide card--border-glow"
//                     style={{
//                         backgroundColor: "#001006", // Dark green background for the card
//                         "--glow-color": greenGlowColor,
//                         minHeight: '180px' // Adjusted min-height
//                     }}
//                     disableAnimations={false}
//                     particleCount={12}
//                     glowColor={greenGlowColor}
//                     enableTilt={true}
//                     clickEffect={true}
//                     enableMagnetism={true}
//                 >
//                     <div className="card__header">
//                         <div className="card__label">Total Users</div>
//                     </div>
//                     <div className="card__content">
//                         <h2 className="card__title text-4xl font-extrabold text-green-400">{analytics.totalUsers}</h2> {/* Adjusted font size */}
//                         <p className="card__description">Registered users on the platform</p>
//                     </div>
//                 </ParticleCard>
//             </div>  */}
