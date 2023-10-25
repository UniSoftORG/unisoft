import { ReactHooks } from "@/types";
import { useDynamicStates } from "@/utils/React/StateManager";
import { useCustomEffect } from "@/utils/React/UseEffectManager";
import { useCustomCallback } from "@/utils/React/CallBackManager";
import { useInterval, useTimeout } from "@/utils/React/TimeManager";

const reactHooksMap: any = {
  [ReactHooks.useState]: useDynamicStates,
  [ReactHooks.useEffect]: useCustomEffect,
  [ReactHooks.useCallback]: useCustomCallback,
  [ReactHooks.useTimeOut]: useTimeout,
  [ReactHooks.useInterval]: useInterval,
};

export default reactHooksMap;
