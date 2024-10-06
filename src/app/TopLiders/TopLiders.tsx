import React, { useEffect, useState } from 'react';

interface InviteProps {
  username: string;
  balance: string;
  type: string;
}

const Invite: React.FC<InviteProps> = ({ username, balance, type }) => {
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
      display: 'flex',
      alignItems: 'center',
      padding: `${10 * scaleFactor}px`, // Добавлено масштабирование отступов
      borderRadius: `${8 * scaleFactor}px`, // Пример скругления
      backgroundColor: '#1B1B1B', // Фоновый цвет
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}>
        <div style={{
          backgroundColor: '#1B1B1B',
          borderRadius: '50%',
          width: `${60 * scaleFactor}px`, // Масштабируемый размер
          height: `${60 * scaleFactor}px`, // Масштабируемый размер
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: `${15 * scaleFactor}px`, // Масштабируемый отступ
        }}>
          <span style={{
            color: 'white',
            fontSize: `${14 * scaleFactor}px`, // Масштабируемый размер шрифта
            fontWeight: 'bold',
          }}>
            {username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            color: 'white',
            fontSize: `${14 * scaleFactor}px`, // Масштабируемый размер шрифта
            margin: 0,
          }}>
            {username}
          </h3>
          <p style={{
            color: '#21D589',
            fontSize: `${10 * scaleFactor}px`, // Масштабируемый размер шрифта
          }}>
            {balance}
          </p>
          <p style={{
            color: '#666',
            fontSize: `${10 * scaleFactor}px`, // Масштабируемый размер шрифта
          }}>
            {type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invite;
