import { ReactHooks } from "@/types";
import useDynamicStates from "@/utils/React/Managers/StateManager";
import { useEffect } from "@/utils/React/Managers/UseEffectManager";
import { useCustomCallback } from "@/utils/React/Managers/CallBackManager";
import { useInterval, useTimeout } from "@/utils/React/Managers/TimeManager";

const reactHooksMap: any = {
  [ReactHooks.useState]: useDynamicStates,
  [ReactHooks.useEffect]: useEffect,
  [ReactHooks.useCallback]: useCustomCallback,
  [ReactHooks.useTimeOut]: useTimeout,
  [ReactHooks.useInterval]: useInterval,
};

export default reactHooksMap;
