import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import backIcon from '../image/back.svg';
import ResponsiveBackground from '../ResponsiveBackground';

interface StorageProps {
  onBack: () => void;
  isVisible: boolean;
}

const Storage: React.FC<StorageProps> = ({ onBack, isVisible }) => {
  const [scrollIndex, setScrollIndex] = useState(0); // Хранение индекса текущего элемента
  const cardScrollRef = useRef<HTMLDivElement | null>(null);

  const totalItems = 5; // Общее количество элементов, подставьте реальное значение

  const handleScroll = () => {
    if (cardScrollRef.current) {
      const scrollPosition = cardScrollRef.current.scrollLeft;
      const itemWidth = cardScrollRef.current.children[0].clientWidth + 25; // 25px — это отступ между карточками
      const index = Math.round(scrollPosition / itemWidth);
      setScrollIndex(Math.max(0, Math.min(totalItems - 1, index))); // Обеспечиваем, что индекс не выходит за пределы
    }
  };

  useEffect(() => {
    const currentRef = cardScrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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
            zIndex: 100, 
          }}
        >
          <Image src={backIcon} alt="Назад" width={40} height={40} />
        </button>
      )}

      <div className="store-container">
        <div className="top-row">
          <div className="price-block">
            <span>Price</span>
            <span className="price-value">฿10.00</span>
          </div>

          <div className="collection-block">
            <span>Collection</span>
            <span className="collection-value">Wave</span>
          </div>

          <div className="sort-block">
            <span>Sort</span>
            <span className="sort-value">Low price</span>
          </div>
        </div>

        {/* Горизонтальный скролл для карт */}
        <div className="card-scroll-container" ref={cardScrollRef}>
          {/* Карточки */}
          {[...Array(totalItems)].map((_, index) => (
            <div className="card-item" key={index}>
              <div className="content-placeholder"></div>
              <div className="text-above-buttons">
                <span className="Collection-txt">Collection</span>
                <span className="Boost-txt">Boost</span>
                <span className="Buy-txt">Buy</span>
              </div>
              <div className="bottom-panel">
                <div className="collection-button">
                  <div className="icon">
                    <span>Waves</span>
                  </div>
                </div>
                <div className="boost-button">
                  <div className="icon">
                    <span>+฿200 inh</span>
                  </div>
                </div>
                <div className="buy-button">
                  <div className="icon">
                    <span>฿1,111,111.00</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Пагинация по точкам */}
        <div className="pagination">
          {[...Array(totalItems)].map((_, index) => (
            <div
              key={index}
              className={`dot ${scrollIndex === index ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .store-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          color: white;
        }

        .top-row {
          display: flex;
          width: 100%;
          position: sticky;
          top: 0;
          padding: 55px 0 0;
          z-index: 10;
          gap: 20px;
        }

        .price-block, .collection-block, .sort-block {
          background: #1c1c1e;
          border-radius: 8px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          width: 120px;
          height: 50px;
          font-size: 10px;
        }

        .price-value, .collection-value, .sort-value {
          font-weight: bold;
          font-size: 12px;
        }

        .card-scroll-container {
          display: flex;
          overflow-x: auto;
          width: 100%;
          margin-top: 30px;
          scroll-behavior: smooth;
        }

        .card-item {
          min-width: 400px;
          margin-right: 25px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .content-placeholder {
          width: 400px;
          height: 250px;
          background: #2c2c2e;
          border-radius: 16px;
          margin-bottom: 20px;
        }

        .text-above-buttons {
          display: flex;
          width: 100%;
          margin-bottom: 10px;
          font-size: 16px;
          gap: 10px;
        }

        .bottom-panel {
          display: flex;
          width: 100%;
          gap: 10px;
        }

        .Collection-txt, .Boost-txt {
          font-size: 16px;
          width: 95px;
          text-align: center;
        }

        .Buy-txt {
          font-size: 16px;
          width: 190px;
          text-align: center;
        }

        .collection-button, .boost-button, .buy-button {
          background: #1c1c1e;
          border-radius: 12px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 95px;
          height: 80px;
        }

        .buy-button {
          width: 190px;
        }

        .icon {
          font-size: 12px;
          color: #ffcc00;
        }

        .buy-button .icon {
          color: #ffd700;
        }

        .pagination {
          display: flex;
          justify-content: center;
          position: relative; /* Убедитесь, что точки располагаются относительно родителя */
          top: -402px; /* Сдвиньте точки выше скролла, регулируйте по необходимости */
        }

        .dot {
          width: 10px;
          height: 10px;
          background-color: #888;
          border-radius: 50%;
          margin: 0 5px;
        }

        .dot.active {
          background-color: #fff;
        }
      `}</style>
    </ResponsiveBackground>
  );
};

export default Storage;
