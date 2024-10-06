import React from 'react';

interface InviteProps {
  username: string;
  balance: string;
  scaleFactor: number; // Убираем type из интерфейса
}

const Invite: React.FC<InviteProps> = ({ username, balance, scaleFactor }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: `${10 * scaleFactor}px`, // Масштабируемый отступ
      borderRadius: `${8 * scaleFactor}px`, // Масштабируемое скругление
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}>
        <div style={{
          backgroundColor: '#2A6729',
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
            fontSize: `${12 * scaleFactor}px`, // Масштабируемый размер шрифта
          }}>
            {balance}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invite;
