// src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'sonner'; // Sonner for toast notifications

// // Context
// import { AuthProvider } from './context/AuthContext'; // Adjusted path for AuthContext

// // Components
// import Navbar from './components/Navbar';
// import BackgroundVisualization from './components/BackgroundVisualization'; // Import the new background component

// // Pages
// import HomePage from './pages/HomePage';
// import EventListPage from './pages/EventListPage';
// import EventDetail from './pages/EventDetail';
// import LoginPage from './pages/LoginPage';
// import CreateEventPage from './pages/CreateEventPage';
// import AdminDashboard from './pages/AdminDashboard';
// import AdminEventList from './pages/admin/AdminEventList';

// // Main App component responsible for routing and overall layout
// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         {/* Tailwind CSS CDN */}
//         <script src="https://cdn.tailwindcss.com"></script>
//         {/* Inter Font */}
//         <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
//         {/* Sonner CDN for toast notifications */}
//         <script src="https://unpkg.com/sonner@1.2.0/dist/index.js"></script>
//         <style>
//           {`
//             body {
//               font-family: 'Inter', sans-serif;
//             }
//             /* Custom scrollbar for better aesthetics */
//             ::-webkit-scrollbar {
//                 width: 8px;
//                 height: 8px;
//             }
//             ::-webkit-scrollbar-track {
//                 background: #f1f1f1;
//                 border-radius: 10px;
//             }
//             ::-webkit-scrollbar-thumb {
//                 background: #888;
//                 border-radius: 10px;
//             }
//             ::-webkit-scrollbar-thumb:hover {
//                 background: #555;
//             }
//           `}
//         </style>

//         {/* Wrap the entire application content (excluding global scripts/styles) with BackgroundVisualization */}
//         <BackgroundVisualization>
//           <div className="min-h-screen flex flex-col"> {/* Use flex-col to push footer down if needed */}
//             <Navbar /> {/* Navbar is present on all pages */}

//             <main className="flex-grow pb-8"> {/* flex-grow to take available space */}
//               <Routes>
//                 <Route path="/" element={<HomePage />} />
//                  <Route path="/events/all" element={<AdminEventList />} />
//                 <Route path="/events" element={<EventListPage />} />
//                 <Route path="/events/:eventId" element={<EventDetail />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/create-event" element={<CreateEventPage />} />
//                 <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
//                 {/* Fallback route for unmatched paths */}
//                 <Route path="*" element={<HomePage />} />
//               </Routes>
//             </main>

//             {/* Sonner Toaster component for displaying toast notifications */}
//             <Toaster position="top-right" richColors />
//           </div>
//         </BackgroundVisualization>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// // src/App.jsx (Final Corrected Code)
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import { MainLayout } from "./components/layout/MainLayout";
// import LandingPage from "./pages/HomePage";
// import EventsPage from "./pages/EventListPage";
// import MyEventsPage from "./pages/MyEventsPage";
// import ProfilePage from "./pages/ProfilePage";
// import AdminDashboard from "./pages/AdminDashboard";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import EventDetailPage from "./pages/EventDetail";

// import BackgroundVisualization from './components/BackgroundVisualization';
// import AboutPage from "./pages/AboutPage";

// import CreateEventPage from './pages/CreateEventPage';
// import AdminEventList from "./pages/admin/AdminEventList";
// import AdminEventDetails from "./components/AdminEventDetail";

// const ProtectedRoute = ({ children, roles }) => {
//   const { currentUser, isAuthReady } = useAuth();
//   if(!isAuthReady){
//     return (
//       <div className="flex items-center justify-center min-h-screen text-white text-lg">Loading...</div>
//     );
//   }
//   if (!currentUser || (roles && !roles.includes(currentUser.role))) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

// const App = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         <BackgroundVisualization>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
//             <Route path="/events" element={<MainLayout><EventsPage /></MainLayout>} />
//             <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
//             <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
//             <Route path="/signup" element={<MainLayout><SignupPage /></MainLayout>} />
//             <Route path="/events/:id" element={<MainLayout><EventDetailPage /></MainLayout>} />

//             {/* User Routes (Protected) */}
//             <Route
//               path="/my-events"
//               element={<ProtectedRoute roles={["user", "admin"]}><MainLayout><MyEventsPage /></MainLayout></ProtectedRoute>}
//             />
//             <Route
//               path="/profile"
//               element={<ProtectedRoute roles={["user", "admin"]}><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>}
//             />

//            {/* Admin Routes (Protected and Nested) */}
//             {/* The more specific route must come BEFORE the wildcard route */}
//             <Route
//               path="/admin/create-event" 
//               element={<ProtectedRoute roles={["admin"]}><MainLayout><CreateEventPage /></MainLayout></ProtectedRoute>}
//             />

