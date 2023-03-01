import React, { useEffect, useState } from 'react';

const Timer = ({ runned = false, stopTimer = () => {} }) => {
  const [timerValue, setTimerValue] = useState(0);

  useEffect(() => {
    console.log('useEffect runned');
    if (!runned) return;
    const keyListener = e => {
      console.log('key pressed', e.code);
      if (e.code === 'Escape') {
        stopTimer();
      }
    };
    document.addEventListener('keydown', keyListener);
    const intervalId = setInterval(() => {
      console.log('Interval works', new Date().toISOString());
      setTimerValue(prev => prev + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('keydown', keyListener);
    };
  }, [runned, stopTimer]);

  return <p>Timer: {timerValue} seconds</p>;
};

export default Timer;
