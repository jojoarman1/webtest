import React, { useEffect, useState } from 'react';
import { IoIosCheckmarkCircle, IoIosArrowDroprightCircle } from "react-icons/io"; // Импорт иконок

interface TaskProps {
  title: string;
  reward: string;
  completed: boolean;
}

const Task: React.FC<TaskProps> = ({ title, reward, completed }) => {
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
    <div
      style={{
        ...styles.taskContainer,
        padding: `${15 * scaleFactor}px ${25 * scaleFactor}px`, // Адаптация отступов
        borderRadius: `${8 * scaleFactor}px`, // Адаптация радиуса
        marginBottom: `${15 * scaleFactor}px`, // Адаптация нижнего отступа
        height: `${85 * scaleFactor}px`,
      }}
    >
      <div style={styles.taskContent}>
        <div style={styles.taskInfo}>
          <h3 style={{ ...styles.taskTitle, fontSize: `${14 * scaleFactor}px` }}>{title}</h3>
          <p style={{ ...styles.taskReward, fontSize: `${14 * scaleFactor}px`, marginTop: `${10 * scaleFactor}px` }}>
            Reward: {reward}
          </p>
        </div>
        <div style={styles.taskIcon}>
          {completed ? (
            <IoIosCheckmarkCircle style={{ ...styles.iconCheck, fontSize: `${30 * scaleFactor}px` }} /> // Адаптируем размер галочки
          ) : (
            <IoIosArrowDroprightCircle style={{ ...styles.iconArrow, fontSize: `${30 * scaleFactor}px` }} /> // Адаптируем размер стрелки
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  taskContainer: {
    backgroundColor: '#131214', // Цвет карточки
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    color: 'white',
    fontSize: '14px',
    margin: 0,
  },
  taskReward: {
    color: '#5D5D5D', // Цвет награды
    fontSize: '14px',
    marginTop: '10px',
  },
  taskIcon: {
    fontSize: '30px', // Размер иконки
    color: 'white',
  },
  iconCheck: {
    color: '#21D589', // Зеленая галочка
  },
  iconArrow: {
    color: '#FFF', // Белая стрелка
  },
};

export default Task;
