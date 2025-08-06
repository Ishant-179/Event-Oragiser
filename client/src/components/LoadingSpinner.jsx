// src/components/LoadingSpinner.jsx
import React from 'react';

// A simple loading spinner component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-lg text-gray-700">Loading...</p>
    </div>
);

export default LoadingSpinner;
