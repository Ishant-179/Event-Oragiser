// src/pages/HomePage.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { toast } from 'sonner';

// import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';
// import EventCard from '../components/EventCard';
// import { ParticleCard } from '../components/MagicBento';

// // Backend API Base URL
// const API_BASE_URL = 'http://localhost:5000/api';

// const HomePage = () => {
//     const { isAdmin, isAuthReady, getAuthHeaders } = useContext(AuthContext);
//     const [analytics, setAnalytics] = useState({ totalEvents: 0, totalRsvps: 0, totalUsers: 0 });
//     const [chartData, setChartData] = useState([]);
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     const greenGlowColor = "34, 197, 94";

//     useEffect(() => {
//         if (!isAuthReady) return;

//         const fetchEvents = async () => {
//             try {
//                 const response = await fetch(`${API_BASE_URL}/events`);
//                 const data = await response.json();
//                 if (response.ok) {
//                     setEvents(data);
//                 } else {
//                     toast.error(data.message || "Failed to load events.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching public events:", error);
//                 toast.error("Failed to load events. Server error.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchAnalytics = async () => {
//             if (!isAdmin) return;
//             try {
//                 const response = await fetch(`${API_BASE_URL}/admin/analytics`, {
//                     headers: getAuthHeaders()
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     setAnalytics(data.analytics);
//                     const categoryCounts = {};
//                     data.events.forEach(event => {
//                         const category = event.category || 'Uncategorized';
//                         categoryCounts[category] = (categoryCounts[category] || 0) + 1;
//                     });
//                     const newChartData = Object.keys(categoryCounts).map(category => ({
//                         name: category,
//                         Events: categoryCounts[category]
//                     }));
//                     setChartData(newChartData);
//                 } else {
//                     toast.error(data.message || "Failed to load analytics data.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching analytics:", error);
//                 toast.error("Failed to load analytics data. Server error.");
//             }
//         };

//         fetchEvents();
//         fetchAnalytics();
//     }, [isAdmin, isAuthReady, getAuthHeaders]);

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     const animationStyles = `
//         @keyframes fadeInLeft {
//             from {
//                 opacity: 0;
//                 transform: translateX(-50px);
//             }
//             to {
//                 opacity: 1;
//                 transform: translateX(0);
//             }
//         }

//         @keyframes fadeInRight {
//             from {
//                 opacity: 0;
//                 transform: translateX(50px);
//             }
//             to {
//                 opacity: 1;
//                 transform: translateX(0);
//             }
//         }

//         .animate-fade-in-left {
//             animation: fadeInLeft 1s ease-out forwards;
//         }

//         .animate-fade-in-right {
//             animation: fadeInRight 1s ease-out forwards;
//         }
//     `;

//     return (
//         <div className="min-h-screen">
//             <div className="relative h-[600px] flex items-center justify-center overflow-hidden bg-transparent">
//                 <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 p-6">
//                     <div className="text-center md:text-left animate-fade-in-left">
//                         <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
//                             Host, Connect, Celebrate: <br className="hidden md:inline"/>Your Events, Our Platform!
//                         </h1>
//                         <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
//                             Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.
//                         </p>
//                         <button
//                             onClick={() => navigate('/events')}
//                             className="px-10 py-4 bg-green-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-green-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
//                         >
//                             Explore Now
//                         </button>
//                     </div>
//                     <div className="flex justify-center items-center animate-fade-in-right">
//                         <ParticleCard
//                             className="relative w-full max-w-md md:max-w-lg lg:max-w-xl aspect-video rounded-xl shadow-lg overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500 ease-in-out backdrop-blur-sm"
//                             style={{
//                                 backgroundColor: "rgba(17, 24, 39, 0.7)",
//                                 border: "1px solid rgba(55, 65, 81, 1)",
//                                 "--glow-color": greenGlowColor,
//                                 padding: '1.5rem'
//                             }}
//                             disableAnimations={false}
//                             particleCount={0}
//                             glowColor={greenGlowColor}
//                             enableTilt={true}
//                             clickEffect={false}
//                             enableMagnetism={true}
//                         >
//                             <img
//                                 src="https://imgs.search.brave.com/2a1M8oIBNUlWNMxmn9E5deodRSsZBka8_z6MbV9w2Jg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE4/OTQyMDQxOC9waG90/by9idXNpbmVzc3dv/bWFuLXJldmlld3Mt/Y29uZmVyZW5jZS1z/Y2hlZHVsZS13aXRo/LWNvbGxlYWd1ZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/VUlHb3Q0Ty1KZERK/aHpVUWdCVWFsQ0Y2/T1l2TXJIdXp3QlR1/UUJsaEVSST0"
//                                 alt="Event Collage"
//                                 className="w-full h-full object-cover object-center rounded-lg"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
//                         </ParticleCard>
//                     </div>
//                 </div>
//             </div>

