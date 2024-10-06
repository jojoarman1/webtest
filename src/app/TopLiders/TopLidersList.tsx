import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import '../skeleton.css'; // Импортируем кастомные стили для скелетона
import ResponsiveBackground from '../ResponsiveBackground';

// Интерфейс для пользователей
interface User {
  username: string;
  balance: string;
  type: string;
}

const TopLiders: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Players');
  const [activeTier, setActiveTier] = useState('Common');
  const [scaleFactor, setScaleFactor] = useState(1);
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [users, setUsers] = useState<User[]>([]); // Состояние для пользователей

  const currentUser = {
    username: 'currentUser123',
    balance: '₿ 500,000.00',
    type: 'Premium',
    rank: 1,
  };

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

  useEffect(() => {
    // Симуляция загрузки данных
    setTimeout(() => {
      setUsers([
        { username: 'moxypoksi', balance: '₿ 1522,827.00', type: 'Common' },
        { username: 'janedoe', balance: '₿ 31230,500.00', type: 'Rare' },
        { username: 'richkid', balance: '₿ 2,000,000.00', type: 'Premium' },
        { username: 'sdfhsd', balance: '₿ 152,827.00', type: 'Common' },
        { username: 'dsfglhjla', balance: '₿ 120,500.00', type: 'Rare' },
        { username: 'sdhsdf', balance: '₿ 1,032,000.00', type: 'Premium' },
        { username: 'sdfhsdfh', balance: '₿ 152,827.00', type: 'Common' },
        { username: 'janedoe', balance: '₿ 650,500.00', type: 'Rare' },
        { username: 'ssdfhsh', balance: '₿ 2,240,000.00', type: 'Premium' },
      ]);
      setLoading(false); // Отключаем состояние загрузки после данных
    }, 1000);
  }, []);
    // Анимация для кнопок
    const buttonVariants = {
      initial: { scale: 1 },
      hover: { scale: 1.05, transition: { duration: 0.2 } },
      tap: { scale: 0.95, transition: { duration: 0.1 } },
    };
    // Задайте скорость анимации появления
  const appearTransition = { duration: 0.3 }; // Скорость анимации появления
  return (
    <ResponsiveBackground>
      <div style={{
        borderRadius: `${16 * scaleFactor}px`,
        height: `calc(100vh - ${160 * scaleFactor}px)`,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Кнопки вверху: Players и Banks */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: `${25 * scaleFactor}px`,
          gap: `${10 * scaleFactor}px`
        }}>
         <motion.button
          variants={buttonVariants}
          initial={{ opacity: 0, y: 20 }} // Добавлено для анимации появления
          animate={{ opacity: 1, y: 0 }} // Добавлено для анимации появления
          transition={appearTransition} // Убираем задержку для анимации нажатий
          whileHover="hover"
          whileTap="tap"
          style={{
            flex: 1,
            backgroundColor: activeTab === 'Players' ? '#5D5D5D' : '#131214',
            color: '#FFF',
            borderRadius: `${8 * scaleFactor}px`,
            border: 'none',
            padding: `${10 * scaleFactor}px 0`,
            fontSize: `${12 * scaleFactor}px`,
            height: `${40 * scaleFactor}px`,
          }}
          onClick={() => setActiveTab('Players')}
        >
          Players
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial={{ opacity: 0, y: 20 }} // Добавлено для анимации появления
          animate={{ opacity: 1, y: 0 }} // Добавлено для анимации появления
          transition={appearTransition} // Убираем задержку для анимации нажатий
          whileHover="hover"
          whileTap="tap"
          style={{
            flex: 1,
            backgroundColor: activeTab === 'Banks' ? '#5D5D5D' : '#131214',
            color: '#FFF',
            borderRadius: `${8 * scaleFactor}px`,
            border: 'none',
            padding: `${10 * scaleFactor}px 0`,
            fontSize: `${12 * scaleFactor}px`,
            height: `${40 * scaleFactor}px`,
          }}
          onClick={() => setActiveTab('Banks')}
        >
          Banks
        </motion.button>
        </div>

        {/* Окно текущего пользователя */}
        <motion.div
          variants={buttonVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            backgroundColor: '#131214',
            borderRadius: `${8 * scaleFactor}px`,
            padding: `${10 * scaleFactor}px`,
            height: `${80 * scaleFactor}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: `${25 * scaleFactor}px`,
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <div style={{
              backgroundColor: '#34C759',
              borderRadius: '50%',
              width: `${50 * scaleFactor}px`,
              height: `${50 * scaleFactor}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              fontSize: `${14 * scaleFactor}px`,
              color: '#FFF',
              fontWeight: 'bold',
            }}>
              {currentUser.username.slice(0, 2).toUpperCase()}
              <div style={{
                backgroundColor: '#151416',
                borderRadius: '50%',
                width: `${25 * scaleFactor}px`,
                height: `${25 * scaleFactor}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 0,
                right: `${-5 * scaleFactor}px`,
                fontSize: `${14 * scaleFactor}px`,
                color: '#FFF',
              }}>
                {currentUser.rank}
              </div>
            </div>

            <div style={{ marginLeft: `${10 * scaleFactor}px` }}>
              <div style={{ color: '#FFF', fontSize: `${16 * scaleFactor}px` }}>{currentUser.username}</div>
            </div>
          </div>

          <div style={{ color: '#34C759', fontSize: `${14 * scaleFactor}px` }}>
            <span style={{ color: '#21D589' }}>₿</span> <span style={{ color: '#FFF' }}>{currentUser.balance.replace('₿ ', '')}</span>
          </div>
        </motion.div>

        {/* Секция с уровнями пользователей */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: `${25 * scaleFactor}px`,
          marginLeft: `${25 * scaleFactor}px`,
          marginRight: `${25 * scaleFactor}px`,
          gap: `${10 * scaleFactor}px`, // Добавляем промежуток между кнопками
        }}>
      {['Common', 'Rare', 'Premium', 'Platinum'].map((tier, tierIndex) => {
        let textColor;

        switch (tier) {
          case 'Common':
            textColor = '#AAAAAA';
            break;
          case 'Rare':
            textColor = '#3F5DFF';
            break;
          case 'Premium':
            textColor = '#FFD700';
            break;
          case 'Platinum':
            textColor = '#E5E1E6';
            break;
          default:
            textColor = '#FFF';
        }

        return (
          <motion.button
            key={tier}
            variants={buttonVariants}
            initial={{ opacity: 0, y: 20 }} // Анимация появления
            animate={{ opacity: 1, y: 0 }} // Анимация появления
            transition={{ ...appearTransition, delay: 0 + tierIndex * 0.1 }} // Задержка только для анимации появления
            whileHover="hover"
            whileTap={{ 
              scale: 0.95, // Сжатие при нажатии
              transition: { duration: 0.1 } // Скорость анимации нажатия
            }}
            onClick={() => {
              setActiveTier(tier);
            }}
            style={{
              flex: 1,
              backgroundColor: activeTier === tier ? '#131214' : 'rgba(0, 0, 0, 0)',
              color: textColor,
              borderRadius: `${8 * scaleFactor}px`,
              border: 'none',
              padding: `${10 * scaleFactor}px 0`,
              fontSize: `${12 * scaleFactor}px`,
              height: `${40 * scaleFactor}px`,
            }}
          >
            {tier}
          </motion.button>
            );
          })}
        </div>

        {/* Добавляем надпись "Top 100" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Начальное состояние анимации
          animate={{ opacity: 1, y: 0 }} // Конечное состояние анимации
          transition={appearTransition} // Параметры анимации
          style={{
            color: '#FFF',
            fontSize: `${14 * scaleFactor}px`,
            fontWeight: 'bold',
            textAlign: 'left',
            marginBottom: `${25 * scaleFactor}px`,
          }}
        >
          Top 100
        </motion.div>


        {/* Список пользователей */}
        <div style={{
          flex: 1,
          marginBottom: '0px',
          borderRadius: `${8 * scaleFactor}px`,
          display: 'flex',
          flexDirection: 'column',
        }}>
          {loading
            ? Array.from({ length: 1 }).map((_, index) => (
                <Skeleton key={index} height={80} style={{ marginBottom: '20px', borderRadius: `${8 * scaleFactor}px` }} />
              ))
            : users.map((user, index) => (
                <motion.div
                  key={user.username}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  style={{
                    backgroundColor: '#131214',
                    borderRadius: `${8 * scaleFactor}px`,
                    padding: `${10 * scaleFactor}px`,
                    height: `${80 * scaleFactor}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: `${20 * scaleFactor}px`,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <div style={{
                      backgroundColor: '#34C759',
                      borderRadius: '50%',
                      width: `${50 * scaleFactor}px`,
                      height: `${50 * scaleFactor}px`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      fontSize: `${14 * scaleFactor}px`,
                      color: '#FFF',
                      fontWeight: 'bold',
                    }}>
                      {user.username.slice(0, 2).toUpperCase()}
                      <div style={{
                        backgroundColor: '#151416',
                        borderRadius: '50%',
                        width: `${25 * scaleFactor}px`,
                        height: `${25 * scaleFactor}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: 0,
                        right: `${-5 * scaleFactor}px`,
                        fontSize: `${14 * scaleFactor}px`,
                        color: '#FFF',
                      }}>
                        {index + 1}
                      </div>
                    </div>
                    <div style={{ marginLeft: `${10 * scaleFactor}px` }}>
                      <div style={{ color: '#FFF', fontSize: `${16 * scaleFactor}px` }}>{user.username}</div>
                      <div style={{ color: '#FFF', fontSize: `${12 * scaleFactor}px` }}>{user.type}</div>
                    </div>
                  </div>

                  <div style={{ color: '#34C759', fontSize: `${14 * scaleFactor}px` }}>
                    <span style={{ color: '#21D589' }}>₿</span> <span style={{ color: '#FFF' }}>{user.balance.replace('₿ ', '')}</span>
                  </div>
                </motion.div>
              ))
          }
        </div>
      </div>
    </ResponsiveBackground>
  );
};

export default TopLiders;
