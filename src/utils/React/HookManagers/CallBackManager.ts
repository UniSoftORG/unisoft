import { useCallback as reactCallBack } from "react";

export const useCallback = (
  fn: () => void,
  watchKeys: string[],
  states: any,
) => {
  return reactCallBack(
    fn,
    watchKeys.map((key) => states[key].value),
  );
};
