// src/components/ui/Sparkles.jsx
"use client";
import React from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const SparklesCore = ({
  id,
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  className,
  particleColor = "#FFFFFF",
  background = "transparent",
}) => {
  const [sparkles, setSparkles] = React.useState([]);

  React.useEffect(() => {
    // Generate sparkles on mount
    const newSparkles = [];
    for (let i = 0; i < particleDensity; i++) {
      newSparkles.push(generateSparkle());
    }
    setSparkles(newSparkles);

    // Re-generate sparkles on resize
    const handleResize = () => {
      const newSparkles = [];
      for (let i = 0; i < particleDensity; i++) {
        newSparkles.push(generateSparkle());
      }
      setSparkles(newSparkles);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [particleDensity]);

  const generateSparkle = () => {
    const sparkle = {
      id: Math.random(),
      createdAt: Date.now(),
      color: particleColor,
      size: Math.random() * (maxSize - minSize) + minSize,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        zIndex: 20,
      },
    };
    return sparkle;
  };

  const Sparkle = React.memo(({ sparkle }) => {
    return (
      <motion.span
        key={sparkle.id}
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 2 + 1,
          repeat: Infinity,
          repeatDelay: Math.random() * 1.5,
          ease: "easeOut",
        }}
        style={{
          ...sparkle.style,
          position: "absolute",
          background: sparkle.color,
          width: `${sparkle.size}px`,
          height: `${sparkle.size}px`,
          borderRadius: "100%",
        }}
      >
        <SparklesIcon
          className="h-full w-full text-white"
          style={{
            fill: sparkle.color,
          }}
        />
      </motion.span>
    );
  });

  return (
    <div className={twMerge("absolute inset-0", className)} style={{ background }}>
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} sparkle={sparkle} />
      ))}
    </div>
  );
};

export { SparklesCore };