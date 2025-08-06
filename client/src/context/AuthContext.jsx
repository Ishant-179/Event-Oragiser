// // // src/AuthContext.jsx
// // import React, { useState, useEffect, createContext } from 'react';
// // import { toast } from 'sonner'; // Import toast for notifications

// // // Backend API Base URL
// // const API_BASE_URL = 'http://localhost:5000/api';

// // // Create the authentication context
// // export const AuthContext = createContext(null);

// // // AuthProvider component to manage authentication state
// // export const AuthProvider = ({ children }) => {
// //     const [currentUser, setCurrentUser] = useState(null);
// //     const [userId, setUserId] = useState(null);
// //     const [isAdmin, setIsAdmin] = useState(false);
// //     const [isAuthReady, setIsAuthReady] = useState(false);
// //     const [loading, setLoading] = useState(true);

// //     // Function to set user data from a JWT token
// //     const setUserFromToken = (token) => {
// //         if (token) {
// //             try {
// //                 // Decode the JWT payload to get user information and roles
// //                 const payload = JSON.parse(atob(token.split('.')[1]));
// //                 setCurrentUser({ uid: payload.userId, email: payload.email });
// //                 setUserId(payload.userId);
// //                 setIsAdmin(payload.isAdmin || false); // Set isAdmin flag from token
// //                 localStorage.setItem('token', token); // Store token in local storage
// //             } catch (e) {
// //                 console.error("Error decoding token:", e);
// //                 setCurrentUser(null);
// //                 setUserId(null);
// //                 setIsAdmin(false);
// //                 localStorage.removeItem('token'); // Clear invalid token
// //                 toast.error("Invalid session. Please log in again.");
// //             }
// //         } else {
// //             // Clear user state if no token is provided
// //             setCurrentUser(null);
// //             setUserId(null);
// //             setIsAdmin(false);
// //             localStorage.removeItem('token');
// //         }
// //         setIsAuthReady(true);
// //         setLoading(false);
// //     };

// //     // Effect to check for existing token on component mount
// //     useEffect(() => {
// //         const token = localStorage.getItem('token');
// //         if (token) {
// //             setUserFromToken(token);
// //         } else {
// //             setIsAuthReady(true);
// //             setLoading(false);
// //         }
// //     }, []);

// //     // Handle user login
// //     const handleLogin = async (email, password) => {
// //         setLoading(true);
// //         try {
// //             const response = await fetch(`${API_BASE_URL}/auth/login`, {
// //                 method: 'POST',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify({ email, password }),
// //             });

// //             const data = await response.json();

// //             if (response.ok) {
// //                 setUserFromToken(data.token);
// //                 toast.success("Login successful!");
// //                 return true;
// //             } else {
// //                 toast.error(data.message || "Login failed.");
// //                 return false;
// //             }
// //         } catch (e) {
// //             console.error("Login error:", e);
// //             toast.error("Login failed. Could not connect to server.");
// //             return false;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // Handle user logout
// //     const handleLogout = async () => {
// //         setLoading(true);
// //         try {
// //             // In a real application, you might send a request to invalidate the token on the server
// //             // For simplicity, we just clear the client-side state and token
// //             setUserFromToken(null);
// //             toast.info("Logged out successfully.");
// //             return true;
// //         } catch (e) {
// //             console.error("Logout error:", e);
// //             toast.error("Logout failed.");
// //             return false;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // Helper function to get authorization headers for API requests
// //     const getAuthHeaders = () => {
// //         const token = localStorage.getItem('token');
// //         return token ? { 'Authorization': `Bearer ${token}` } : {};
// //     };

// //     const useNavigate = () => {
// //   console.log("Navigating...");
// //   return (path) => console.log(`Navigating to: ${path}`);
// // };

// //     // Context value provided to consumers
// //     const value = {
// //         currentUser,
// //         userId,
// //         isAdmin,
// //         isAuthReady,
// //         loading,
// //         login: handleLogin,
// //         logout: handleLogout,
// //         getAuthHeaders,
// //         useNavigate
// //     };

// //     return (
// //         <AuthContext.Provider value={value}>
// //             {children}
// //         </AuthContext.Provider>
// //     );
// // };




// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { toast } from 'sonner';

