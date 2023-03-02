import { useEffect } from 'react';

export const useKeyDown = (runned = false, callback = () => {}, keyCode) => {
  useEffect(() => {
    if (!runned) return;
    const keyListener = e => {
      if (e.code === keyCode) {
        callback(e);
      }
    };
    document.addEventListener('keydown', keyListener);
    return () => {
      document.removeEventListener('keydown', keyListener);
    };
  }, [runned, callback, keyCode]);
  return null;
};
