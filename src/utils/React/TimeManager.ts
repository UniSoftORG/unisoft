import { useEffect, useRef } from "react";

export const useTimeout = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(callback, delay);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, delay]);
};

export const useInterval = (callback: () => void, delay: number) => {
  const callbackRef = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Setup the interval.
  useEffect(() => {
    const tick = () => {
      callbackRef.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