//             <div className="container mx-auto p-6 bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm mt-8 mb-8">
//                 {isAdmin && (
//                     <>
//                         <hr className="my-8 border-t-2 border-gray-700" />
//                         <h2 className="text-3xl font-bold text-white mb-6 text-center">Admin Dashboard Overview</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//                             <ParticleCard
//                                 className="card card--text-autohide card--border-glow"
//                                 style={{
//                                     backgroundColor: "#001006",
//                                     "--glow-color": greenGlowColor,
//                                     minHeight: '180px'
//                                 }}
//                                 disableAnimations={false}
//                                 particleCount={12}
//                                 glowColor={greenGlowColor}
//                                 enableTilt={true}
//                                 clickEffect={true}
//                                 enableMagnetism={true}
//                             >
//                                 <div className="card__header">
//                                     <div className="card__label text-gray-300">Total Events</div>
//                                 </div>
//                                 <div className="card__content">
//                                     <h3 className="card__title text-4xl font-extrabold text-green-400">{analytics.totalEvents}</h3>
//                                     <p className="card__description text-gray-400">Number of events created</p>
//                                 </div>
//                             </ParticleCard>
//                             <ParticleCard
//                                 className="card card--text-autohide card--border-glow"
//                                 style={{
//                                     backgroundColor: "#001006",
//                                     "--glow-color": greenGlowColor,
//                                     minHeight: '180px'
//                                 }}
//                                 disableAnimations={false}
//                                 particleCount={12}
//                                 glowColor={greenGlowColor}
//                                 enableTilt={true}
//                                 clickEffect={true}
//                                 enableMagnetism={true}
//                             >
//                                 <div className="card__header">
//                                     <div className="card__label text-gray-300">Total RSVPs</div>
//                                 </div>
//                                 <div className="card__content">
//                                     <h3 className="card__title text-4xl font-extrabold text-green-400">{analytics.totalRsvps}</h3>
//                                     <p className="card__description text-gray-400">Total registrations across all events</p>
//                                 </div>
//                             </ParticleCard>
//                             <ParticleCard
//                                 className="card card--text-autohide card--border-glow"
//                                 style={{
//                                     backgroundColor: "#001006",
//                                     "--glow-color": greenGlowColor,
//                                     minHeight: '180px'
//                                 }}
//                                 disableAnimations={false}
//                                 particleCount={12}
//                                 glowColor={greenGlowColor}
//                                 enableTilt={true}
//                                 clickEffect={true}
//                                 enableMagnetism={true}
//                             >
//                                 <div className="card__header">
//                                     <div className="card__label text-gray-300">Total Users</div>
//                                 </div>
//                                 <div className="card__content">
//                                     <h3 className="card__title text-4xl font-extrabold text-green-400">{analytics.totalUsers}</h3>
//                                     <p className="card__description text-gray-400">Registered users on the platform</p>
//                                 </div>
//                             </ParticleCard>
//                         </div>

//                         <h3 className="text-2xl font-bold text-white mb-6 text-center">Events by Category</h3>
//                         <div className="p-6 bg-gray-800/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm mb-12">
//                             <ResponsiveContainer width="100%" height={300}>
//                                 <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                                     <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} tick={{ fontSize: 12, fill: '#E5E7EB' }} />
//                                     <YAxis tick={{ fill: '#E5E7EB' }} />
//                                     <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#E5E7EB' }} />
//                                     <Legend wrapperStyle={{ color: '#E5E7EB' }} />
//                                     <Bar dataKey="Events" fill="#22C55E" radius={[10, 10, 0, 0]} />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </>
//                 )}

