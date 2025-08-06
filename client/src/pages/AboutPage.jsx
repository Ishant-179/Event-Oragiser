import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner'; // Assuming you have a LoadingSpinner component

const API_BASE_URL = 'http://localhost:5000/api';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/about`);
        const data = await response.json();

        if (response.ok) {
          setAboutData(data);
        } else {
          setError(data.message || 'Failed to fetch about page data.');
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError('Server error. Could not load about page.');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

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

  if (!aboutData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center text-white">
        <p className="text-xl">No about page data found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 min-h-screen text-gray-200">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-green-400 tracking-tight">
            {aboutData.title}
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            {aboutData.tagline}
          </p>
        </div>

        {/* Image Section */}
        {aboutData.heroImage && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-lg border border-gray-700">
            <img
              src={aboutData.heroImage}
              alt="People at an event"
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Mission Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            {aboutData.missionTitle}
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {aboutData.missionText}
          </p>
        </div>

        {/* Features Section */}
        {aboutData.features && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              {aboutData.featuresTitle}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
              {aboutData.features.map((feature, index) => (
                <li key={index}>**{feature.title}:** {feature.description}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-white mb-4">
            {aboutData.ctaTitle}
          </h3>
          <p className="text-gray-400">
            {aboutData.ctaText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;