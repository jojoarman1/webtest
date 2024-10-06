import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SendIcon from '../image/send.svg';
import BuyIcon from '../image/buy.svg';
import StoreIcon from '../image/store.svg';
import SwitchIcon from '../image/switch.svg';

interface ButtonsProps {
  toggleSection: (section: string | null) => void;
}

const Buttons: React.FC<ButtonsProps> = ({ toggleSection }) => {
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const baseWidth = 450;
      const newScaleFactor = screenWidth < baseWidth ? screenWidth / baseWidth : 1;
      setScaleFactor(newScaleFactor);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const buttons = [
    { icon: SwitchIcon, label: 'Cardholder', onClick: 'cardholder', width: 95 },
    { icon: StoreIcon, label: 'Store', onClick: 'store', width: 75 },
    { icon: SendIcon, label: 'Send $B', onClick: 'send', width: 75 },
    { icon: BuyIcon, label: 'Buy $B', onClick: 'buy', width: 95 }
  ];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: `${25 * scaleFactor}px`, // Масштабируем отступы
      gap: `${20 * scaleFactor}px`, // Масштабируем расстояние между кнопками
      boxSizing: 'border-box', // Включаем отступы в ширину контейнера
      width: '100%', // Ширина на 100% экрана
    }}>
      {buttons.map((button, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => button.onClick && toggleSection(button.onClick)}
            style={{
              width: `${button.width * scaleFactor}px`, // Ширина кнопки
              height: `${80 * scaleFactor}px`, // Высота кнопки
              borderRadius: `${16 * scaleFactor}px`, // Радиус кнопки
              cursor: 'pointer',
              backgroundColor: '#131214',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image src={button.icon} alt={`${button.label} Icon`} width={31 * scaleFactor} height={30 * scaleFactor} />
            <span style={{ marginTop: `${10 * scaleFactor}px`, fontSize: `${10 * scaleFactor}px` }}>{button.label}</span>
          </motion.button>
        </div>
      ))}
    </div>
  );
};

export default Buttons;
