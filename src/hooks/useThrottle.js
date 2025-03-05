import { useRef } from "react";

const useThrottle = (fn, delay = 500) => {
  let lastCall = useRef(0);

  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall.current < delay) return;

    lastCall.current = now;
    fn(...args);
  };
};

export default useThrottle
