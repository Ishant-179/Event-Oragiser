// src/components/ui/AiSwarmVisualization.jsx
import { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils"; // Adjusted import path for cn
import { Settings, Zap, Brain, RefreshCw, Info } from "lucide-react"; // lucide-react icons

export const AiSwarmVisualization = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [particleCount, setParticleCount] = useState(80);
  const [speed, setSpeed] = useState(2);
  const [connectionDistance, setConnectionDistance] = useState(150);
  const [showSettings, setShowSettings] = useState(false);
  const [themeMode, setThemeMode] = useState('dark'); // Default to dark theme
  const [activeRule, setActiveRule] = useState(0);
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  const particlesRef = useRef([]);

  const rules = [
    {
      name: "",
      description: ""
    },
    {
      name: "Swarm Intelligence",
      description: "Particles exhibit collective behavior, mimicking swarm intelligence algorithms."
    },
    {
      name: "Data Clustering",
      description: "Particles group together to demonstrate how AI clustering algorithms work."
    }
  ];

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: themeMode === 'dark' ? '#8B5CF6' : '#6D28D9', // Purple shades
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          connect: [],
          opacity: Math.random() * 0.5 + 0.5
        });
      }

      particlesRef.current = particles;
    };

    initParticles();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [particleCount, speed, themeMode]);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || !isRunning) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas(); // Initial resize

    const handleResize = () => {
      resizeCanvas();
      // Reposition particles proportionally when canvas is resized
      if (particlesRef.current.length > 0) {
        const oldWidth = particlesRef.current[0].canvasWidth || canvas.width;
        const oldHeight = particlesRef.current[0].canvasHeight || canvas.height;

        particlesRef.current.forEach(particle => {
          particle.x = (particle.x / oldWidth) * canvas.width;
          particle.y = (particle.y / oldHeight) * canvas.height;
          particle.canvasWidth = canvas.width; // Store current canvas dimensions for next resize
          particle.canvasHeight = canvas.height;
        });
      }
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particle positions
      particlesRef.current.forEach(particle => {
        // Move particles
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx = -particle.vx;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy = -particle.vy;
        }

        // Apply different behavior based on active rule
        switch (activeRule) {
          case 1: // Swarm behavior
            // Attract to center with random offsets
            const centerX = canvas.width / 2 + Math.sin(Date.now() / 2000) * 100;
            const centerY = canvas.height / 2 + Math.cos(Date.now() / 2000) * 100;
            const dx = centerX - particle.x;
            const dy = centerY - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 100) { // Attract if far from center
              particle.vx += dx / dist * 0.02;
              particle.vy += dy / dist * 0.02;
            }
            // Add some random noise to prevent perfect convergence
            particle.vx += (Math.random() - 0.5) * 0.05;
            particle.vy += (Math.random() - 0.5) * 0.05;
            break;

          case 2: // Clustering behavior
            // Form clusters around 3 points
            const clusters = [
              { x: canvas.width * 0.25, y: canvas.height * 0.5 },
              { x: canvas.width * 0.5, y: canvas.height * 0.25 },
              { x: canvas.width * 0.75, y: canvas.height * 0.5 }
            ];

            // Each particle is attracted to its nearest cluster
            const closestCluster = clusters.reduce((nearest, cluster, index) => {
              const dx = cluster.x - particle.x;
              const dy = cluster.y - particle.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < nearest.dist) {
                return { dist, index };
              }
              return nearest;
            }, { dist: Infinity, index: 0 });

            const targetCluster = clusters[closestCluster.index];
            const dxc = targetCluster.x - particle.x;
            const dyc = targetCluster.y - particle.y;
            const distc = Math.sqrt(dxc * dxc + dyc * dyc);

            if (distc > 30) { // Attract if far from cluster center
              particle.vx += dxc / distc * 0.03;
              particle.vy += dyc / distc * 0.03;
            }
            // Add some friction to settle into clusters
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            break;

          default: // Neural network behavior (rule 0) - default random motion
            // Random motion with slight adjustments
            if (Math.random() > 0.97) { // Infrequent random nudges
              particle.vx += (Math.random() - 0.5) * 0.2;
              particle.vy += (Math.random() - 0.5) * 0.2;
            }

            // Limit velocity to prevent particles from flying too fast
            const maxVelocity = 2 * speed;
            const vSquared = particle.vx * particle.vx + particle.vy * particle.vy;
            if (vSquared > maxVelocity * maxVelocity) {
              const ratio = maxVelocity / Math.sqrt(vSquared);
              particle.vx *= ratio;
              particle.vy *= ratio;
            }
        }

        // Draw particles
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1; // Reset alpha for next drawing operations
      });

      // Draw connections
      ctx.strokeStyle = themeMode === 'dark' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(109, 40, 217, 0.15)'; // Purple lines
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];

        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const particle2 = particlesRef.current[j];
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Calculate opacity based on distance (closer = more opaque)
            ctx.globalAlpha = 1 - (distance / connectionDistance);

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1; // Reset global alpha after drawing connections

      if (isRunning) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate); // Start animation loop

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isRunning, activeRule, speed, connectionDistance, themeMode]); // Dependencies for useEffect

  const toggleAnimation = () => {
    setIsRunning(!isRunning);
  };

  const resetSimulation = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // Re-initialize particles to random positions
    particlesRef.current.forEach(particle => {
      particle.x = Math.random() * canvas.width;
      particle.y = Math.random() * canvas.height;
      particle.vx = (Math.random() - 0.5) * speed;
      particle.vy = (Math.random() - 0.5) * speed;
    });
    // Ensure animation restarts if it was paused
    if (!isRunning) setIsRunning(true);
  };

  const toggleTheme = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={cn(
      "w-full h-full overflow-hidden transition-colors duration-300 relative", // Added relative for absolute positioning of controls
      themeMode === 'dark' ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    )}>
      {/* Header */}
      <div className={cn(
        "p-4 flex justify-between items-center border-b transition-colors duration-300 relative z-10", // Added z-10
        themeMode === 'dark' ? "border-gray-700" : "border-gray-200"
      )}>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className={themeMode === 'dark' ? "text-purple-400" : "text-purple-600"} />
            
          </h1>
          <p className={cn(
            "text-sm transition-colors duration-300",
            themeMode === 'dark' ? "text-gray-400" : "text-gray-600"
          )}>
           
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-lg transition-colors duration-200",
              themeMode === 'dark'
                ? "hover:bg-gray-800 text-gray-300"
                : "hover:bg-gray-100 text-gray-600"
            )}
            aria-label="Toggle theme"
          >
            {themeMode === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
              "p-2 rounded-lg transition-colors duration-200",
              themeMode === 'dark'
                ? "hover:bg-gray-800 text-gray-300"
                : "hover:bg-gray-100 text-gray-600",
              showSettings && (themeMode === 'dark' ? 'bg-gray-700' : 'bg-gray-200') // Highlight when open
            )}
            aria-label="Toggle settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className={cn(
          "border-b p-4 transition-colors duration-300 relative z-10", // Added z-10
          themeMode === 'dark' ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50"
        )}>
          <div className="flex flex-wrap gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium"></label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="20"
                  max="200"
                  value={particleCount}
                  onChange={(e) => setParticleCount(parseInt(e.target.value))}
                  className="w-32 accent-purple-500" // Added accent color
                />
                <span className="text-sm min-w-12">{particleCount}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium"></label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="50"
                  max="250"
                  value={connectionDistance}
                  onChange={(e) => setConnectionDistance(parseInt(e.target.value))}
                  className="w-32 accent-purple-500" // Added accent color
                />
                <span className="text-sm min-w-12">{connectionDistance}px</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium"></label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-32 accent-purple-500" // Added accent color
                />
                <span className="text-sm min-w-12">{speed}x</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium"></label>
            <div className="mt-2 flex flex-wrap gap-2">
              {rules.map((rule, index) => (
                <button
                  key={index}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-lg transition-colors",
                    activeRule === index
                      ? themeMode === 'dark'
                        ? "bg-purple-600 text-white"
                        : "bg-purple-600 text-white"
                      : themeMode === 'dark'
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  )}
                  onClick={() => setActiveRule(index)}
                >
                  {rule.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Canvas - positioned absolutely to fill parent and be background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0" // z-0 to ensure it's in the background
      />

      {/* Rule Description Info Box */}
      <div className={cn(
        "absolute bottom-4 left-4 p-3 rounded-lg max-w-xs transition-colors duration-300 z-10", // Added z-10
        themeMode === 'dark'
          ? "bg-gray-800/80 text-gray-200 border border-gray-700"
          : "bg-white/80 text-gray-800 border border-gray-200 shadow-md"
      )}>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Info size={16} className={themeMode === 'dark' ? "text-purple-400" : "text-purple-600"} />
          {rules[activeRule].name}
        </div>
        <p className="mt-1 text-xs opacity-80"></p>
      </div>

      {/* Controls - positioned absolutely or relative within its own z-indexed container */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 border-t p-3 flex justify-between items-center transition-colors duration-300 z-10", // Added z-10
        themeMode === 'dark' ? "border-gray-700 bg-gray-800/50" : "bg-gray-200 bg-gray-50"
      )}>
        <div className="text-sm">
          <span className={cn(
            "transition-colors duration-300",
            themeMode === 'dark' ? "text-gray-400" : "text-gray-600"
          )}>
          </span>
        </div>

        <div className="flex items-center gap-2">
         

          
        </div>
      </div>
      {/* CSS for fade-in-down animation - Removed 'jsx' prop */}
      <style>{`
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-down {
            animation: fadeInDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
