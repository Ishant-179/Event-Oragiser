// import React, { useEffect, useRef } from 'react';

// /**
//  * @typedef {Object} GlowCardProps
//  * @property {React.ReactNode} children
//  * @property {string} [className]
//  * @property {'blue' | 'purple' | 'green' | 'red' | 'orange'} [glowColor]
//  * @property {'sm' | 'md' | 'lg'} [size]
//  * @property {string | number} [width]
//  * @property {string | number} [height]
//  * @property {boolean} [customSize] // When true, ignores size prop and uses width/height or className
//  */

// const glowColorMap = {
//   blue: { base: 220, spread: 200 },
//   purple: { base: 280, spread: 300 },
//   green: { base: 120, spread: 200 }, // Green color for the glow
//   red: { base: 0, spread: 200 },
//   orange: { base: 30, spread: 200 }
// };

// const sizeMap = {
//   sm: 'w-48 h-64',
//   md: 'w-64 h-80',
//   lg: 'w-80 h-96'
// };

// /** @type {React.FC<GlowCardProps>} */
// const GlowCard = ({
//   children,
//   className = '',
//   glowColor = 'blue',
//   size = 'md',
//   width,
//   height,
//   customSize = false
// }) => {
//   const cardRef = useRef(null);
//   const innerRef = useRef(null); // This innerRef is used for the inner glow element

//   useEffect(() => {
//     const syncPointer = (e) => { // Removed PointerEvent type annotation
//       const { clientX: x, clientY: y } = e;
      
//       if (cardRef.current) {
//         cardRef.current.style.setProperty('--x', x.toFixed(2));
//         cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
//         cardRef.current.style.setProperty('--y', y.toFixed(2));
//         cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
//       }
//     };

//     document.addEventListener('pointermove', syncPointer);
//     return () => document.removeEventListener('pointermove', syncPointer);
//   }, []);

//   const { base, spread } = glowColorMap[glowColor];

//   // Determine sizing
//   const getSizeClasses = () => {
//     if (customSize) {
//       return ''; // Let className or inline styles handle sizing
//     }
//     return sizeMap[size];
//   };

//   const getInlineStyles = () => {
//     const baseStyles = {
//       '--base': base,
//       '--spread': spread,
//       '--radius': '14', // Rounded corners
//       '--border': '3', // Border thickness
//       '--backdrop': 'hsl(0 0% 10% / 0.7)', // Darker backdrop for the card background
//       '--backup-border': 'hsl(0 0% 20% / 0.8)', // Darker backup border
//       '--size': '200', // Size of the spotlight effect
//       '--outer': '1', // Outer glow opacity
//       '--border-size': 'calc(var(--border, 2) * 1px)',
//       '--spotlight-size': 'calc(var(--size, 150) * 1px)',
//       '--hue': `calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))`,
//       backgroundImage: `radial-gradient(
//         var(--spotlight-size) var(--spotlight-size) at
//         calc(var(--x, 0) * 1px)
//         calc(var(--y, 0) * 1px),
//         hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
//       )`,
//       backgroundColor: 'var(--backdrop, transparent)',
//       backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
//       backgroundPosition: '50% 50%',
//       backgroundAttachment: 'fixed',
//       border: 'var(--border-size) solid var(--backup-border)',
//       position: 'relative',
//       touchAction: 'none',
//     };

//     // Add width and height if provided
//     if (width !== undefined) {
//       baseStyles.width = typeof width === 'number' ? `${width}px` : width;
//     }
//     if (height !== undefined) {
//       baseStyles.height = typeof height === 'number' ? `${height}px` : height;
//     }

//     return baseStyles;
//   };

//   const beforeAfterStyles = `
//     [data-glow]::before,
//     [data-glow]::after {
//       pointer-events: none;
//       content: "";
//       position: absolute;
//       inset: calc(var(--border-size) * -1);
//       border: var(--border-size) solid transparent;
//       border-radius: calc(var(--radius) * 1px);
//       background-attachment: fixed;
//       background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
//       background-repeat: no-repeat;
//       background-position: 50% 50%;
//       mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
//       mask-clip: padding-box, border-box;
//       mask-composite: intersect;
//     }
    
//     [data-glow]::before {
//       background-image: radial-gradient(
//         calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
//         calc(var(--x, 0) * 1px)
//         calc(var(--y, 0) * 1px),
//         hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
//       );
//       filter: brightness(2);
//     }
    
//     [data-glow]::after {
//       background-image: radial-gradient(
//         calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
//         calc(var(--x, 0) * 1px)
//         calc(var(--y, 0) * 1px),
//         hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
//       );
//     }
    
//     [data-glow] [data-glow] {
//       position: absolute;
//       inset: 0;
//       will-change: filter;
//       opacity: var(--outer, 1);
//       border-radius: calc(var(--radius) * 1px);
//       border-width: calc(var(--border-size) * 20);
//       filter: blur(calc(var(--border-size) * 10));
//       background: none;
//       pointer-events: none;
//       border: none;
//     }
    
//     [data-glow] > [data-glow]::before {
//       inset: -10px;
//       border-width: 10px;
//     }
//   `;

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
//       <div
//         ref={cardRef}
//         data-glow
//         style={getInlineStyles()}
//         className={`
//           ${getSizeClasses()}
//           ${!customSize ? 'aspect-[3/4]' : ''}
//           rounded-2xl
//           relative
//           grid
//           grid-rows-[1fr_auto]
//           shadow-[0_1rem_2rem_-1rem_black]
//           p-4
//           gap-4
//           backdrop-blur-[5px]
//           ${className}
//         `}
//       >
//         <div ref={innerRef} data-glow></div>
//         {children}
//       </div>
//     </>
//   );
// };

