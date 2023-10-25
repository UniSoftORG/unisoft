import { useEffect } from "react";

export const useCustomEffect = (
  watchKeys: string[],
  executeFn: () => void,
  states: any,
) => {
  useEffect(
    () => {
      executeFn();
    },
    watchKeys.map((key) => states[key].value),
  );
};
