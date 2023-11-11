import { useEffect } from 'react';

export const useEventListener = (
  eventName: string,
  handler: (event: Event) => void,
  element: Element | Window = window
) => {
  useEffect(() => {
    element.addEventListener(eventName, handler);
    return () => {
      element.removeEventListener(eventName, handler);
    };
  }, [eventName, handler, element]);
};
