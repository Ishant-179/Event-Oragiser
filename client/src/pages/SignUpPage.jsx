// src/pages/SignupPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '../context/AuthContext';
import { SignUpPage as SignUpPageComponent } from '../components/ui/SignUpPage'; // Import the UI component

const SignupPage = () => {
    const { signup, isAuthReady, currentUser, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthReady && currentUser) {
            const redirectTo = location.state?.redirectTo || '/';
            navigate(redirectTo);
            toast.info("You are already logged in.");
        }
    }, [isAuthReady, currentUser, navigate, location.state]);


    const handleSignUp = async (name, email, password) => {
        const success = await signup(name, email, password);
        return success;
    };


    const handleGoogleSignIn = () => {
        toast.info("Google Sign Up functionality coming soon!");
        console.log("Continue with Google clicked");
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <SignUpPageComponent
            title={<span className="font-light text-gray-50 tracking-tighter">Create Your Account</span>}
            description="Join us to manage your events and stay connected with your community"
            heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
            onSignUp={handleSignUp}
            onGoogleSignUp={handleGoogleSignIn}
            onLogin={handleLogin}
            loading={loading}
        />
    );
};

export default SignupPage;