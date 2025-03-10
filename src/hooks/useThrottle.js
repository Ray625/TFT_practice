import { useRef, useCallback } from "react";

const useThrottle = (fn, delay = 500) => {
  let lastCall = useRef(0);

  return useCallback((...args) => {
    const now = new Date().getTime();
    if (now - lastCall.current < delay) return;

    lastCall.current = now;
    fn(...args);
  }, [fn, delay])
};

export default useThrottle
