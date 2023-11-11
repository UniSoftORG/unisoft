import { useEffect, useRef } from 'react';

export const useInterval = (
  watchKeys: string[],
  callbacks: () => void,
  states: any,
  delay: any
) => {
  useEffect(
    () => {
      if (delay !== null) {
        const id = setInterval(callbacks, delay);
        return () => clearInterval(id);
      }
    },
    watchKeys.map((key) => states[key])
  );
};

export const useTimeout = (
  watchKeys: string[],
  callbacks: () => void,
  states: any,
  delay: any
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    () => {
      timeoutRef.current = setTimeout(callbacks, delay);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    },
    watchKeys.map((key) => states[key])
  );
};
