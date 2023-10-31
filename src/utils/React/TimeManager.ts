import { useEffect, useRef } from "react";


export const useInterval = (
    watchKeys: string[],
    executeFn: () => void,
    states: any,
    delay: any
) => {
  useEffect(
      () => {
        const tick = () => {
          executeFn();
        };

        if (delay !== null) {
          const id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
      },
      watchKeys.map((key) => states[key]),
  );
};

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

export const useIntervals = (callback: () => void, delay: number) => {
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
