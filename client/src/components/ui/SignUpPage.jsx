// src/components/ui/SignUpPage.jsx

import React, { useState } from 'react';
import { Button } from './Button'; // Assuming you have a Button component
import { Input } from './Input'; // Assuming you have an Input component
import { Label } from './label';

export const SignUpPage = ({
    title,
    description,
    heroImageSrc,
    onSignUp,
    onGoogleSignUp,
    onLogin,
    loading
}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSignUp(name, email, password);
    };

    return (
        <div className="relative min-h-screen bg-gray-950 text-gray-50 flex items-center justify-center">
            {/* Hero Section */}
            <div className="absolute inset-0 z-0">
                <img
                    alt="Hero"
                    src={heroImageSrc}
                    className="h-full w-full object-cover opacity-20"
                />
            </div>
            
            <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col md:flex-row items-center justify-center min-h-screen">
                {/* Left Side: Form */}
                <div className="w-full md:w-1/2 lg:w-2/5 p-8 md:p-12 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl backdrop-filter backdrop-blur-sm bg-opacity-70">
                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold text-white">{title}</h1>
                        <p className="mt-2 text-gray-300">{description}</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>

                    <div className="mt-6 space-y-4">
                        <div className="relative text-center">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-700" />
                            </div>
                            <div className="relative inline-block px-4 bg-gray-900 text-sm text-gray-500">
                                OR
                            </div>
                        </div>
                        <Button
                            variant="secondary"
                            onClick={onGoogleSignUp}
                            className="w-full bg-gray-700 text-gray-50 hover:bg-gray-600"
                        >
                            Continue with Google
                        </Button>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <button
                            onClick={onLogin}
                            className="font-medium text-green-400 hover:text-green-300"
                        >
                            Log in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};