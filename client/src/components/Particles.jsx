// src/components/Particles.jsx
import { useEffect, useRef } from "react";
// Import OGL core components
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

// Default particle colors if none are provided
const defaultColors = ["#ffffff", "#ffffff", "#ffffff"];

// Helper function to convert hex color to RGB array (0-1 scale)
const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, ""); // Remove '#' if present
  if (hex.length === 3) { // Handle shorthand hex codes (e.g., #FFF)
    hex = hex.split("").map((c) => c + c).join("");
  }
  const int = parseInt(hex, 16); // Parse hex to integer
  const r = ((int >> 16) & 255) / 255; // Extract red component and normalize to 0-1
  const g = ((int >> 8) & 255) / 255;  // Extract green component and normalize to 0-1
  const b = (int & 255) / 255;   // Extract blue component and normalize to 0-1
  return [r, g, b];
};

// Vertex Shader: Defines how each particle's position and size are calculated
const vertex = /* glsl */ `
  attribute vec3 position; // Initial position of the particle
  attribute vec4 random;   // Random values for various animations (x, y, z, w components)
  attribute vec3 color;    // Color of the particle

  uniform mat4 modelMatrix;     // Model matrix for object transformations
  uniform mat4 viewMatrix;      // View matrix for camera position/orientation
  uniform mat4 projectionMatrix; // Projection matrix for perspective

  uniform float uTime;          // Time uniform for animation
  uniform float uSpread;        // Controls how spread out the particles are
  uniform float uBaseSize;      // Base size of particles
  uniform float uSizeRandomness; // Randomness factor for particle size

  varying vec4 vRandom; // Pass random values to fragment shader
  varying vec3 vColor;  // Pass color to fragment shader

  void main() {
    vRandom = random; // Store random values for use in fragment shader
    vColor = color;   // Store color for use in fragment shader

    // Scale initial position by spread uniform
    vec3 pos = position * uSpread;
    pos.z *= 10.0; // Further spread along Z-axis

    // Apply model matrix to initial position
    vec4 mPos = modelMatrix * vec4(pos, 1.0);

    float t = uTime; // Current time for animation

    // Add sine wave motion based on random values for dynamic movement
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

    // Calculate screen-space position (mvPos)
    vec4 mvPos = viewMatrix * mPos;

    // Calculate point size based on base size, randomness, and distance from camera
    // Particles further away appear smaller
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);

    // Final position in clip space
    gl_Position = projectionMatrix * mvPos;
  }
`;

