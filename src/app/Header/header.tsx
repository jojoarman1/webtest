"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Импортируем framer-motion
import TopIconFaq from '../image/faq.svg';
import TopIconHistory from '../image/history.svg';

interface HeaderProps {
  toggleSection: (section: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSection }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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

  const handleClick = (index: number | null, section: string) => {
    setActiveIndex(index);
    toggleSection(section);
  };

  // Определяем анимации для кнопок
  const buttonVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1, // Задержка для поочередного появления
      },
    }),
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 flex justify-between items-center"
      style={{
        position: 'relative',
        borderRadius: `${16 * scaleFactor}px`,
        marginTop: `${25 * scaleFactor}px`,
        padding: `0 ${25 * scaleFactor}px 0 ${25 * scaleFactor}px`,
        transformOrigin: 'top',
      }}
      initial={{ opacity: 0, y: -20 }} // Начальное состояние
      animate={{ opacity: 1, y: 0 }} // Анимированное состояние
      transition={{ duration: 0.5 }} // Параметры анимации
    >
      <motion.div
        style={{
          width: `${60 * scaleFactor}px`,
          height: `${60 * scaleFactor}px`,
          borderRadius: '50%',
          backgroundColor: '#131214',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: `${14 * scaleFactor}px`,
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
        onClick={() => handleClick(-1, 'account')} // Используем -1 вместо null
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        custom={0} // Индекс для анимации
      >
        jj
      </motion.div>

      <div className="flex">
        <motion.button
          className="flex items-center justify-center"
          onClick={() => handleClick(0, 'faq')}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          custom={1} // Передаём индекс для анимации
          style={{
            ...buttonStyle,
            width: `${60 * scaleFactor}px`,
            height: `${60 * scaleFactor}px`,
            borderRadius: `${16 * scaleFactor}px`,
          }}
        >
          <Image
            src={TopIconFaq}
            alt="FAQ Icon"
            width={30 * scaleFactor}
            height={30 * scaleFactor}
            style={{
              filter: activeIndex === 0 ? 'invert(40%) sepia(100%) saturate(1000%) hue-rotate(135deg)' : 'none',
            }}
          />
        </motion.button>

        <motion.button
          className="flex items-center justify-center ml-2"
          onClick={() => handleClick(1, 'history')}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          custom={2} // Передаём индекс для анимации
          style={{
            ...buttonStyle,
            width: `${60 * scaleFactor}px`,
            height: `${60 * scaleFactor}px`,
            borderRadius: `${16 * scaleFactor}px`,
          }}
        >
          <Image
            src={TopIconHistory}
            alt="History Icon"
            width={30 * scaleFactor}
            height={30 * scaleFactor}
            style={{
              filter: activeIndex === 1 ? 'invert(40%) sepia(100%) saturate(1000%) hue-rotate(135deg)' : 'none',
            }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

const buttonStyle = {
  backgroundColor: '#131214',
  border: 'none',
  cursor: 'pointer',
};

export default Header;
