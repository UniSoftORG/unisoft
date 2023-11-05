import { useEffect } from "react";

export const useReactEffect = (
  watchKeys: string[],
  executeFn: () => void,
  states: any,
) => {
  useEffect(
    () => {
      executeFn();
    },
    watchKeys.map((key) => states[key]),
  );
};