// // Backend API Base URL
// const API_BASE_URL = 'http://localhost:5000/api';

// // Create the authentication context
// export const AuthContext = createContext(null);

// // Custom hook to use the AuthContext
// // This makes using the context cleaner and prevents the need to import `useContext`
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // AuthProvider component to manage authentication state
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isAuthReady, setIsAuthReady] = useState(false);
//   const [loading, setLoading] = useState(false);

//   /**
//    * @function setUserFromToken
//    * Sets the user state from a JWT token stored in local storage.
//    * Decodes the token to get user info and role.
//    * @param {string | null} token - The JWT token string.
//    */
//   const setUserFromToken = (token) => {
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const user = {
//           uid: payload.userId,
//           email: payload.email,
//           role: payload.role || 'user',
//         };

//         setCurrentUser(user);
//         localStorage.setItem('token', token);
//       } catch (e) {
//         console.error("Error decoding token:", e);
//         setCurrentUser(null);
//         localStorage.removeItem('token');
//         toast.error("Invalid session. Please log in again.");
//       }
//     } else {
//       setCurrentUser(null);
//       localStorage.removeItem('token');
//     }
//     setIsAuthReady(true);
//   };

//   /**
//    * @effect
//    * Checks for an existing token in local storage when the app loads.
//    */
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setUserFromToken(token);
//   }, []);

//   /**
//    * @function login
//    * Handles user login by making an API call and setting the user state.
//    */
//   const login = async (email, password) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUserFromToken(data.token);
//         toast.success("Login successful!");
//         return true;
//       } else {
//         toast.error(data.message || "Login failed.");
//         return false;
//       }
//     } catch (e) {
//       console.error("Login error:", e);
//       toast.error("Login failed. Could not connect to server.");
//       return false;
//     }
//   };

// /**
//    * @function signup
//    * Handles user registration by making an API call and setting the user state.
//    */
//   const signup = async (name, email, password) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setUserFromToken(data.token);
//         toast.success("Account created successfully!");
//         return true;
//       } else {
//         toast.error(data.message || "Signup failed.");
//         return false;
//       }
//     } catch (e) {
//       console.error("Signup error:", e);
//       toast.error("Signup failed. Could not connect to server.");
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };


//   /**
//    * @function logout
//    * Clears user state and removes the token from local storage.
//    */
//   const logout = () => {
//     setUserFromToken(null);
//     toast.info("Logged out successfully.");
//   };

//   /**
//    * @function getAuthHeaders
//    * Helper function to get authorization headers for API requests.
//    */
//   const getAuthHeaders = () => {
//     const token = localStorage.getItem('token');
//     return token ? { 'Authorization': `Bearer ${token}` } : {};
//   };

//   const value = {
//     currentUser,
//     isAuthReady,
//     login,
//     loading,
//     signup,
//     logout,
//     getAuthHeaders,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// src/context/AuthContext.jsx
// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { toast } from 'sonner';

// const API_BASE_URL = 'http://localhost:5000/api';

// export const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isAuthReady, setIsAuthReady] = useState(false);
//   const [loading, setLoading] = useState(false); // <-- यह लाइन फिर से जोड़ें

