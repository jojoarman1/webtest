import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Farming: React.FC = () => {
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const baseWidth = 450; // Базовая ширина для расчета масштаба
      const newScaleFactor = screenWidth < baseWidth ? screenWidth / baseWidth : 1;
      setScaleFactor(newScaleFactor);
    };

    // Добавляем слушатель на изменение размера окна
    window.addEventListener('resize', handleResize);
    handleResize(); // Инициализация при монтировании компонента

    // Очищаем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="relative flex items-center justify-center"
    style={{
      backgroundColor: '#131214',
      borderRadius: `${16 * scaleFactor}px`, // Скругление углов с учетом масштаба
      height: `${60 * scaleFactor}px`, // Высота с учетом масштаба
      marginTop: 'auto',
      marginBottom: `${25 * scaleFactor}px`, // Динамический нижний отступ
      marginLeft: `${25 * scaleFactor}px`, // Динамический нижний отступ
      marginRight: `${25 * scaleFactor}px`, // Динамический нижний отступ
      position: 'relative',
      transform: `scale(${scaleFactor})`, // Масштабирование
      transformOrigin: 'top', // Точка масштабирования
    }}
    >
      <div className="flex items-center justify-center">
        <span
          className="text-white"
          style={{
            fontSize: `${16 * scaleFactor}px`, // Размер текста с учетом масштаба
            marginRight: `${5 * scaleFactor}px`,
          }}
        >
          Farming
        </span>
        <span
          className="text-white"
          style={{
            fontSize: `${16 * scaleFactor}px`,
            color: '#21D589',
            marginRight: `${10 * scaleFactor}px`,
          }}
        >
          $B
        </span>
        <span
          className="text-white"
          style={{
            fontSize: `${16 * scaleFactor}px`,
          }}
        >
          23.248
        </span>
      </div>

      <span
        className="text-white"
        style={{
          fontSize: `${11 * scaleFactor}px`, // Размер текста времени с учетом масштаба
          position: 'absolute',
          right: `${20 * scaleFactor}px`, // Отступ справа с учетом масштаба
          margin: `${20 * scaleFactor}px`, // Отступ справа с учетом масштаба
        }}
      >
        05h 03m
      </span>
    </motion.div>
  );
};

export default Farming;
