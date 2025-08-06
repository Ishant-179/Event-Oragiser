// src/pages/EventListPage.jsx
import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import EventCard from '../components/EventCard';
import { GlowCard } from '../components/GlowCard';

// Backend API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Event List Page component
const EventListPage = () => {
    const { isAdmin, isAuthReady, getAuthHeaders } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedMedium, setSelectedMedium] = useState('All');
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const filterDropdownRef = useRef(null);

    useEffect(() => {
        if (!isAuthReady) return;

        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/events`);
                const data = await response.json();
                if (response.ok) {
                    setEvents(data);
                } else {
                    toast.error(data.message || "Failed to load events.");
                }
            } catch (error) {
                console.error("Error fetching events:", error);
                toast.error("Failed to load events. Server error.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [isAuthReady]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
                setIsFilterDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const categories = useMemo(() => {
        const uniqueCategories = new Set(events.map(event => event.category).filter(Boolean));
        return ['All', ...Array.from(uniqueCategories).sort()];
    }, [events]);

    const filteredEvents = useMemo(() => {
        let currentEvents = events;
        if (searchTerm) {
            currentEvents = currentEvents.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedCategory !== 'All') {
            currentEvents = currentEvents.filter(event => event.category === selectedCategory);
        }
        if (selectedMedium !== 'All') {
            currentEvents = currentEvents.filter(event => event.medium === selectedMedium);
        }
        return currentEvents;
    }, [events, searchTerm, selectedCategory, selectedMedium]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto p-6 min-h-screen mt-4 max-w-7xl">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-4xl font-extrabold text-white text-center sm:text-left flex-grow">All Events</h1>
                {isAdmin && (
                    <Link
                        to="/create-event"
                        className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 font-semibold flex items-center justify-center w-full sm:w-auto whitespace-nowrap"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        Create New Event
                    </Link>
                )}
            </div>

            <GlowCard
                glowColor="green"
                className="flex flex-col bg-gray-900 p-6 rounded-xl mb-8 gap-4"
                customSize={true}
                width="100%"
                height="auto"
            >
                <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 mb-4">
                    <div className="relative w-full md:w-fit md:flex-shrink-0" ref={filterDropdownRef}>
                        <button
                            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                            className="bg-gray-700 text-gray-100 px-6 py-3 rounded-full shadow-sm hover:bg-gray-600 transition duration-200 flex items-center justify-center w-full font-semibold"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                            Categories & Filters
                            <svg className={`w-4 h-4 ml-2 transition-transform ${isFilterDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>

                        {isFilterDropdownOpen && (
                            <div className="absolute z-10 mt-2 w-full md:w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-4 animate-fade-in-down">
                                <div className="mb-4">
                                    <label htmlFor="categoryFilter" className="block text-gray-300 text-sm font-medium mb-2">Filter by Category</label>
                                    <select
                                        id="categoryFilter"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500 transition duration-200 bg-gray-700 text-gray-100"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="mediumFilter" className="block text-gray-300 text-sm font-medium mb-2">Filter by Medium</label>
                                    <select
                                        id="mediumFilter"
                                        value={selectedMedium}
                                        onChange={(e) => setSelectedMedium(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500 transition duration-200 bg-gray-700 text-gray-100"
                                    >
                                        <option value="All">All</option>
                                        <option value="Online">Online</option>
                                        <option value="In Person">In Person</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full md:flex-1 md:min-w-0">
                        <label htmlFor="search" className="block text-gray-700 text-sm font-medium mb-2 sr-only">Search Events</label>
                        <input
                            type="text"
                            id="search"
                            placeholder="Search by title or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 shadow-sm bg-gray-700 text-gray-100 placeholder-gray-400"
                        />
                    </div>
                </div>

                <div className="w-full text-center text-gray-300 text-lg p-4 bg-gray-800 rounded-lg border border-gray-700 flex flex-col items-center justify-center">
                    <svg className="w-8 h-8 text-green-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p className="font-semibold mb-1">Discover the perfect events for you!</p>
                    <p className="text-sm text-gray-400">Use the filters and search bar above to find your next exciting adventure.</p>
                </div>
            </GlowCard>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-6">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <EventCard key={event._id} event={event} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-300 text-lg py-8">No events found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default EventListPage;