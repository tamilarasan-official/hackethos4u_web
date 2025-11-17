import React from 'react';

interface GridBackgroundProps {
  variant?: 'default' | 'perspective' | 'dense';
  className?: string;
}

const GridBackground: React.FC<GridBackgroundProps> = ({ variant = 'default', className = '' }) => {
  const getGridConfig = () => {
    switch (variant) {
      case 'perspective':
        return {
          gridSize: 40,
          opacity: 'opacity-60',
          strokeWidth: '1.5',
          showGlowPoints: true,
        };
      case 'dense':
        return {
          gridSize: 20,
          opacity: 'opacity-50',
          strokeWidth: '1',
          showGlowPoints: false,
        };
      default:
        return {
          gridSize: 30,
          opacity: 'opacity-50',
          strokeWidth: '1.2',
          showGlowPoints: true,
        };
    }
  };

  const config = getGridConfig();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className={`absolute inset-0 w-full h-full ${config.opacity}`}>
        <defs>
          {/* Main Grid Pattern */}
          <pattern
            id={`grid-${variant}`}
            width={config.gridSize}
            height={config.gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${config.gridSize} 0 L 0 0 0 ${config.gridSize}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              className="text-primary"
            />
          </pattern>

          {config.showGlowPoints && (
            <radialGradient id="glow">
              <stop offset="0%" stopColor="rgb(255, 107, 53)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="rgb(255, 107, 53)" stopOpacity="0" />
            </radialGradient>
          )}
        </defs>

        {/* Main grid only - removed small detail grid */}
        <rect width="100%" height="100%" fill={`url(#grid-${variant})`} />

        {config.showGlowPoints && (
          <>
            {/* Animated glowing points at grid intersections */}
            <circle cx="20%" cy="20%" r="3" fill="url(#glow)" className="animate-grid-glow" />
            <circle cx="50%" cy="30%" r="2" fill="url(#glow)" className="animate-grid-glow" style={{ animationDelay: '0.5s' }} />
            <circle cx="80%" cy="40%" r="3" fill="url(#glow)" className="animate-grid-glow" style={{ animationDelay: '1s' }} />
            <circle cx="30%" cy="60%" r="2" fill="url(#glow)" className="animate-grid-glow" style={{ animationDelay: '1.5s' }} />
            <circle cx="70%" cy="70%" r="3" fill="url(#glow)" className="animate-grid-glow" style={{ animationDelay: '2s' }} />
          </>
        )}
      </svg>
    </div>
  );
};

export default GridBackground;
