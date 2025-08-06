// src/components/BackgroundVisualization.jsx
import React from 'react';
import { AiSwarmVisualization } from './ui/AiSwarmVisualization'; // Import the visualization component

/**
 * BackgroundVisualization component.
 * Renders the AI Swarm Visualization as a fixed background
 * and allows other React components to be rendered on top of it.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be rendered on top of the background.
 */
const BackgroundVisualization = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* AI Swarm Visualization as the background */}
      {/* It will fill the entire viewport and be positioned behind other content */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AiSwarmVisualization />
      </div>

      {/* Content to be rendered on top of the background */}
      {/* Use z-10 or higher to ensure content is visible above the background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundVisualization;