// Fragment Shader: Defines the color of each pixel of the particle
const fragment = /* glsl */ `
  precision highp float; // Set high precision for floats

  uniform float uTime;         // Time uniform (though not directly used in final color, useful for other effects)
  uniform float uAlphaParticles; // Controls if particles have alpha blending or not
  varying vec4 vRandom;        // Random values from vertex shader
  varying vec3 vColor;         // Color from vertex shader

  void main() {
    vec2 uv = gl_PointCoord.xy; // Coordinates within the current point (0 to 1)
    float d = length(uv - vec2(0.5)); // Distance from the center of the point (0 to 0.5)

    // If alphaParticles is low (e.g., 0), render solid particles
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard; // Discard pixels outside the circle (makes them square)
      }
      // Set color with a subtle sine wave variation
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      // If alphaParticles is high (e.g., 1), render transparent circular particles
      float circle = smoothstep(0.5, 0.4, d) * 0.8; // Create a smooth circular alpha gradient
      // Set color with sine wave variation and apply circular alpha
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

// React component for rendering 3D particles
const Particles = ({
  particleCount = 200,          // Number of particles
  particleSpread = 10,          // How far particles spread out
  speed = 0.1,                  // Animation speed
  particleColors,               // Array of hex colors for particles
  moveParticlesOnHover = false, // Whether particles react to mouse hover
  particleHoverFactor = 1,      // How much particles move on hover
  alphaParticles = false,       // Whether particles have alpha blending (circular or square)
  particleBaseSize = 100,       // Base size of particles in pixels
  sizeRandomness = 1,           // Randomness factor for particle size
  cameraDistance = 20,          // Distance of the camera from the center
  disableRotation = false,      // Whether to disable the automatic scene rotation
  className,                    // Additional CSS classes for the container div
}) => {
  const containerRef = useRef(null); // Ref to the DOM element that will hold the canvas
  const mouseRef = useRef({ x: 0, y: 0 }); // Ref to store mouse coordinates

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return; // Exit if container ref is not available

    // Initialize OGL Renderer
    const renderer = new Renderer({ antialias: true, depth: false, alpha: true }); // Enable anti-aliasing, disable depth test for particles, enable alpha
    const gl = renderer.gl; // Get WebGL context
    container.appendChild(gl.canvas); // Append canvas to the container div
    gl.clearColor(0, 0, 0, 0); // Set clear color to transparent black

    // Initialize OGL Camera
    const camera = new Camera(gl, { fov: 15 }); // Field of view
    camera.position.set(0, 0, cameraDistance); // Set initial camera position

    // Handle window resize
    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height); // Update renderer size
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height }); // Update camera aspect ratio
    };
    window.addEventListener("resize", resize, false); // Add resize listener
    resize(); // Initial resize call

    // Handle mouse movement for hover effect
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Normalize mouse coordinates to -1 to 1 range
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1); // Y-axis is inverted in WebGL
      mouseRef.current = { x, y };
    };

    if (moveParticlesOnHover) {
      container.addEventListener("mousemove", handleMouseMove); // Add mousemove listener if enabled
    }

    // Generate particle data
    const count = particleCount;
    const positions = new Float32Array(count * 3); // x, y, z for each particle
    const randoms = new Float32Array(count * 4);   // 4 random values per particle for animation
    const colors = new Float32Array(count * 3);    // r, g, b for each particle
    // Use provided colors or default white
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;

    for (let i = 0; i < count; i++) {
      let x, y, z, len;
      // Generate random positions within a sphere
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0); // Ensure points are inside unit sphere and not at origin
      const r = Math.cbrt(Math.random()); // Distribute particles more evenly in sphere
      positions.set([x * r, y * r, z * r], i * 3);

      // Set random values for each particle
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);

      // Assign a random color from the palette
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      colors.set(col, i * 3);
    }

    // Create OGL Geometry
    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });

    // Create OGL Program (shaders and uniforms)
    const program = new Program(gl, {
      vertex,   // Vertex shader code
      fragment, // Fragment shader code
      uniforms: {
        uTime: { value: 0 },             // Time uniform, updated in animation loop
        uSpread: { value: particleSpread }, // Particle spread uniform
        uBaseSize: { value: particleBaseSize }, // Base particle size uniform
        uSizeRandomness: { value: sizeRandomness }, // Particle size randomness uniform
        uAlphaParticles: { value: alphaParticles ? 1 : 0 }, // Alpha blending toggle
      },
      transparent: true, // Enable transparency
      depthTest: false,  // Disable depth testing (particles can overlap without z-fighting)
    });

    // Create OGL Mesh for particles
    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program }); // Render as points

    let animationFrameId;
    let lastTime = performance.now();
    let elapsed = 0; // Total elapsed time for animation

    // Animation loop
    const update = (t) => {
      animationFrameId = requestAnimationFrame(update); // Request next frame
      const delta = t - lastTime; // Time elapsed since last frame
      lastTime = t;
      elapsed += delta * speed; // Accumulate elapsed time, scaled by speed

      program.uniforms.uTime.value = elapsed * 0.001; // Update time uniform for shaders

      // Apply mouse hover effect to particle position
      if (moveParticlesOnHover) {
        particles.position.x = -mouseRef.current.x * particleHoverFactor;
        particles.position.y = -mouseRef.current.y * particleHoverFactor;
      } else {
        particles.position.x = 0;
        particles.position.y = 0;
      }

      // Apply automatic rotation if not disabled
      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * speed;
      }

      renderer.render({ scene: particles, camera }); // Render the scene
    };

    animationFrameId = requestAnimationFrame(update); // Start the animation loop

    // Cleanup function for useEffect
    return () => {
      window.removeEventListener("resize", resize); // Remove resize listener
      if (moveParticlesOnHover) {
        container.removeEventListener("mousemove", handleMouseMove); // Remove mousemove listener
      }
      cancelAnimationFrame(animationFrameId); // Cancel animation frame
      // Clean up OGL canvas from DOM
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
    // Dependency array for useEffect. Re-run effect if any of these props change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
  ]);

  return (
    // Container div for the OGL canvas
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`} // Full width/height and relative positioning
    />
  );
};

export default Particles;
