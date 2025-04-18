import { useRef, useCallback } from "react";

type fncType = (...args: any[]) => any

const useThrottle = <T extends fncType>(fn: T, delay = 500) => {
  let lastCall = useRef(0);

  return useCallback((...args: Parameters<T>): void => {
    const now = new Date().getTime();
    if (now - lastCall.current < delay) return;

    lastCall.current = now;
    fn(...args);
  }, [fn, delay])
};

export default useThrottle
