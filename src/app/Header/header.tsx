"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Импортируем framer-motion
import TopIconHistory from '../image/history.svg'; // Импортируем SVG-иконку

const Header: React.FC = () => {
  return (
    <div
    style={{
      backgroundColor: '#252525', // Устанавливаем цвет фона
      height: '80px', // Устанавливаем высоту
      width: '100%',
      display: 'flex', // Используем flexbox
      alignItems: 'center', // Центрируем элементы по вертикали
      padding: '10px 15px', // Отступы сверху и снизу по 10px, слева и справа по 15px
      position: 'relative',
      borderBottom: '1px solid #2C2C2E', // Добавляем нижнюю обводку шириной 1 пиксель
    }}
    
    >
      {/* Обводка для круга */}
      <div
        style={{
          width: '60px', // Ширина обводки (40px + 2*stroke)
          height: '60px', // Высота обводки (40px + 2*stroke)
          borderRadius: '50%', // Округляем углы
          border: '2px solid #8B3CF7', // Обводка
          display: 'flex', // Используем flexbox для центрирования круга
          justifyContent: 'center', // Центрируем круг по горизонтали
          alignItems: 'center', // Центрируем круг по вертикали
          marginRight: '15px', // Отступ справа от обводки
        }}
      >
        {/* Серый круг */}
        <div
          style={{
            width: '50px', // Ширина круга
            height: '50px', // Высота круга
            backgroundColor: '#8B3CF7', // Цвет круга
            borderRadius: '50%', // Округляем углы
          }}
        />
      </div>
      {/* Текст рядом с кружком */}
      <span
        style={{
          fontSize: '16px', // Размер шрифта
          color: '#FFF', // Цвет текста (можете изменить на нужный)
          marginRight: '10px', // Отступ справа от текста
          fontWeight: 500, // Устанавливаем Medium (500) вес шрифта
        }}
      >
        Ducky Johny
      </span>

      <motion.div
        style={{
          flexGrow: 1, // Занимаем оставшееся пространство
          display: 'flex', // Используем flexbox
          justifyContent: 'flex-end', // Выравниваем элементы по правому краю
        }}
        initial={{ opacity: 0 }} // Начальное состояние анимации
        animate={{ opacity: 1 }} // Анимированное состояние
        transition={{ duration: 0.5 }} // Параметры анимации
      >
        <Image
          src={TopIconHistory} // Используем импортированную SVG-иконку
          alt="Icon" // Альтернативный текст для иконки
          width={30} // Ширина иконки
          height={30} // Высота иконки
          style={{ marginLeft: '10px' }} // Отступ слева от иконки
        />
        {/* Здесь можно добавить другие элементы или оставить пустым */}
      </motion.div>
    </div>
  );
};

export default Header;
