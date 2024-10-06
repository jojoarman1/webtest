import React, { useState, useEffect } from 'react';

interface ResponsiveBackgroundProps {
  children: React.ReactNode; // Позволяет передавать любое содержимое в этот компонент
}

const ResponsiveBackground: React.FC<ResponsiveBackgroundProps> = ({ children }) => {
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const baseWidth = 450; // Базовая ширина для расчета масштаба
      const newScaleFactor = screenWidth < baseWidth ? screenWidth / baseWidth : 1;
      setScaleFactor(newScaleFactor);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{
      borderRadius: `${16 * scaleFactor}px`,
      width: `calc(100% - ${50 * scaleFactor}px)`,
      marginLeft: `${25 * scaleFactor}px`,
      marginTop: `${25 * scaleFactor}px`,
      marginRight: `${25 * scaleFactor}px`,
      height: `calc(100vh - ${160 * scaleFactor}px)`,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {children}
    </div>
  );
};

export default ResponsiveBackground;
