import { useEffect } from 'react';

const useInterval = (runned = false, callback = () => {}) => {
  useEffect(() => {
    if (!runned) return;
    const intervalId = setInterval(() => {
      console.log('Interval works', new Date().toISOString());
      callback();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [runned, callback]);
};

export default useInterval;