//                 <hr className="my-8 border-t-2 border-gray-700" />
//                 <h2 className="text-3xl font-bold text-white mb-6 text-center">Upcoming Events</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {events.length > 0 ? (
//                         events.map(event => (
//                             <EventCard key={event._id} event={event} />
//                         ))
//                     ) : (
//                         <p className="col-span-full text-center text-gray-300 text-lg">No events found. Check back later!</p>
//                     )}
//                 </div>
//             </div>
//             {/* CSS for animations */}
//             <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
//         </div>
//     );
// };

// export default HomePage;








// src/pages/HomePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { SparklesCore } from '../components/ui/Sparkles';

import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import EventCard from '../components/EventCard';
import { ParticleCard } from '../components/MagicBento';

// Backend API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

const HomePage = () => {
    const { isAdmin, isAuthReady, getAuthHeaders, isAuthenticated } = useContext(AuthContext);
    const [analytics, setAnalytics] = useState({ totalEvents: 0, totalRsvps: 0, totalUsers: 0 });
    const [chartData, setChartData] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const greenGlowColor = "34, 197, 94";

    useEffect(() => {
        if (!isAuthReady) return;

        const fetchEvents = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/events`);
                const data = await response.json();
                if (response.ok) {
                    setEvents(data);
                } else {
                    toast.error(data.message || "Failed to load events.");
                }
            } catch (error) {
                console.error("Error fetching public events:", error);
                toast.error("Failed to load events. Server error.");
            } finally {
                setLoading(false);
            }
        };

        const fetchAnalytics = async () => {
            if (!isAdmin) return;
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/analytics`, {
                    headers: getAuthHeaders()
                });
                const data = await response.json();
                if (response.ok) {
                    setAnalytics(data.analytics);
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
            }
        };

        fetchEvents();
        fetchAnalytics();
    }, [isAdmin, isAuthReady, getAuthHeaders]);

    if (loading) {
        return <LoadingSpinner />;
    }

    const animationStyles = `
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .animate-fade-in-left {
            animation: fadeInLeft 1s ease-out forwards;
        }

        .animate-fade-in-right {
            animation: fadeInRight 1s ease-out forwards;
        }
    `;

    // New "Why Choose Us" section content
    const whyChooseUsSection = (
        <div className="bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm p-8 mb-8 relative overflow-hidden">
            <h2 className="text-3xl font-bold text-green-400 mb-4 text-center">Why Choose Us?</h2>
            <p className="text-lg text-gray-300 mb-8 text-center max-w-2xl mx-auto">
                Discover a seamless event experience with a platform designed for both hosts and attendees.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-gray-800/70 rounded-lg border border-gray-700 hover:border-green-500 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-white mb-2">Easy Event Creation</h3>
                    <p className="text-gray-400">Host your own events in minutes with our intuitive interface.</p>
                </div>
                <div className="p-4 bg-gray-800/70 rounded-lg border border-gray-700 hover:border-green-500 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-white mb-2">Effortless RSVP Management</h3>
                    <p className="text-gray-400">Track attendees and manage your guest list with ease.</p>
                </div>
                <div className="p-4 bg-gray-800/70 rounded-lg border border-gray-700 hover:border-green-500 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-white mb-2">Discover New Connections</h3>
                    <p className="text-gray-400">Find and register for amazing events in our vibrant community.</p>
                </div>
            </div>
            <div className="w-full h-full absolute inset-0 -z-10 opacity-30">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            <div className="relative h-[600px] flex items-center justify-center overflow-hidden bg-transparent">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 p-6">
                    <div className="text-center md:text-left animate-fade-in-left">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
                            Host, Connect, Celebrate: <br className="hidden md:inline"/>Your Events, Our Platform!
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                            Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.
                        </p>
                        <button
                            onClick={() => navigate('/events')}
                            className="px-10 py-4 bg-green-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-green-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                        >
                            Explore Now
                        </button>
                    </div>
                    <div className="flex justify-center items-center animate-fade-in-right">
                        <ParticleCard
                            className="relative w-full max-w-md md:max-w-lg lg:max-w-xl aspect-video rounded-xl shadow-lg overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500 ease-in-out backdrop-blur-sm"
                            style={{
                                backgroundColor: "rgba(17, 24, 39, 0.7)",
                                border: "1px solid rgba(55, 65, 81, 1)",
                                "--glow-color": greenGlowColor,
                                padding: '1.5rem'
                            }}
                            disableAnimations={false}
                            particleCount={0}
                            glowColor={greenGlowColor}
                            enableTilt={true}
                            clickEffect={false}
                            enableMagnetism={true}
                        >
                            <img
                                src="https://imgs.search.brave.com/2a1M8oIBNUlWNMxmn9E5deodRSsZBka8_z6MbV9w2Jg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE4/OTQyMDQxOC9waG90/by9idXNpbmVzc3dv/bWFuLXJldmlld3Mt/Y29uZmVyZW5jZS1z/Y2hlZHVsZS13aXRo/LWNvbGxlYWd1ZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/VUlHb3Q0Ty1KZERK/aHpVUWdCVWFsQ0Y2/T1l2TXJIdXp3QlR1/UUJsaEVSST0"
                                alt="Event Collage"
                                className="w-full h-full object-cover object-center rounded-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                        </ParticleCard>
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-6 mt-8 mb-8">
                {isAdmin ? (
                    <div className="bg-gray-900/70 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm p-6 mb-8">
                        <hr className="my-8 border-t-2 border-gray-700" />
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">Admin Dashboard Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <ParticleCard
                                className="card card--text-autohide card--border-glow"
                                style={{
                                    backgroundColor: "#001006",
                                    "--glow-color": greenGlowColor,
                                    minHeight: '180px'
                                }}
                                disableAnimations={false}
                                particleCount={12}
                                glowColor={greenGlowColor}
                                enableTilt={true}
                                clickEffect={true}
                                enableMagnetism={true}
                            >
                                <div className="card__header">
                                    <div className="card__label text-gray-300">Total Events</div>
                                </div>
                                <div className="card__content">
                                    <h3 className="card__title text-4xl font-extrabold text-green-400">{analytics.totalEvents}</h3>
                                    <p className="card__description text-gray-400">Number of events created</p>
                                </div>
                            </ParticleCard>
                            <ParticleCard
                                className="card card--text-autohide card--border-glow"
                                style={{
                                    backgroundColor: "#001006",
                                    "--glow-color": greenGlowColor,
                                    minHeight: '180px'
                                }}
                                disableAnimations={false}
                                particleCount={12}
                                glowColor={greenGlowColor}
                                enableTilt={true}
                                clickEffect={true}
                                enableMagnetism={true}
                            >
                                <div className="card__header">
                                    <div className="card__label text-gray-300">Total RSVPs</div>
                                </div>
                                <div className="card__content">
                                    <h3 className="card__title text-4xl font-extrabold text-green-400">{analytics.totalRsvps}</h3>
                                    <p className="card__description text-gray-400">Total registrations across all events</p>
                                </div>
                            </ParticleCard>
                            <ParticleCard
                                className="card card--text-autohide card--border-glow"
                                style={{
                                    backgroundColor: "#001006",
                                    "--glow-color": greenGlowColor,
                                    minHeight: '180px'
                                }}
                                disableAnimations={false}
                                particleCount={12}
                                glowColor={greenGlowColor}
                                enableTilt={true}
                                clickEffect={true}
                                enableMagnetism={true}
                            >
                                <div className="card__header">
                                    <div className="card__label text-gray-300">Total Users</div>
                                </div>
                                <div className="card__content">
                                    <h3 className="card__title text-4xl font-extrabold text-green-400">{analytics.totalUsers}</h3>
                                    <p className="card__description text-gray-400">Registered users on the platform</p>
                                </div>
                            </ParticleCard>
                        </div>
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
                ) : (
                    <>{whyChooseUsSection}</>
                )}

                <hr className="my-8 border-t-2 border-gray-700" />
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.slice(0, 3).length > 0 ? (
                        events.slice(0, 3).map(event => (
                            <EventCard key={event._id} event={event} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-300 text-lg">No events found. Check back later!</p>
                    )}
                </div>
                {events.length > 3 && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => navigate('/events')}
                            className="px-8 py-3 bg-green-600 text-white rounded-full font-bold text-md shadow-xl hover:bg-green-700 transition duration-300 transform hover:scale-105"
                        >
                            Show All Events
                        </button>
                    </div>
                )}
            </div>
            {/* CSS for animations */}
            <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
        </div>
    );
};

export default HomePage;