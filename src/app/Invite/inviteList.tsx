import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Invite from './invite';
import rukaGif from '../image/ruka.gif'; // Импорт gif-файла из src/image
import ResponsiveBackground from '../ResponsiveBackground'; // Импорт адаптивного фона
import Skeleton from 'react-loading-skeleton'; // Импортируем скелетон
import '../skeleton.css'; // Импорт стилей для скелетонов

const InviteList: React.FC = () => {
  const [invites, setInvites] = useState<{ username: string; balance: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [scaleFactor, setScaleFactor] = useState(1); // Масштабируемый фактор

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const baseWidth = 450; // Базовая ширина для расчета масштаба
      const newScaleFactor = screenWidth < baseWidth ? screenWidth / baseWidth : 1;
      setScaleFactor(newScaleFactor);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Инициализируем масштаб сразу

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Симуляция загрузки данных
    const fetchInvites = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setInvites([
        { username: 'moxypoksi', balance: '₿ 152,827.00' },
        { username: 'janedoe', balance: '₿ 300,500.00' },
        { username: 'huebes', balance: '₿ 210,520.00' },
        { username: '2123', balance: '₿ 210,520.00' },
        { username: 'moxypoksi', balance: '₿ 152,827.00' },
        { username: 'janedoe', balance: '₿ 300,500.00' },
        { username: 'huebes', balance: '₿ 210,520.00' },
        { username: '2123', balance: '₿ 210,520.00' },
        { username: 'moxypoksi', balance: '₿ 152,827.00' },
        { username: 'janedoe', balance: '₿ 300,500.00' },
        { username: 'huebes', balance: '₿ 210,520.00' },
        { username: '2123', balance: '₿ 210,520.00' },
      ]);
      setLoading(false);
    };

    fetchInvites();
  }, []);

  return (
    <ResponsiveBackground> {/* Используем адаптивный фон */}
      <div style={{
        borderRadius: `${16 * scaleFactor}px`,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Используем space-between для распределения элементов
        alignItems: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // Начальное состояние
          animate={{ opacity: 1, scale: 1 }} // Конечное состояние
          transition={{ duration: 0.3 }} // Параметры анимации
        >
          <Image
            src={rukaGif}
            alt="Invite Gif"
            width={90 * scaleFactor}
            height={90 * scaleFactor}
            priority
            unoptimized
          />
        </motion.div>

        <motion.p style={{
          color: '#666',
          fontSize: `${14 * scaleFactor}px`,
          textAlign: 'center',
          marginBottom: `${25 * scaleFactor}px`,
        }}
          initial={{ opacity: 0, y: 20 }} // Начальное состояние
          animate={{ opacity: 1, y: 0 }} // Конечное состояние
          transition={{ duration: 0.3 }}
        >
          Get ₿1000 for a friend or ₿2000 for a friend with Premium Telegram
        </motion.p>

        <motion.div style={{
          color: 'white',
          fontSize: `${16 * scaleFactor}px`,
          fontWeight: 'bold',
          marginBottom: `${25 * scaleFactor}px`,
        }}
          initial={{ opacity: 0, y: 20 }} // Начальное состояние
          animate={{ opacity: 1, y: 0 }} // Конечное состояние
          transition={{ duration: 0.3 }}
        >
          Your frens
        </motion.div>

        <div style={{
          flex: 1,
          width: '100%',
          marginBottom: '0px',
          borderRadius: `${8 * scaleFactor}px`,
          // Убрали overflowY и maxHeight для отключения прокрутки
        }}>
          {loading ? (
            Array.from({ length: 1 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }} // Начальное состояние для скелетона
                animate={{ opacity: 1, y: 0 }} // Конечное состояние
                transition={{ delay: index * 0.1 }} // Задержка для плавного появления
                style={{ marginBottom: `${10 * scaleFactor}px` }}
              >
                <Skeleton
                  className="custom-skeleton"
                  height={`${80 * scaleFactor}px`} // Используем scaleFactor
                />
              </motion.div>
            ))
          ) : (
            invites.map((invite, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }} // Начальное состояние для каждого элемента
                animate={{ opacity: 1, y: 0 }} // Конечное состояние
                transition={{ delay: index * 0.1 }} // Задержка для плавного появления
                style={{
                  backgroundColor: '#131214',
                  borderRadius: `${8 * scaleFactor}px`,
                  marginBottom: `${15 * scaleFactor}px`,
                  padding: `${10 * scaleFactor}px`,
                  height: `${80 * scaleFactor}px`,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Invite
                  username={invite.username}
                  balance={invite.balance}
                  scaleFactor={scaleFactor} // Передаем scaleFactor в Invite
                />
              </motion.div>
            ))
          )}
        </div>

        <motion.div style={{
          width: '100%',
          textAlign: 'center',
          paddingBottom: `${20 * scaleFactor}px`, // Используем paddingBottom для отступа
        }}
          initial={{ opacity: 0, y: 20 }} // Начальное состояние
          animate={{ opacity: 1, y: 0 }} // Конечное состояние
          transition={{ duration: 0.3 }}
        >
          <button style={{
            width: '100%',
            padding: `${15 * scaleFactor}px 0`,
            backgroundColor: '#131214',
            color: '#FFF',
            borderRadius: `${12 * scaleFactor}px`,
            border: 'none',
            fontSize: `${16 * scaleFactor}px`,
          }}>
            Share link
          </button>
        </motion.div>
      </div>
    </ResponsiveBackground>
  );
};

export default InviteList;
