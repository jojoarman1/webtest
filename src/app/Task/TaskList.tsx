import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Task from './task';
import Skeleton from 'react-loading-skeleton';
import '../skeleton.css';
import ResponsiveBackground from '../ResponsiveBackground'; // Импорт адаптивного фона

interface TaskData {
  title: string;
  reward: string;
  completed: boolean;
}

const fetchTasks = async (): Promise<TaskData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { title: 'Subscribe to the SCAM$en channel', reward: '₿ 1,122,123.00', completed: false },
        { title: 'Complete task 1', reward: '₿ 500,000.00', completed: true },
        { title: 'Complete task 2', reward: '₿ 250,000.00', completed: false },
        { title: 'Read the whitepaper', reward: '₿ 100,000.00', completed: false },
        { title: 'Join the community', reward: '₿ 75,000.00', completed: true },
        { title: 'Complete task 1', reward: '₿ 500,000.00', completed: true },
        { title: 'Complete task 2', reward: '₿ 250,000.00', completed: false },
        { title: 'Read the whitepaper', reward: '₿ 100,000.00', completed: false },
        { title: 'Join the community', reward: '₿ 75,000.00', completed: true },
        { title: 'Complete task 1', reward: '₿ 500,000.00', completed: true },
        { title: 'Complete task 2', reward: '₿ 250,000.00', completed: false },
        { title: 'Read the whitepaper', reward: '₿ 100,000.00', completed: false },
        { title: 'Join the community', reward: '₿ 75,000.00', completed: true },
      ]);
    }, 1000);
  });
};

const TaskList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [tasksVisible, setTasksVisible] = useState(false); // Новое состояние для управления видимостью задач

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
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error('Ошибка загрузки задач:', error);
      } finally {
        setLoading(false);
        setTasksVisible(true); // После загрузки задач, разрешаем их видимость
      }
    };
    loadTasks();
  }, []);

  return (
    <ResponsiveBackground> {/* Используем адаптивный фон */}
      <div style={{
        flex: 1,
        marginBottom: '0px',
        borderRadius: `${8 * scaleFactor}px`,
        top: `${15 * scaleFactor}px`,
      }}>
        {loading
          ? Array.from({ length: 1 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }} // Начальное состояние для Skeleton
                animate={{ opacity: 1, y: 0 }} // Конечное состояние для Skeleton
                transition={{ delay: index * 0.1 }} // Задержка для плавного появления
                style={{
                  marginBottom: `${25 * scaleFactor}px`,
                  borderRadius: `${8 * scaleFactor}px`,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <Skeleton className="custom-skeleton" height={`${85 * scaleFactor}px`} />
                <div style={{
                  position: 'absolute',
                  top: `${15 * scaleFactor}px`,
                  left: `${25 * scaleFactor}px`,
                  bottom: `${15 * scaleFactor}px`,
                  right: `${50 * scaleFactor}px` // Отступ справа для баланса
                }}>
                  <Skeleton className="custom-skeleton-small" height={22 * scaleFactor} width={`${210 * scaleFactor}px`} borderRadius={`${8 * scaleFactor}px`} />
                  <Skeleton className="custom-skeleton-small" height={22 * scaleFactor} width={`${140 * scaleFactor}px`} style={{ marginTop: `${10 * scaleFactor}px` }} borderRadius={`${8 * scaleFactor}px`} />
                </div>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  right: `${25 * scaleFactor}px`,
                  width: `${30 * scaleFactor}px`,
                  height: `${30 * scaleFactor}px`,
                  borderRadius: `50%`,
                  backgroundColor: '#1F1D21',
                  transform: 'translateY(-50%)'
                }} />
              </motion.div>
            ))
          : tasksVisible && tasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }} // Начальное состояние для задач
                animate={{ opacity: 1, y: 0 }} // Конечное состояние для задач
                transition={{ delay: index * 0.1 }} // Задержка для плавного появления
              >
                <Task
                  title={task.title}
                  reward={task.reward}
                  completed={task.completed}
                />
              </motion.div>
            ))}
      </div>
    </ResponsiveBackground>
  );
};

export default TaskList;
