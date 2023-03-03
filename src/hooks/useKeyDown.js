import { useEffect } from 'react';

/**
 * 
 * @param {boolean} runned If false - listener not worked
 * @param {() => void} callback 
 * @param {'Escape' | 'Enter' | 'keyW'} keyCode 
 * @returns 
 */
export const useKeyDown = (runned = false, callback = () => {}, keyCode) => {
  useEffect(() => {
    if (!runned) return;
    /** @param {KeyboardEvent} e */
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

/**
 * 
 * @param {boolean} runned 
 * @param {keyof DocumentEventMap} eventName 
 * @param {(event: any) => void} callback 
 * @returns 
 */
export const useListenerHook = (runned = false, eventName, callback = () => {}) => {
  useEffect(() => {
    if (!runned) return;
    const keyListener = e => {
        callback(e);
    };
    document.addEventListener(eventName, keyListener);
    return () => {
      document.removeEventListener(eventName, keyListener);
    };
  }, [runned, callback, eventName]);
  return null;
}