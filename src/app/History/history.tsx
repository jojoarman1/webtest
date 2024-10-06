import React from 'react';
import Image from 'next/image'; // Используем Image для оптимизации изображений
import backIcon from '../image/back.svg'; // Импорт SVG-иконки
import ResponsiveBackground from '../ResponsiveBackground'; // Импортируем компонент ResponsiveBackground

interface HistoryProps {
  onBack: () => void; // Обработчик нажатия на кнопку
  isVisible: boolean; // Пропс для управления видимостью кнопки
}

const History: React.FC<HistoryProps> = ({ onBack, isVisible }) => {
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
      {/* Добавь сюда содержимое, относящееся к истории */}
    </ResponsiveBackground>
  );
};

export default History;
