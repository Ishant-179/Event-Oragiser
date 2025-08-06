// src/components/ui/SignInPage.jsx
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // For password visibility toggle
import { toast } from 'sonner'; // For notifications
import { Link } from 'react-router-dom';

// --- HELPER COMPONENTS (ICONS) ---

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
    </svg>
);

// --- TYPE DEFINITIONS (Now as JSDoc for JS compatibility) ---
/**
 * @typedef {Object} Testimonial
 * @property {string} avatarSrc
 * @property {string} name
 * @property {string} handle
 * @property {string} text
 */

/**
 * @typedef {Object} SignInPageProps
 * @property {React.ReactNode} [title]
 * @property {React.ReactNode} [description]
 * @property {string} [heroImageSrc]
 * @property {Testimonial[]} [testimonials]
 * @property {(email: string, password: string) => Promise<boolean>} onSignIn
 * @property {() => void} [onGoogleSignIn]
 * @property {() => void} [onResetPassword]
 * @property {() => void} [onCreateAccount]
 * @property {boolean} loading
 */

// --- SUB-COMPONENTS ---

// Wrapper for input fields to give them a "glass" effect
const GlassInputWrapper = ({ children }) => (
    // Tailwind classes mapped to dark theme:
    // border-gray-700 for border-border
    // bg-gray-800/50 for bg-foreground/5 (slightly transparent dark)
    // focus-within:border-green-400/70 for focus-within:border-violet-400/70
    // focus-within:bg-green-500/10 for focus-within:bg-violet-500/10
    <div className="rounded-2xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm transition-colors focus-within:border-green-400/70 focus-within:bg-green-500/10">
        {children}
    </div>
);

// Card component for displaying individual testimonials
const TestimonialCard = ({ testimonial, delay }) => (
    <div className={`animate-testimonial ${delay} flex items-start gap-3 rounded-3xl bg-gray-800/40 backdrop-blur-xl border border-white/10 p-5 w-64`}>
        <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-2xl" alt="avatar" />
        <div className="text-sm leading-snug">
            <p className="flex items-center gap-1 font-medium text-gray-50">{testimonial.name}</p> {/* text-foreground */}
            <p className="text-gray-400">{testimonial.handle}</p> {/* text-muted-foreground */}
            <p className="mt-1 text-gray-200">{testimonial.text}</p> {/* text-foreground/80 */}
        </div>
    </div>
);

// --- MAIN COMPONENT ---

/** @type {React.FC<SignInPageProps>} */
export const SignInPage = ({
    title = <span className="font-light text-gray-50 tracking-tighter">Welcome</span>, // text-foreground
    description = "Access your account and continue your journey with us",
    heroImageSrc = "https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80", // Default image
    testimonials = [], // Default empty array, this will be used for rendering
    onSignIn,
    onGoogleSignIn,
    onResetPassword,
    onCreateAccount,
    loading, // Destructure loading prop
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(''); // Internal state for email
    const [password, setPassword] = useState(''); // Internal state for password

    const handleFormSubmit = async (e) => { // Removed type annotation for 'e'
        e.preventDefault();
        // Call the passed onSignIn function with email and password
        if (onSignIn) {
            await onSignIn(email, password);
        }
    };

    return (
        // Main container with dark background (bg-background)
        <div className="h-[100dvh] flex flex-col md:flex-row font-inter w-[100dvw] bg-gray-950 text-gray-50"> {/* Mapped bg-background to bg-gray-950, text-foreground to text-gray-50 */}
            {/* Left column: sign-in form */}
            <section className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="flex flex-col gap-6">
                        <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">{title}</h1>
                        <p className="animate-element animate-delay-200 text-gray-400">{description}</p> {/* text-muted-foreground */}

                        <form className="space-y-5" onSubmit={handleFormSubmit}>
                            <div className="animate-element animate-delay-300">
                                <label className="text-sm font-medium text-gray-400">Email Address</label> {/* text-muted-foreground */}
                                <GlassInputWrapper>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-gray-50 placeholder-gray-500" // text-foreground, placeholder-gray-500
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element animate-delay-400">
                                <label className="text-sm font-medium text-gray-400">Password</label> {/* text-muted-foreground */}
                                <GlassInputWrapper>
                                    <div className="relative">
                                        <input
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none text-gray-50 placeholder-gray-500" // text-foreground, placeholder-gray-500
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                                            {showPassword ? <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-50 transition-colors" /> : <Eye className="w-5 h-5 text-gray-400 hover:text-gray-50 transition-colors" />} {/* text-muted-foreground, text-foreground */}
                                        </button>
                                    </div>
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element animate-delay-500 flex items-center justify-between text-sm">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="rememberMe" className="custom-checkbox" />
                                    <span className="text-gray-200">Keep me signed in</span> {/* text-foreground/90 */}
                                </label>
                                <a href="#" onClick={(e) => { e.preventDefault(); onResetPassword?.(); toast.info("Reset password functionality coming soon!"); }} className="hover:underline text-green-400 transition-colors">Reset password</a> {/* text-violet-400 mapped to text-green-400 */}
                            </div>

                            <button
                                type="submit"
                                className="animate-element animate-delay-600 w-full rounded-2xl bg-green-600 py-4 font-medium text-white hover:bg-green-700 transition-colors" // bg-primary mapped to bg-green-600, text-primary-foreground to text-white
                                disabled={loading}
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="animate-element animate-delay-700 relative flex items-center justify-center">
                            <span className="w-full border-t border-gray-700"></span> {/* border-border mapped to border-gray-700 */}
                            <span className="px-4 text-sm text-gray-400 bg-gray-950 absolute">Or continue with</span> {/* text-muted-foreground, bg-background */}
                        </div>

                        <button
                            onClick={() => { onGoogleSignIn?.(); toast.info("Google Sign In functionality coming soon!"); }}
                            className="animate-element animate-delay-800 w-full flex items-center justify-center gap-3 border border-gray-700 rounded-2xl py-4 text-gray-50 hover:bg-gray-800 transition-colors" // border-border, text-foreground, hover:bg-secondary
                        >
                            <GoogleIcon />
                            Continue with Google
                        </button>

                        <p className="animate-element animate-delay-900 text-center text-sm text-gray-400"> 
                            New to our platform? <Link to="/signup" onClick={(e) => { e.preventDefault(); onCreateAccount?.(); toast.info("Create Account functionality coming soon!"); }} className="text-green-400 hover:underline transition-colors">Create Account</Link> 
                        </p>
                    </div>
                </div>
            </section>

            {/* Right column: hero image + testimonials */}
            {heroImageSrc && (
                <section className="hidden md:block flex-1 relative p-4">
                    <div className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${heroImageSrc})` }}></div>
                    {/* Now using the 'testimonials' prop passed to the component */}
                    {testimonials.length > 0 && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
                            <TestimonialCard testimonial={testimonials[0]} delay="animate-delay-1000" />
                            {testimonials[1] && <div className="hidden xl:flex"><TestimonialCard testimonial={testimonials[1]} delay="animate-delay-1200" /></div>}
                            {testimonials[2] && <div className="hidden 2xl:flex"><TestimonialCard testimonial={testimonials[2]} delay="animate-delay-1400" /></div>}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};
