import { useEffect } from "react";

export const useCustomEffect = (
  watchKeys: string[],
  callbacks: () => void,
  states: any
) => {
  useEffect(
    () => {
      callbacks();
    },
    watchKeys.map((key) => states[key])
  );
};