//             <Route path="/admin/*" element={<ProtectedRoute roles={["admin"]}><MainLayout><AdminDashboard /></MainLayout></ProtectedRoute>} />
            
//             {/* Fallback for unknown routes */}
//             <Route path="*" element={<MainLayout><div>404 Page Not Found</div></MainLayout>} />
//           </Routes>
//         </BackgroundVisualization>
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;



// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import { MainLayout } from "./components/layout/MainLayout";
// import LandingPage from "./pages/HomePage";
// import EventsPage from "./pages/EventListPage";
// import MyEventsPage from "./pages/MyEventsPage";
// import ProfilePage from "./pages/ProfilePage";
// import AdminDashboard from "./pages/AdminDashboard";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import EventDetailPage from "./pages/EventDetail";
// import CreateEventPage from './pages/CreateEventPage';

// import BackgroundVisualization from './components/BackgroundVisualization';
// import AboutPage from "./pages/AboutPage";


// const ProtectedRoute = ({ children, roles }) => {
//   const { currentUser, isAuthReady } = useAuth();
//   if(!isAuthReady){
//     return (
//       <div className="flex items-center justify-center min-h-screen text-white text-lg">Loading...</div>
//     );
//   }
//   if (!currentUser || (roles && !roles.includes(currentUser.role))) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

// const App = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         <BackgroundVisualization>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
//             <Route path="/events" element={<MainLayout><EventsPage /></MainLayout>} />
//             <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
//             <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
//             <Route path="/signup" element={<MainLayout><SignupPage /></MainLayout>} />
//             <Route path="/events/:id" element={<MainLayout><EventDetailPage /></MainLayout>} />

//             {/* User Routes (Protected) */}
//             <Route
//               path="/my-events"
//               element={<ProtectedRoute roles={["user", "admin"]}><MainLayout><MyEventsPage /></MainLayout></ProtectedRoute>}
//             />
//             <Route
//               path="/profile"
//               element={<ProtectedRoute roles={["user", "admin"]}><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>}
//             />
//             
//             {/* Admin Routes (Protected and Nested) */}
//             {/* The more specific route must come BEFORE the wildcard route */}
//             <Route
//               path="/admin/create-event" 
//               element={<ProtectedRoute roles={["admin"]}><MainLayout><CreateEventPage /></MainLayout></ProtectedRoute>}
//             />
//             {/* AdminDashboard ab apne nested routes ko handle karega, users samet */}
//             <Route path="/admin/*" element={<ProtectedRoute roles={["admin"]}><MainLayout><AdminDashboard /></MainLayout></ProtectedRoute>} />
//             
//             {/* Fallback for unknown routes */}
//             <Route path="*" element={<MainLayout><div>404 Page Not Found</div></MainLayout>} />
//           </Routes>
//         </BackgroundVisualization>
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;



// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { MainLayout } from "./components/layout/MainLayout";
import LandingPage from "./pages/HomePage";
import EventsPage from "./pages/EventListPage";
import MyEventsPage from "./pages/MyEventsPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import EventDetailPage from "./pages/EventDetail";

import BackgroundVisualization from './components/BackgroundVisualization';
import AboutPage from "./pages/AboutPage";
import CreateEventPage from "./pages/CreateEventPage";


const ProtectedRoute = ({ children, roles }) => {
  const { currentUser, isAuthReady } = useAuth();
  if(!isAuthReady){
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-lg">Loading...</div>
    );
  }
  if (!currentUser || (roles && !roles.includes(currentUser.role))) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <BackgroundVisualization>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
            <Route path="/events" element={<MainLayout><EventsPage /></MainLayout>} />
            <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
            <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
            <Route path="/signup" element={<MainLayout><SignupPage /></MainLayout>} /> 
            <Route path="/events/:id" element={<MainLayout><EventDetailPage /></MainLayout>} />

            {/* User Routes (Protected) */}
            <Route
              path="/my-events"
              element={<ProtectedRoute roles={["customer", "admin"]}><MainLayout><MyEventsPage /></MainLayout></ProtectedRoute>}
            />

            
            <Route path="/create-event" element={<ProtectedRoute roles={["customer", "admin"]}><MainLayout><CreateEventPage /></MainLayout></ProtectedRoute>} /> 

            <Route
              path="/profile"
              element={<ProtectedRoute roles={["customer", "admin"]}><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>}
            />
            
            {/* Admin Routes (Protected and Nested) */}
            <Route path="/admin/*" element={<ProtectedRoute roles={["admin"]}><MainLayout><AdminDashboard /></MainLayout></ProtectedRoute>} />
            
            {/* Fallback for unknown routes */}
            <Route path="*" element={<MainLayout><div>404 Page Not Found</div></MainLayout>} />
          </Routes>
        </BackgroundVisualization>
      </AuthProvider>
    </Router>
  );
};

export default App;



