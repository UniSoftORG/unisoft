import { useCallback } from "react";

export const useCustomCallback = (
  fn: () => void,
  watchKeys: string[],
  states: any,
) => {
  return useCallback(
    fn,
    watchKeys.map((key) => states[key].value),
  );
};
