// Example: routes/contentRoutes.js

const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
    // यहाँ आप डेटाबेस से या एक स्टैटिक JSON फ़ाइल से डेटा ला सकते हैं
    const aboutData = {
        title: "About EventHub",
        tagline: "Connecting communities through seamless event management.",
        heroImage: "https://imgs.search.brave.com/GA_7-8WUu_Ua7SmLbF4n-DdYwHIVk08gAERGajZ5NAc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTQv/MTQwLzUwNS9zbWFs/bC9jcm93ZC1nYXRo/ZXJzLWF0LWxpdmVs/eS1ldmVudC1pbi1h/LWJ1c3RsaW5nLXZl/bnVlLWZlYXR1cmlu/Zy1icmlnaHQtbGln/aHRzLWFuZC1hLXZp/YnJhbnQtYXRtb3Nw/aGVyZS1waG90by5q/cGVn",
        missionTitle: "Our Mission",
        missionText: "Our mission is to simplify event planning and management for everyone. We believe that bringing people together should be easy and stress-free. Whether you're organizing a small community gathering or a large conference, EventHub provides you with all the tools you need to create, promote, and manage your events efficiently.",
        featuresTitle: "What We Offer",
        features: [
            { title: "Intuitive Event Creation", description: "Easily create events with all the necessary details." },
            { title: "Hassle-Free RSVP", description: "Allow guests to RSVP and keep track of attendance." },
            { title: "Personalized User Profiles", description: "Manage your created and upcoming events in one place." },
            { title: "Admin Tools", description: "Powerful tools for administrators to oversee and manage all events." }
        ],
        ctaTitle: "Join the Community",
        ctaText: "Start creating your own events or discover exciting new ones happening near you."
    };
    res.json(aboutData);
});

module.exports = router;