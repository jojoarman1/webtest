"use client";
import React, { useState, useEffect, useCallback } from 'react';

const CardBlock: React.FC = () => {
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [pressPosition, setPressPosition] = useState<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false); // Состояние для видимости карты

  // Ограничение наклона
  const TILT_LIMIT = 15;

  useEffect(() => {
    const handleResize = () => {
      const newScaleFactor = Math.min(window.innerWidth / 450, 1);
      setScaleFactor(newScaleFactor);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Показать карту с задержкой
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100); // Задержка появления карты
    return () => clearTimeout(timer);
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(true);
    setPressPosition({ x: event.clientX, y: event.clientY });
    updateTilt(event.clientX, event.clientY);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsMouseDown(true);
    setPressPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    updateTilt(event.touches[0].clientX, event.touches[0].clientY);
  };

  const handleMouseUpGlobal = useCallback(() => {
    setIsMouseDown(false);
    resetTilt();
    setPressPosition(null);
  }, []);

  const handleTouchEndGlobal = useCallback(() => {
    setIsMouseDown(false);
    resetTilt();
    setPressPosition(null);
  }, []);

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  const updateTilt = useCallback((clientX: number, clientY: number) => {
    const card = document.querySelector('.card') as HTMLElement;
    const rect = card.getBoundingClientRect();

    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const tiltX = ((offsetY / height) - 0.5) * 35;
    const tiltY = ((offsetX / width) - 0.5) * 35;

    const adjustedTilt = rotation === 180 ? { x: -tiltX, y: +tiltY } : { x: -tiltX, y: tiltY };

    const clampedTiltX = Math.max(-TILT_LIMIT, Math.min(TILT_LIMIT, adjustedTilt.x));
    const clampedTiltY = Math.max(-TILT_LIMIT, Math.min(TILT_LIMIT, adjustedTilt.y));

    setTilt({ x: clampedTiltX, y: clampedTiltY });
    setPressPosition({ x: clientX, y: clientY });
  }, [rotation]);

  useEffect(() => {
    const handleMouseMoveGlobal = (event: MouseEvent) => {
      if (isMouseDown) {
        updateTilt(event.clientX, event.clientY);
      }
    };

    const handleTouchMoveGlobal = (event: TouchEvent) => {
      if (isMouseDown) {
        updateTilt(event.touches[0].clientX, event.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMoveGlobal);
    window.addEventListener('mouseup', handleMouseUpGlobal); // Добавляем глобальный обработчик
    window.addEventListener('touchmove', handleTouchMoveGlobal);
    window.addEventListener('touchend', handleTouchEndGlobal); // Добавляем глобальный обработчик

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      window.removeEventListener('mouseup', handleMouseUpGlobal); // Удаляем глобальный обработчик
      window.removeEventListener('touchmove', handleTouchMoveGlobal);
      window.removeEventListener('touchend', handleTouchEndGlobal); // Удаляем глобальный обработчик
    };
  }, [isMouseDown, handleMouseUpGlobal, handleTouchEndGlobal, updateTilt]);

  const calculateShadow = () => {
    if (!pressPosition) return '0px 0px 20px rgba(135,206,250, 0)';

    const card = document.querySelector('.card') as HTMLElement;
    const rect = card.getBoundingClientRect();

    const offsetX = pressPosition.x - rect.left;
    const offsetY = pressPosition.y - rect.top;

    const shadowX = ((-offsetX / rect.width) + 0.5) * 25;
    const shadowY = ((-offsetY / rect.height) + 0.5) * 25;
    const blur = 20;
    const spread = 0;

    const adjustedShadowX = rotation === 180 ? -shadowX : shadowX;
    const adjustedShadowY = rotation === 180 ? -shadowY : shadowY;

    const finalShadowY = rotation === 180 ? -adjustedShadowY : adjustedShadowY;

    return `${adjustedShadowX}px ${finalShadowY}px ${blur}px ${spread}px rgba(255,255,255, 0)`;
  };

  const styles = {
    container: {
      perspective: '1000px',
      paddingLeft: `${15 * scaleFactor}px`,
      paddingRight: `${15 * scaleFactor}px`,
      boxSizing: 'border-box',
    } as React.CSSProperties,
    card: {
      borderRadius: `${10 * scaleFactor}px`,
      height: `${250 * scaleFactor}px`,
      width: `100%`,
      maxWidth: `${420 * scaleFactor}px`,
      position: 'relative',
      transition: isMouseDown 
        ? 'transform 0.2s ease-out, box-shadow 0.2s ease-out' 
        : 'transform 0.35s ease-out, box-shadow 0.5s ease-out, opacity 0.5s ease-out',
      transformStyle: 'preserve-3d',
      transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + rotation}deg) scale(${isMouseDown ? 1.05 : 1})`,
      boxShadow: calculateShadow(),
      opacity: isVisible ? 1 : 0,
      margin: '0 auto', // Центрируем карту по горизонтали
    } as React.CSSProperties,
    face: {
      borderRadius: `${10 * scaleFactor}px`,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      display: 'flex',
      flexDirection: 'column', // Изменено на 'column' для вертикального расположения
      justifyContent: 'space-between', // Изменено для равномерного распределения пространства
      alignItems: 'center',
      fontSize: `${28 * scaleFactor}px`,
      fontWeight: '700',
      color: 'white',
      cursor: 'pointer',
      padding: '20px',
    } as React.CSSProperties,
    front: {
      backgroundColor: '#2C2C2C',
    } as React.CSSProperties,
    back: {
      backgroundColor: '#2C2C2C',
      transform: 'rotateY(180deg)',
    } as React.CSSProperties,
    button: {
      width: '100%',
      marginTop: `${5 * scaleFactor}px`,
      color: 'white',
      cursor: 'pointer',
      fontSize: `${14 * scaleFactor}px`,
      border: 'none',
      borderRadius: '5px',
      fontWeight: '600'
    } as React.CSSProperties,
  };
  
  
  const handleRotate = () => {
    setRotation(prevRotation => prevRotation + 180);
  };

  return (
    <div>
      <div style={styles.container}>
        <div
          className="card"
          style={styles.card}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onMouseUp={handleMouseUpGlobal}
          onTouchEnd={handleTouchEndGlobal}
        >
          <div
            style={{ ...styles.face, ...styles.front }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div style={{ textAlign: 'left', width: '100%' }}>
              <h1 style={{ marginBottom: '5px', fontSize: '28px', fontWeight: 'bold' }}>Jojoarmany</h1>
              <div style={{ backgroundColor: '#313131', width: '300px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', borderRadius: '10px', paddingLeft: '10px' }}>
                <h2 style={{ margin: '0', fontSize: '17px', fontWeight: '400' }}>
                  <span style={{ color: '#34C759' }}>₿</span> <span style={{ color: 'white' }}>1 000 000 000</span>
                </h2>
              </div>
            </div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: 'auto' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0' }}>Platinum</h2>
              <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0' }}>
                <span style={{ color: '#368CCC' }}>Ton</span>
                <span style={{ color: 'white' }}>Bank</span>
              </h2>
            </div>
          </div>
          <div style={{ ...styles.face, ...styles.back }}>
            <div style={{ textAlign: 'left', width: '100%' }}>
              <h1 style={{ margin: '0', fontSize: '28px', fontWeight: 'bold' }}>Card number</h1>
              <div style={{ backgroundColor: '#313131', width: '300px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', borderRadius: '10px', paddingLeft: '10px', marginTop: '10px' }}>
                <h2 style={{ margin: '0', fontSize: '17px', fontWeight: '400' }}>1111 2222 3333 4444</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button 
        style={styles.button} 
        onClick={handleRotate}
      >
        Turn a bank card
      </button>
    </div>
  );
  
  
  
  
  
  
};

export default CardBlock;
