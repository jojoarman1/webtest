import React from 'react';
import Image from 'next/image'; // Импортируем Image для оптимизации изображений
import backIcon from '../image/back.svg'; // Импортируем SVG-иконку
import ResponsiveBackground from '../ResponsiveBackground'; // Импортируем компонент ResponsiveBackground

interface BuyProps {
  onBack: () => void; // Обработчик нажатия на кнопку
  isVisible: boolean; // Пропс для управления видимостью кнопки
}

const Buy: React.FC<BuyProps> = ({ onBack, isVisible }) => {
  return (
    <ResponsiveBackground>
      {isVisible && (
        <button
          onClick={onBack}
          className="back-button"
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            position: 'absolute', 
          }} 
        >
          {/* Используем оптимизированный компонент Image для рендеринга иконки */}
          <Image src={backIcon} alt="Назад" width={40} height={40} /> {/* Устанавливаем размеры иконки 40x40 */}
        </button>
      )}
      {/* Добавь сюда содержимое для страницы Пополнение баланса */}
    </ResponsiveBackground>
  );
};

export default Buy;