// export { GlowCard };


// src/components/GlowCard.jsx
import React, { useEffect, useRef } from 'react';

// GlowCard component with dynamic glow effect based on mouse position
const GlowCard = ({
    children,
    className = '',
    glowColor = 'blue',
    size = 'md',
    width,
    height,
    customSize = false,
    onClick
}) => {
    const cardRef = useRef(null);
    const innerRef = useRef(null);

    // Define colors and sizes
    const glowColorMap = {
        blue: { base: 220, spread: 200 },
        purple: { base: 280, spread: 300 },
        green: { base: 120, spread: 200 },
        red: { base: 0, spread: 200 },
        orange: { base: 30, spread: 200 }
    };

    const sizeMap = {
        sm: 'w-48 h-64',
        md: 'w-64 h-80',
        lg: 'w-80 h-96'
    };

    useEffect(() => {
        // Function to synchronize mouse pointer position with CSS variables
        const syncPointer = (e) => {
            const { clientX: x, clientY: y } = e;
            
            if (cardRef.current) {
                // Update CSS variables for glow effect
                cardRef.current.style.setProperty('--x', x.toFixed(2));
                cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
                cardRef.current.style.setProperty('--y', y.toFixed(2));
                cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
            }
        };

        // Add event listener for mouse movement
        document.addEventListener('pointermove', syncPointer);
        
        // Cleanup function to remove event listener
        return () => document.removeEventListener('pointermove', syncPointer);
    }, []);

    // Get color values from the map
    const { base, spread } = glowColorMap[glowColor] || glowColorMap.blue;

    // Determine the CSS class for sizing
    const getSizeClasses = () => {
        if (customSize) {
            return '';
        }
        return sizeMap[size] || sizeMap.md;
    };

    // Determine inline styles for the glow effect
    const getInlineStyles = () => {
        const baseStyles = {
            '--base': base,
            '--spread': spread,
            '--radius': '14',
            '--border': '3',
            '--backdrop': 'hsl(0 0% 60% / 0.12)',
            '--backup-border': 'var(--backdrop)',
            '--size': '200',
            '--outer': '1',
            '--border-size': 'calc(var(--border, 2) * 1px)',
            '--spotlight-size': 'calc(var(--size, 150) * 1px)',
            '--hue': `calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))`,
            backgroundImage: `radial-gradient(
                var(--spotlight-size) var(--spotlight-size) at
                calc(var(--x, 0) * 1px)
                calc(var(--y, 0) * 1px),
                hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
            )`,
            backgroundColor: 'var(--backdrop, transparent)',
            backgroundSize: `calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))`,
            backgroundPosition: '50% 50%',
            backgroundAttachment: 'fixed',
            border: `var(--border-size) solid var(--backup-border)`,
            position: 'relative',
            touchAction: 'none',
        };

        // Add width and height if custom sizing is enabled
        if (customSize && width !== undefined) {
            baseStyles.width = typeof width === 'number' ? `${width}px` : width;
        }
        if (customSize && height !== undefined) {
            baseStyles.height = typeof height === 'number' ? `${height}px` : height;
        }

        return baseStyles;
    };

    // Custom CSS for the before and after pseudo-elements
    const beforeAfterStyles = `
        [data-glow]::before,
        [data-glow]::after {
            pointer-events: none;
            content: "";
            position: absolute;
            inset: calc(var(--border-size) * -1);
            border: var(--border-size) solid transparent;
            border-radius: calc(var(--radius) * 1px);
            background-attachment: fixed;
            background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
            background-repeat: no-repeat;
            background-position: 50% 50%;
            mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
            mask-clip: padding-box, border-box;
            mask-composite: intersect;
        }
        
        [data-glow]::before {
            background-image: radial-gradient(
                calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
                calc(var(--x, 0) * 1px)
                calc(var(--y, 0) * 1px),
                hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
            );
            filter: brightness(2);
        }
        
        [data-glow]::after {
            background-image: radial-gradient(
                calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
                calc(var(--x, 0) * 1px)
                calc(var(--y, 0) * 1px),
                hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
            );
        }
        
        [data-glow] > div[data-inner-glow] {
            position: absolute;
            inset: 0;
            will-change: filter;
            opacity: var(--outer, 1);
            border-radius: calc(var(--radius) * 1px);
            border-width: calc(var(--border-size) * 20);
            filter: blur(calc(var(--border-size) * 10));
            background: none;
            pointer-events: none;
            border: none;
        }
        
        [data-glow] > div[data-inner-glow]::before {
            inset: -10px;
            border-width: 10px;
        }
    `;

    return (
        <>
            {/* Inline style tag for pseudo-elements */}
            <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
            <div
                ref={cardRef}
                data-glow
                style={getInlineStyles()}
                className={`
                    ${getSizeClasses()}
                    ${!customSize ? 'aspect-[3/4]' : ''}
                    rounded-2xl
                    relative
                    grid
                    grid-rows-[1fr_auto]
                    shadow-[0_1rem_2rem_-1rem_black]
                    p-4
                    gap-4
                    backdrop-blur-[5px]
                    ${className}
                `}
                onClick={onClick}
            >
                <div ref={innerRef} data-inner-glow></div>
                {children}
            </div>
        </>
    );
};

export { GlowCard };

