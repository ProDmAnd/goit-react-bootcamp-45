import { useEffect, useRef } from 'react';

const useIsMount = () => {
  const isMount = useRef(false);
  useEffect(() => {
    isMount.current = true;

    return () => {
      isMount.current = false;
    };
  }, []);

  return isMount.current;
};

export default useIsMount;
