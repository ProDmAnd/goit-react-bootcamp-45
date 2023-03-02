import useInterval from 'hooks/useInterval';
import { useKeyDown } from 'hooks/useKeyDown';
import React, { useState } from 'react';
import Button from './Button';

const Timer = () => {
  const [timerRunned, setTimerRunned] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  useKeyDown(true, () => setTimerRunned(false), 'Escape');

  useInterval(timerRunned, () => setTimerValue(prev => prev + 1));

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p>Timer: {timerValue} seconds</p>
      <Button onClick={() => setTimerRunned(prev => !prev)}>
        Run/Stop timer
      </Button>
    </div>
  );
};

export default Timer;
