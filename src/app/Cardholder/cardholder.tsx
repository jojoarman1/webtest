import React, { useState } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import backIcon from '../image/back.svg';
import collectionIcon from '../image/Wavecoll.svg';
import boostIcon from '../image/boosticon.svg';
import cardInCollectionIcon from '../image/collectioncard.svg';
import ResponsiveBackground from '../ResponsiveBackground';

interface CardholderProps {
  onBack: () => void;
  isVisible: boolean;
}

const Cardholder: React.FC<CardholderProps> = ({ onBack, isVisible }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipePosition, setSwipePosition] = useState(0); // Отслеживаем положение свайпа

  const slides = [
    { id: 1, content: 'Slide 1' },
    { id: 2, content: 'Slide 2' },
    { id: 3, content: 'Slide 3' }
  ];

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setSwipePosition(0); // Сбрасываем позицию после завершения свайпа
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setIsSwiping(true);
      setSwipePosition(eventData.deltaX); // Запоминаем текущее положение свайпа
    },
    onSwipedLeft: () => {
      setIsSwiping(false);
      handleSlideChange((currentSlide + 1) % slides.length);
    },
    onSwipedRight: () => {
      setIsSwiping(false);
      handleSlideChange((currentSlide - 1 + slides.length) % slides.length);
    },
    preventScrollOnSwipe: true,
    trackMouse: true
  });

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
          <Image src={backIcon} alt="Назад" width={40} height={40} />
        </button>
      )}

      {/* Точки для навигации */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '-25px', 
          position: 'relative'
        }}
      >
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentSlide === index ? '#21D589' : '#7D7D7D',
              margin: '0 5px',
              cursor: 'pointer',
              marginTop: '50px'
            }}
          />
        ))}
      </div>

      {/* Основной контейнер для слайдов с анимацией */}
      <div 
        {...handlers}
        style={{
          width: '400px', // Фиксированная ширина
          height: '250px', // Фиксированная высота
          margin: '0 auto',
          marginTop: '110px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px',
          position: 'relative',
          overflow: 'hidden', // Прячем контент за пределами контейнера
        }}
      >
        <div 
          style={{ 
            display: 'flex',
            gap: '25px', // Добавляем расстояние между слайдами
            width: `${slides.length * 425}px`, // Рассчитываем ширину с учётом gap
            transform: `translateX(calc(-${currentSlide * 425}px + ${isSwiping ? swipePosition + 'px' : '0px'}))`, // Динамический сдвиг с учётом свайпа
            transition: isSwiping ? 'none' : 'transform 0.5s ease', // Убираем плавность во время свайпа
          }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index} 
              style={{ 
                width: '400px',  // Фиксированная ширина слайда
                height: '250px', // Фиксированная высота слайда
                backgroundColor: '#131214',
                borderRadius: '16px',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                color: '#FFFFFF',
                fontSize: '20px',
              }}
            >
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      {/* Остальная часть компонента */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '25px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '5px', color: '#FFFFFF', fontSize: '16px' }}>Collection</div>
          <div style={{ 
            width: '95px', 
            height: '80px', 
            backgroundColor: '#131214',
            borderRadius: '16px',
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            color: '#7D7D7D', 
            fontSize: '12px',
            position: 'relative',
          }}>
            <Image src={collectionIcon} alt="Collection" width={31} height={30} />
            <span style={{ marginTop: '5px' }}>Waves</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '5px', color: '#FFFFFF' }}>Boost</div>
          <div style={{ 
            width: '95px', 
            height: '80px', 
            backgroundColor: '#131214',
            borderRadius: '16px',
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            color: '#7D7D7D',
            fontSize: '12px',
            position: 'relative',
          }}>
            <Image src={boostIcon} alt="Boost" width={31} height={30} />
            <span style={{ marginTop: '5px' }}>+ ₿ 200 in h</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '5px', color: '#FFFFFF' }}>Card in collection</div>
          <div style={{ 
            width: '190px', 
            height: '80px', 
            backgroundColor: '#131214',
            borderRadius: '16px',
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            color: '#7D7D7D',
            fontSize: '12px',
            position: 'relative',
          }}>
            <Image src={cardInCollectionIcon} alt="Card in collection" width={31} height={30} />
            <span style={{ marginTop: '5px' }}>13 of 30</span>
          </div>
        </div>
      </div>

      <div style={{ 
        width: '180px', 
        height: '60px', 
        backgroundColor: '#131214',
        borderRadius: '16px',
        margin: '25px auto 0'
      }} />
    </ResponsiveBackground>
  );
};

export default Cardholder;
