import React from 'react';
import TextPressure from './TextPressure';

interface LogoProps {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  compact?: boolean;
}

const Logo: React.FC<LogoProps> = ({ onClick, compact = false }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  if (compact) {
    return (
      <a href="#hero" onClick={handleClick} className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-2">
        <div
          style={{ position: 'relative', height: '32px', width: '64px' }}
          className="transition-all duration-300"
        >
          <TextPressure
            text="ŁP"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            fontUrl=""
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={false}
            textColor="inherit"
            strokeColor="#007BFF"
            minFontSize={19}
            className="text-slate-800 dark:text-white group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-300"
          />
        </div>
      </a>
    );
  }

  return (
    <a href="#hero" onClick={handleClick} className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-2">
      <div className="flex flex-col items-center">
        {/* Main TextPressure Logo */}
        <div style={{ position: 'relative', height: '50px', width: '300px' }}>
          <TextPressure
            text="Łukasz Pietrzyk"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            fontUrl=""
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={false}
            textColor="inherit"
            strokeColor="#007BFF"
            minFontSize={18}
            className="text-slate-800 dark:text-white group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-300"
          />
        </div>
        
        {/* Subtitle */}
        <div className="mt-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-300 tracking-wide">
            COACHING & MENTORING
          </span>
        </div>
      </div>
    </a>
  );
};

export default Logo;
