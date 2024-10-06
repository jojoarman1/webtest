import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import rukaGif from '../image/Send.json'; // Импорт анимации
import confettiAnimation from '../image/confetti.json'; // Импорт анимации конфетти
import Image from 'next/image'; // Импортируем Image для оптимизации изображений
import backIcon from '../image/back.svg'; // Импортируем SVG-иконку
import ResponsiveBackground from '../ResponsiveBackground'; // Импортируем компонент ResponsiveBackground

interface SendProps {
  onBack: () => void; // Обработчик нажатия на кнопку "Назад"
  isVisible: boolean; // Пропс для управления видимостью кнопки
}

const Send: React.FC<SendProps> = ({ onBack, isVisible }) => {
  const [scaleFactor, setScaleFactor] = useState(1);
  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

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

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (cardNumber && amount) {
      console.log('Card Number:', cardNumber);
      console.log('Amount:', amount);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      alert('Please fill in all fields');
    }
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <ResponsiveBackground> {/* Оборачиваем содержимое в ResponsiveBackground */}
      {isVisible && (
        <motion.button
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          variants={elementVariants}
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'absolute',
            top: '20px', // Расположение кнопки "Назад"
            left: '20px', // Расположение кнопки "Назад"
            zIndex: 1000, // Убедитесь, что кнопка на переднем плане
          }}
        >
          <Image src={backIcon} alt="Назад" width={40} height={40} />
        </motion.button>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={elementVariants}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: `${25 * scaleFactor}px`,
        }}
      >
        <Lottie
          animationData={rukaGif}
          style={{ width: `${100 * scaleFactor}px`, height: 'auto' }}
          loop
        />
      </motion.div>

      <motion.p
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
        variants={elementVariants}
        style={{
          color: '#666',
          fontSize: `${14 * scaleFactor}px`,
          textAlign: 'center',
          marginBottom: `${25 * scaleFactor}px`
        }}
      >
        Make a transaction with your card
      </motion.p>

      <motion.form
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.6 }}
        variants={elementVariants}
        onSubmit={handleSubmit}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: `${10 * scaleFactor}px`,
        }}>
          <motion.label
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.7 }}
            variants={elementVariants}
            style={{
              color: '#fff',
              fontSize: `${14 * scaleFactor}px`,
              marginBottom: `${5 * scaleFactor}px`,
            }}
          >
            Enter the amount
          </motion.label>
          <motion.input
            type="text"
            placeholder="0,000,000.00"
            value={amount}
            onChange={handleAmountChange}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.8 }}
            variants={elementVariants}
            style={{
              borderRadius: `${8 * scaleFactor}px`,
              border: 'none',
              backgroundColor: '#131214',
              color: '#fff',
              padding: `${10 * scaleFactor}px`,
              fontSize: '16px', // Фиксированный размер шрифта
              marginBottom: `${10 * scaleFactor}px`,
              touchAction: 'none', // Предотвращаем масштабирование
            }}
            inputMode="decimal" // Устанавливаем режим ввода для чисел
            maxLength={200} // Максимальная длина для ввода
          />
          <motion.label
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.9 }}
            variants={elementVariants}
            style={{
              color: '#fff',
              fontSize: `${14 * scaleFactor}px`,
              marginBottom: `${5 * scaleFactor}px`,
            }}
          >
            Enter card number
          </motion.label>
          <motion.input
            type="text"
            placeholder="1111 2222 333 4444"
            value={cardNumber}
            onChange={handleCardNumberChange}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 1 }}
            variants={elementVariants}
            style={{
              borderRadius: `${8 * scaleFactor}px`,
              border: 'none',
              backgroundColor: '#131214',
              color: '#fff',
              padding: `${10 * scaleFactor}px`,
              fontSize: '16px', // Фиксированный размер шрифта
              touchAction: 'none', // Предотвращаем масштабирование
            }}
            inputMode="numeric" // Устанавливаем режим ввода для чисел
            maxLength={200} // Максимальная длина для ввода
          />
        </div>

        <motion.button
          type="submit"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 1.1 }}
          variants={elementVariants}
          style={{
            backgroundColor: '#21D589',
            color: 'white',
            border: 'none',
            borderRadius: `${12 * scaleFactor}px`,
            cursor: 'pointer',
            padding: `${15 * scaleFactor}px 0`,
            fontSize: `${16 * scaleFactor}px`,
            marginTop: `${20 * scaleFactor}px`,
          }}
        >
          Make a transaction
        </motion.button>
      </motion.form>

      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
          }}
        >
          <Lottie animationData={confettiAnimation} loop={false} style={{
            width: '200%',
            height: '220%',
          }} />
        </motion.div>
      )}
    </ResponsiveBackground>
  );
};

export default Send;
