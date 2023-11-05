import { useEffect, useRef } from "react";

export const useInterval = (
  watchKeys: string[],
  executeFn: () => void,
  states: any,
  delay: any,
) => {
  useEffect(
    () => {
      if (delay !== null) {
        const id = setInterval(executeFn, delay);
        return () => clearInterval(id);
      }
    },
    watchKeys.map((key) => states[key]),
  );
};

export const useTimeout = (
    watchKeys: string[],
    executeFn: () => void,
    states: any,
    delay: any,
) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(executeFn, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, watchKeys.map((key) => states[key]));
};