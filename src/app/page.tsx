"use client";

import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css'; // Import the CSS for styling

import Farming from './Farming/Farming';
import Footer from './Footer/Footer';
import ButtonCard from './ButtonCard/ButtonCard';
import CardBlock from './CardBlock/Cardblock';
import Header from './Header/header';
import TaskList from './Task/TaskList';
import InviteList from './Invite/inviteList';
import TopLidersList from './TopLiders/TopLidersList';
import Send from './Send/send';
import Buy from './Buy/buy';
import Storage from './Store/store';
import FAQ from './FAQ/faq';
import History from './History/history';
import Account from './Account/account';
import Cardholder from './Cardholder/cardholder';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>('home'); // Установим начальное значение
  const [previousSections, setPreviousSections] = useState<string[]>([]);
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const baseWidth = 450;
      const newScaleFactor = screenWidth < baseWidth ? screenWidth / baseWidth : 1;
      setScaleFactor(newScaleFactor);
    };

    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventZoom, { passive: false });
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      document.removeEventListener('touchmove', preventZoom);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSection = (section: string | null) => {
    console.log("Переключение на раздел:", section); // Отладка
    if (section !== null && activeSection !== null) {
      setPreviousSections((prev) => [...prev, activeSection]);
    }
    setActiveSection(section);
  };

  const handleBack = () => {
    if (previousSections.length > 0) {
      const lastSection = previousSections[previousSections.length - 1];
      setPreviousSections((prev) => prev.slice(0, -1));
      setActiveSection(lastSection);
    } else {
      console.log("Возврат на Farming"); // Отладка
      setActiveSection(null); // Возврат на главную страницу
    }
  };

  console.log("Текущий активный раздел:", activeSection);

  const renderActiveSection = () => {
    const sections: { [key: string]: JSX.Element } = {
      faq: <FAQ />,
      history: <History onBack={handleBack} isVisible={previousSections.length > 0} />,
      account: <Account />,
      tasks: <TaskList />,
      invite: <InviteList />,
      top: <TopLidersList />,
      send: <Send onBack={handleBack} isVisible={previousSections.length > 0} />,
      store: <Storage onBack={handleBack} isVisible={previousSections.length > 0} />,
      buy: <Buy onBack={handleBack} isVisible={previousSections.length > 0} />,
      cardholder: <Cardholder onBack={handleBack} isVisible={previousSections.length > 0} />,
    };

    return activeSection && sections[activeSection] ? (
      sections[activeSection]
    ) : (
      <div className="centered-card">
        <Header toggleSection={toggleSection} />
        <ButtonCard toggleSection={toggleSection} />
        <CardBlock />
      </div>
    );
  };

  const isFarmingVisible = activeSection === null || activeSection === 'home'; // Показываем Farming при home или null

  return (
    <div className="app" style={{ overflow: 'hidden' }}>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body, #root {
          height: 100%;
          background-color: black;
          overflow: hidden;
          outline: none;
        }

        .app {
          background-color: black;
        }

        .farming-container {
          background-color: black;
          margin-top: ${25 * scaleFactor}px;
        }
      `}</style>

      <PerfectScrollbar
        className="scrollable-content"
        options={{
          suppressScrollX: true, // Disable horizontal scrolling
          wheelPropagation: false
        }}
        style={{ height: `calc(100vh - ${isFarmingVisible ? 220 * scaleFactor : 110 * scaleFactor}px)` }}
      >
        {renderActiveSection()}
      </PerfectScrollbar>

      <Footer toggleSection={toggleSection} />
      {isFarmingVisible && (
        <div className="farming-container">
          <Farming />
        </div>
      )}
    </div>
  );
}
