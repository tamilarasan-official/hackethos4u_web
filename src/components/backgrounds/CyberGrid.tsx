import React from 'react';

interface CyberGridProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const CyberGrid: React.FC<CyberGridProps> = ({ intensity = 'medium', className = '' }) => {
  // Make grids VERY VISIBLE - increased opacity significantly
  const config = {
    low: { opacity: 'opacity-60', strokeOpacity: 0.5, glowColor: 'rgba(255, 107, 53, 0.7)' },
    medium: { opacity: 'opacity-75', strokeOpacity: 0.7, glowColor: 'rgba(255, 107, 53, 0.9)' },
    high: { opacity: 'opacity-90', strokeOpacity: 0.9, glowColor: 'rgba(255, 107, 53, 1)' }
  }[intensity];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0, contain: 'layout style paint' }}
    >
      {/* Main Tech Grid - MUCH MORE VISIBLE */}
      <svg
        className={`absolute inset-0 w-full h-full ${config.opacity}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ mixBlendMode: 'screen', willChange: 'transform' }}
      >
        <defs>
          {/* Large Grid Pattern - 40px squares - THICKER LINES */}
          <pattern id="tech-grid-large" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="2"
              opacity={config.strokeOpacity}
            />
          </pattern>

          {/* Small Grid Pattern - 10px squares for detail */}
          <pattern id="tech-grid-small" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="0.8"
              opacity={config.strokeOpacity * 0.4}
            />
          </pattern>

          {/* Glowing point */}
          <radialGradient id="grid-glow">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="1" />
            <stop offset="50%" stopColor="#FF6B35" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
          </radialGradient>

          {/* Glowing line gradient */}
          <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 107, 53, 0)" />
            <stop offset="50%" stopColor="rgba(255, 107, 53, 1)" />
            <stop offset="100%" stopColor="rgba(255, 107, 53, 0)" />
          </linearGradient>
        </defs>

        {/* Small detail grid */}
        <rect width="100%" height="100%" fill="url(#tech-grid-small)" />

        {/* Main large grid */}
        <rect width="100%" height="100%" fill="url(#tech-grid-large)" />

        {/* Bright glowing intersection points */}
        <circle cx="20%" cy="20%" r="5" fill="url(#grid-glow)">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        </circle>

        <circle cx="40%" cy="35%" r="4" fill="url(#grid-glow)" style={{animationDelay: '0.5s'}}>
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" />
        </circle>

        <circle cx="65%" cy="25%" r="5" fill="url(#grid-glow)" style={{animationDelay: '1s'}}>
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        </circle>

        <circle cx="85%" cy="55%" r="4" fill="url(#grid-glow)" style={{animationDelay: '1.5s'}}>
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" />
        </circle>

        <circle cx="30%" cy="70%" r="5" fill="url(#grid-glow)" style={{animationDelay: '2s'}}>
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
        </circle>

        <circle cx="70%" cy="75%" r="4" fill="url(#grid-glow)" style={{animationDelay: '2.5s'}}>
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* Bright flowing horizontal lines */}
        <line x1="-100%" y1="25%" x2="0%" y2="25%" stroke="url(#line-glow)" strokeWidth="3">
          <animate attributeName="x1" values="-100%;200%" dur="4s" repeatCount="indefinite" />
          <animate attributeName="x2" values="0%;300%" dur="4s" repeatCount="indefinite" />
        </line>

        <line x1="-100%" y1="60%" x2="0%" y2="60%" stroke="url(#line-glow)" strokeWidth="3">
          <animate attributeName="x1" values="-100%;200%" dur="5s" repeatCount="indefinite" />
          <animate attributeName="x2" values="0%;300%" dur="5s" repeatCount="indefinite" />
        </line>

        <line x1="-100%" y1="85%" x2="0%" y2="85%" stroke="url(#line-glow)" strokeWidth="3">
          <animate attributeName="x1" values="-100%;200%" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="0%;300%" dur="6s" repeatCount="indefinite" />
        </line>

        {/* Bright flowing vertical lines */}
        <line x1="30%" y1="-100%" x2="30%" y2="0%" stroke="url(#line-glow)" strokeWidth="3">
          <animate attributeName="y1" values="-100%;200%" dur="5s" repeatCount="indefinite" />
          <animate attributeName="y2" values="0%;300%" dur="5s" repeatCount="indefinite" />
        </line>

        <line x1="75%" y1="-100%" x2="75%" y2="0%" stroke="url(#line-glow)" strokeWidth="3">
          <animate attributeName="y1" values="-100%;200%" dur="4.5s" repeatCount="indefinite" />
          <animate attributeName="y2" values="0%;300%" dur="4.5s" repeatCount="indefinite" />
        </line>
      </svg>

      {/* Subtle vignette to prevent grid from overwhelming content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
        }}
      />
    </div>
  );
};

export default CyberGrid;
