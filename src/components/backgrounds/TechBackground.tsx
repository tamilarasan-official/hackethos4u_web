import React from 'react';

interface TechBackgroundProps {
  variant?: 'hero' | 'section' | 'subtle';
  className?: string;
}

const TechBackground: React.FC<TechBackgroundProps> = ({ variant = 'section', className = '' }) => {
  const getOrbConfig = () => {
    switch (variant) {
      case 'hero':
        return {
          orbs: [
            { size: 'w-[600px] h-[600px]', position: '-top-20 -left-20', color: 'bg-accent/20', delay: '0s' },
            { size: 'w-[700px] h-[700px]', position: '-bottom-20 -right-20', color: 'bg-primary/20', delay: '1.5s' },
            { size: 'w-[500px] h-[500px]', position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', color: 'bg-accent/10', delay: '2.5s' },
          ],
        };
      case 'section':
        return {
          orbs: [
            { size: 'w-[500px] h-[500px]', position: '-top-20 -right-20', color: 'bg-primary/15', delay: '0s' },
            { size: 'w-[400px] h-[400px]', position: '-bottom-20 -left-20', color: 'bg-accent/15', delay: '1s' },
          ],
        };
      case 'subtle':
        return {
          orbs: [
            { size: 'w-[400px] h-[400px]', position: 'top-0 right-0', color: 'bg-primary/10', delay: '0s' },
          ],
        };
      default:
        return { orbs: [] };
    }
  };

  const { orbs } = getOrbConfig();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((orb, index) => (
        <div
          key={index}
          className={`absolute ${orb.size} ${orb.position} ${orb.color} rounded-full blur-3xl animate-pulse-slow`}
          style={{ animationDelay: orb.delay }}
        />
      ))}
    </div>
  );
};

export default TechBackground;
