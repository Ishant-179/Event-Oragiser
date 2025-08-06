// src/pages/LoginPage.jsx (Corrected useEffect)
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import { AuthContext } from '../context/AuthContext';
import { SignInPage } from '../components/ui/SignInPage';

const LoginPage = () => {
    const { login, loading, isAuthReady, currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already logged in, check user role
    useEffect(() => {
        if (isAuthReady && currentUser) {
             console.log('Current User Role:', currentUser.role)
            // Check if the user is an admin
            if (currentUser.role === 'admin') {
                navigate('/admin/dashboard'); // Redirect to admin page
            } else {
                const redirectTo = location.state?.redirectTo || '/';
                navigate(redirectTo);
            }
            toast.info("You are already logged in.");
        }
    }, [isAuthReady, currentUser, navigate, location.state]);

    // ... (rest of the code is correct)

    const handleSignIn = async (email, password) => {
        const success = await login(email, password);
        // Redirection is handled by the useEffect after successful login
        return success;
    };

    const handleGoogleSignIn = () => {
        toast.info("Google Sign In functionality coming soon!");
    };

    const handleResetPassword = () => {
        toast.info("Reset Password functionality coming soon!");
    };

    const handleCreateAccount = () => {
        navigate('/signup');
    };

    return (
        <SignInPage
            // ... (props are correct)
            onSignIn={handleSignIn}
            onGoogleSignIn={handleGoogleSignIn}
            onResetPassword={handleResetPassword}
            onCreateAccount={handleCreateAccount}
            loading={loading}
        />
    );
};

export default LoginPage;