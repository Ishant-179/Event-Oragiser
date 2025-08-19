// //src/components/EventCard.jsx
// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { GlowCard } from './GlowCard';

// const EventCard = ({ event }) => {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         // Always navigate to the event detail page. The detail page will handle
//         // the redirection if the user is not logged in.
//         navigate(`/events/${event._id}`);
//     };

//     const formattedStartDate = event.startDate ? new Date(event.startDate).toLocaleDateString() : 'N/A';
//     const formattedEndDate = event.endDate ? new Date(event.endDate).toLocaleDateString() : 'N/A';

//     return (
//         <GlowCard 
//             className='w-full cursor-pointer transform transition-all duration-300 hover:-translate-y-2 h-[67vh]'
//             glowColor='green'
//             onClick={handleClick}
//         >
//             <div className="relative w-full h-56 overflow-hidden">
//                 <img
//                     src={event.imageUrl || 'https://placehold.co/600x400/111827/9CA3AF?text=Event+Image'}
//                     alt={event.title}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                     onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/111827/9CA3AF?text=Event+Image'; }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                 <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
//                     {event.category}
//                 </div>
//             </div>

//             <div className="p-6 text-white">
//                 <h3 className="text-xl font-bold mb-2 truncate">
//                     {event.title}
//                 </h3>
                
//                 <p className="text-gray-400 text-sm mb-4 line-clamp-3">{event.description}</p>

//                 <div className="flex items-center text-gray-400 text-sm mb-2">
//                     <span className="flex items-center mr-4">
//                         <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"></path></svg>
//                         {formattedStartDate}
//                     </span>
//                     <span className="flex items-center">
//                         <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-11a1 1 0 011-1h2a1 1 0 010 2h-1v3a1 1 0 01-2 0v-2z"></path></svg>
//                         {event.startTime}
//                     </span>
//                 </div>

//                 <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
//                     <span className="flex items-center text-gray-300 text-sm font-medium">
//                         <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"></path></svg>
//                         {event.medium === 'In Person' ? event.location : 'Online'}
//                     </span>
//                     <span className="text-xl font-bold text-green-400">
//                         {event.price === 'Free' ? 'Free' : `${event.price}`}
//                     </span>
//                 </div>
//             </div>
//         </GlowCard> 
//     );
// };

// export default EventCard;






// src/components/EventCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { GlowCard } from "./GlowCard";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event._id}`);
  };

  const formattedStartDate = event.startDate
    ? new Date(event.startDate).toLocaleDateString()
    : "N/A";

  return (
    <GlowCard
      className="w-full max-w-sm cursor-pointer transform transition-all duration-300 hover:-translate-y-2 h-auto"
      glowColor="green"
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[5/3] overflow-hidden rounded-t-lg">
        <img
          src={
            event.imageUrl ||
            "https://placehold.co/400x300/111827/9CA3AF?text=Event+Image"
          }
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x300/111827/9CA3AF?text=Event+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-2 left-2 bg-green-600 text-white text-[9px] sm:text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          {event.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 text-white flex flex-col h-full">
        <h3 className="text-base sm:text-lg font-bold mb-1 line-clamp-1">
          {event.title}
        </h3>

        <p className="text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center text-gray-400 text-xs sm:text-sm mb-2">
          <span className="flex items-center mr-3">
            <svg
              className="w-3.5 h-3.5 mr-1 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"></path>
            </svg>
            {formattedStartDate}
          </span>
          <span className="flex items-center">
            <svg
              className="w-3.5 h-3.5 mr-1 text-green-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-11a1 1 0 011-1h2a1 1 0 010 2h-1v3a1 1 0 01-2 0v-2z"></path>
            </svg>
            {event.startTime}
          </span>
        </div>

        <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-700">
          <span className="flex items-center text-gray-300 text-xs sm:text-sm font-medium">
            <svg
              className="w-3.5 h-3.5 mr-1 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            {event.medium === "In Person" ? event.location : "Online"}
          </span>
          <span className="text-base sm:text-lg font-bold text-green-400">
            {event.price === "Free" ? "Free" : `${event.price}`}
          </span>
        </div>
      </div>
    </GlowCard>
  );
};

export default EventCard;







// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CalendarDays, Clock, MapPin } from 'lucide-react';

// const EventCard = ({ event }) => {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         // Log the ID to the console to confirm it's correct before navigating
//         console.log("Navigating to event detail page with ID:", event._id);
        
//         // Use the event's unique ID for navigation
//         navigate(`/events/${event._id}`);
//     };

//     const formattedStartDate = event.startDate ? new Date(event.startDate).toLocaleDateString() : 'N/A';
//     const formattedEndDate = event.endDate ? new Date(event.endDate).toLocaleDateString() : 'N/A';

//     return (
//         <div 
//             onClick={handleClick}
//             className='relative w-full overflow-hidden rounded-2xl bg-gray-900 border border-gray-700
//                        p-4 shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer
//                        h-[600px] flex flex-col' // Added h-[600px] and flex-col for consistent height
//         >
//             {/* Image and Category Badge */}
//             <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4">
//                 <img
//                     src={event.imageUrl || 'https://placehold.co/600x400/111827/9CA3AF?text=Event+Image'}
//                     alt={event.title}
//                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//                     onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/111827/9CA3AF?text=Event+Image'; }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                 <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
//                     {event.category}
//                 </div>
//             </div>

//             {/* Event Details */}
//             <div className="flex-grow flex flex-col p-2 text-white">
//                 <h3 className="text-2xl font-bold mb-2 truncate">
//                     {event.title}
//                 </h3>
                
//                 <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{event.description}</p>

//                 <div className="flex items-center text-gray-400 text-sm mb-2">
//                     <CalendarDays className="w-4 h-4 mr-2 text-green-400" />
//                     <span>{formattedStartDate} - {formattedEndDate}</span>
//                 </div>
//                 <div className="flex items-center text-gray-400 text-sm mb-2">
//                     <Clock className="w-4 h-4 mr-2 text-green-400" />
//                     <span>{event.startTime} - {event.endTime}</span>
//                 </div>
//                 <div className="flex items-center text-gray-400 text-sm mb-4">
//                     <MapPin className="w-4 h-4 mr-2 text-green-400" />
//                     <span>{event.medium === 'In Person' ? event.location : 'Online'}</span>
//                 </div>

//                 {/* Price */}
//                 <div className="mt-auto pt-4 border-t border-gray-700">
//                     <div className="text-xl font-bold text-green-400">
//                         {event.price === 'Free' ? 'Free' : `${event.price}`}
//                     </div>
//                 </div>
//             </div>
//         </div> 
//     );
// };

// export default EventCard;
