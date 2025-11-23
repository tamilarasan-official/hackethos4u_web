import React from 'react';

interface FlowingLinesBackgroundProps {
  variant?: 'wave' | 'circuit';
  direction?: 'ltr' | 'rtl';
  className?: string;
}

const FlowingLinesBackground: React.FC<FlowingLinesBackgroundProps> = ({
  variant = 'wave',
  direction = 'ltr',
  className = ''
}) => {
  const getLinesPaths = () => {
    switch (variant) {
      case 'wave':
        return [
          { d: 'M0,100 Q250,50 500,100 T1000,100 T1500,100', delay: '0s', dasharray: '1500' },
          { d: 'M0,200 Q250,150 500,200 T1000,200 T1500,200', delay: '0.5s', dasharray: '1500' },
          { d: 'M0,300 Q250,250 500,300 T1000,300 T1500,300', delay: '1s', dasharray: '1500' },
        ];
      case 'circuit':
        return [
          // Left to center paths
          { d: 'M0,150 L200,150 L200,250 L400,250 L400,150 L600,150', delay: '0s', dasharray: '800' },
          { d: 'M100,50 L100,200 L300,200 L300,300 L500,300', delay: '0.7s', dasharray: '700' },
          { d: 'M0,350 L150,350 L150,200 L350,200 L350,400 L600,400', delay: '1.4s', dasharray: '900' },
          // Right to center paths (mirrored)
          { d: 'M1500,150 L1300,150 L1300,250 L1100,250 L1100,150 L900,150', delay: '0.3s', dasharray: '800' },
          { d: 'M1400,50 L1400,200 L1200,200 L1200,300 L1000,300', delay: '1s', dasharray: '700' },
          { d: 'M1500,350 L1350,350 L1350,200 L1150,200 L1150,400 L900,400', delay: '1.7s', dasharray: '900' },
        ];
      default:
        return [];
    }
  };

  const animationClass = direction === 'rtl' ? 'animate-data-flow-reverse' : 'animate-data-flow';

  const lines = getLinesPaths();

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ contain: 'layout style paint' }}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-50"
        preserveAspectRatio="none"
        style={{ mixBlendMode: 'screen', willChange: 'transform' }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(255, 107, 53)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="rgb(255, 107, 53)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="rgb(255, 107, 53)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {lines.map((line, index) => (
          <path
            key={index}
            d={line.d}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray={line.dasharray}
            className={animationClass}
            style={{ animationDelay: line.delay }}
          />
        ))}
      </svg>
    </div>
  );
};

export default FlowingLinesBackground;