//   const setUserFromToken = (token) => {
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const user = {
//           uid: payload.userId,
//           email: payload.email,
//           role: payload.role || 'user',
//         };

//         setCurrentUser(user);
//         localStorage.setItem('token', token);
//       } catch (e) {
//         console.error("Error decoding token:", e);
//         setCurrentUser(null);
//         localStorage.removeItem('token');
//         toast.error("Invalid session. Please log in again.");
//       }
//     } else {
//       setCurrentUser(null);
//       localStorage.removeItem('token');
//     }
//     setIsAuthReady(true);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setUserFromToken(token);
//     } else {
//       setIsAuthReady(true);
//     }
//   }, []);

//   const login = async (email, password) => {
//     setLoading(true); // <-- यह लाइन जोड़ें
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUserFromToken(data.token);
//         toast.success("Login successful!");
//         return true;
//       } else {
//         toast.error(data.message || "Login failed.");
//         return false;
//       }
//     } catch (e) {
//       console.error("Login error:", e);
//       toast.error("Login failed. Could not connect to server.");
//       return false;
//     } finally {
//       setLoading(false); // <-- यह लाइन जोड़ें
//     }
//   };

//   const signup = async (name, email, password) => {
//     setLoading(true); // <-- यह लाइन जोड़ें
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setUserFromToken(data.token);
//         toast.success("Account created successfully!");
//         return true;
//       } else {
//         toast.error(data.message || "Signup failed.");
//         return false;
//       }
//     } catch (e) {
//       console.error("Signup error:", e);
//       toast.error("Signup failed. Could not connect to server.");
//       return false;
//     } finally {
//       setLoading(false); // <-- यह लाइन जोड़ें
//     }
//   };

//   const logout = () => {
//     setLoading(true); // <-- यह लाइन जोड़ें
//     setUserFromToken(null);
//     toast.info("Logged out successfully.");
//     setLoading(false); // <-- यह लाइन जोड़ें
//   };

//   const getAuthHeaders = () => {
//     const token = localStorage.getItem('token');
//     return token ? { 'Authorization': `Bearer ${token}` } : {};
//   };

//   const value = {
//     currentUser,
//     isAuthReady,
//     login,
//     loading, // <-- इसे value ऑब्जेक्ट में फिर से जोड़ें
//     signup,
//     logout,
//     getAuthHeaders,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// // src/context/AuthContext.jsx (Corrected)
// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { toast } from 'sonner';

// const API_BASE_URL = 'http://localhost:5000/api';

// export const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false); // <-- यह लाइन जोड़ें
//   const [isAuthReady, setIsAuthReady] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const setUserFromToken = (token) => {
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const user = {
//           uid: payload.userId,
//           email: payload.email,
//           role: payload.role || 'customer',
//         };

//         setCurrentUser(user);
//         setIsAdmin(user.role === 'admin'); // <--isAdmin को यहां सेट करें
//         localStorage.setItem('token', token);
//       } catch (e) {
//         console.error("Error decoding token:", e);
//         setCurrentUser(null);
//         setIsAdmin(false); // <-- isAdmin को false सेट करें
//         localStorage.removeItem('token');
//         toast.error("Invalid session. Please log in again.");
//       }
//     } else {
//       setCurrentUser(null);
//       setIsAdmin(false); // <--isAdmin को false सेट करें
//       localStorage.removeItem('token');
//     }
//     setIsAuthReady(true);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setUserFromToken(token);
//     } else {
//       setIsAuthReady(true);
//     }
//   }, []);

//   const login = async (email, password) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUserFromToken(data.token);
//         toast.success("Login successful!");
//         return true;
//       } else {
//         toast.error(data.message || "Login failed.");
//         return false;
//       }
//     } catch (e) {
//       console.error("Login error:", e);
//       toast.error("Login failed. Could not connect to server.");
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signup = async (name, email, password) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setUserFromToken(data.token);
//         toast.success("Account created successfully!");
//         return true;
//       } else {
//         toast.error(data.message || "Signup failed.");
//         return false;
//       }
//     } catch (e) {
//       console.error("Signup error:", e);
//       toast.error("Signup failed. Could not connect to server.");
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setLoading(true);
//     setUserFromToken(null);
//     toast.info("Logged out successfully.");
//     setLoading(false);
//   };

//   const getAuthHeaders = () => {
//     const token = localStorage.getItem('token');
//     return token ? { 'Authorization': `Bearer ${token}` } : {};
//   };

//   const value = {
//     currentUser,
//     isAdmin, // <-- isAdmin को value ऑब्जेक्ट में जोड़ें
//     isAuthReady,
//     login,
//     loading,
//     signup,
//     logout,
//     getAuthHeaders,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };





// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { toast } from 'sonner';

// // Backend API Base URL
// const API_BASE_URL = 'http://localhost:5000/api';

// // Create the authentication context
// const AuthContext = createContext(null);

// // Custom hook to easily access authentication data and functions
// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // AuthProvider component to manage all authentication state and logic
// const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isAuthReady, setIsAuthReady] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Derive isAdmin and isUser from currentUser's role
//   const isAdmin = currentUser && currentUser.role === 'admin';
//   const isUser = currentUser && currentUser.role === 'user';
  
//   const setUserFromToken = (token) => {
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const user = {
//           uid: payload.id,
//           email: payload.email,
//           name: payload.name,
//           role: payload.role || 'user',
//         };
        
//         localStorage.setItem('user', JSON.stringify(user));
//         localStorage.setItem('token', token);
//         setCurrentUser(user);
        
//       } catch (e) {
//         console.error("Error decoding token:", e);
//         setCurrentUser(null);
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//         toast.error("Invalid session. Please log in again.");
//       }
//     } else {
//       setCurrentUser(null);
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//     }
    
//     setIsAuthReady(true);
//     setLoading(false);
//   };
  
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const user = localStorage.getItem('user');
    
//     if (token && user) {
//         try {
//             setCurrentUser(JSON.parse(user));
//         } catch (e) {
//             console.error("Failed to parse user from local storage", e);
//             setCurrentUser(null);
//         }
//     }
//     setIsAuthReady(true);
//     setLoading(false);

//   }, []);

//   const login = async (email, password) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUserFromToken(data.token);
//         toast.success(`Login successful! Welcome, ${data.name || 'user'}.`);
//         return true;
//       } else {
//         toast.error(data.message || "Login failed.");
//         return false;
//       }
//     } catch (e) {
//       console.error("Login error:", e);
//       toast.error("Login failed. Could not connect to server.");
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signup = async (name, email, password) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setUserFromToken(data.token);
//         toast.success("Account created successfully!");
//         return true;
//       } else {
//         toast.error(data.message || "Signup failed.");
//         return false;
//       }
//     } catch (e) {
//       console.error("Signup error:", e);
//       toast.error("Signup failed. Could not connect to server.");
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setUserFromToken(null);
//     toast.info("Logged out successfully.");
//   };

//   const getAuthHeaders = () => {
//     const token = localStorage.getItem('token');
//     return token ? {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     } : {};
//   };

//   const value = {
//     currentUser,
//     isAuthReady,
//     loading,
//     isAdmin,
//     isUser,
//     login,
//     signup,
//     logout,
//     getAuthHeaders,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Now we export AuthContext as well, for compatibility with old code
// export { AuthProvider, useAuth, AuthContext };




import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Backend API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Create the authentication context
const AuthContext = createContext(null);

// Custom hook to easily access authentication data and functions
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component to manage all authentication state and logic
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [loading, setLoading] = useState(true);

  // Derive isAdmin and isUser from currentUser's role
  const isAdmin = currentUser && currentUser.role === 'admin';
  const isUser = currentUser && currentUser.role === 'user';
  
  const setUserFromToken = (token) => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const user = {
          uid: payload.id,
          email: payload.email,
          name: payload.name,
          role: payload.role || 'user',
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setCurrentUser(user);
        
      } catch (e) {
        console.error("Error decoding token:", e);
        setCurrentUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toast.error("Invalid session. Please log in again.");
      }
    } else {
      setCurrentUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    
    setIsAuthReady(true);
    setLoading(false);
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        try {
            setCurrentUser(JSON.parse(user));
        } catch (e) {
            console.error("Failed to parse user from local storage", e);
            setCurrentUser(null);
        }
    }
    setIsAuthReady(true);
    setLoading(false);

  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getAuthJsonHeaders(),
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserFromToken(data.token);
        toast.success(`Login successful! Welcome, ${data.name || 'user'}.`);
        return true;
      } else {
        toast.error(data.message || "Login failed.");
        return false;
      }
    } catch (e) {
      console.error("Login error:", e);
      toast.error("Login failed. Could not connect to server.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: getAuthJsonHeaders(),
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setUserFromToken(data.token);
        toast.success("Account created successfully!");
        return true;
      } else {
        toast.error(data.message || "Signup failed.");
        return false;
      }
    } catch (e) {
      console.error("Signup error:", e);
      toast.error("Signup failed. Could not connect to server.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUserFromToken(null);
    toast.info("Logged out successfully.");
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? {
      'Authorization': `Bearer ${token}`
    } : {};
  };

  const getAuthJsonHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    } : {
      'Content-Type': 'application/json'
    };
  };

  const value = {
    currentUser,
    isAuthReady,
    loading,
    isAdmin,
    isUser,
    login,
    signup,
    logout,
    getAuthHeaders,
    getAuthJsonHeaders
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Now we export AuthContext as well, for compatibility with old code
export { AuthProvider, useAuth, AuthContext };
