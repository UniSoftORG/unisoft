import { useCustomCallback } from "@/core/React/Managers/CallBackManager";
import useDynamicStates from "@/core/React/Managers/StateManager";
import { useInterval, useTimeout } from "@/core/React/Managers/TimeManager";
import { useCustomEffect } from "@/core/React/Managers/UseEffectManager";
import { ReactHooks } from "@/types";

const reactHooksMap: any = {
  [ReactHooks.useState]: useDynamicStates,
  [ReactHooks.useEffect]: useCustomEffect,
  [ReactHooks.useCallback]: useCustomCallback,
  [ReactHooks.useTimeOut]: useTimeout,
  [ReactHooks.useInterval]: useInterval,
};

export default reactHooksMap;
