// src/components/AdminBentoCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MagicBento, { ParticleCard } from './MagicBento'; // Import ParticleCard from MagicBento

const AdminBentoCard = ({ title, description, label, to, glowColor }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    // Card properties for ParticleCard
    const cardProps = {
        className: "card card--text-autohide card--border-glow", // Apply base card styles
        style: {
            backgroundColor: "#060010", // Use a dark background for the card
            "--glow-color": glowColor, // Pass the green glow color
        },
        disableAnimations: false, // Enable animations
        particleCount: 12,
        glowColor: glowColor,
        enableTilt: true,
        clickEffect: true,
        enableMagnetism: true,
        onClick: handleClick // Pass the navigation handler
    };

    return (
        <ParticleCard {...cardProps}>
            <div className="card__header">
                <div className="card__label">{label}</div>
            </div>
            <div className="card__content">
                <h2 className="card__title">{title}</h2>
                <p className="card__description">{description}</p>
            </div>
        </ParticleCard>
    );
};

export default AdminBentoCard;
