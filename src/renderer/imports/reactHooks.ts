import { ReactHooks } from "@/types";
import { useCustomCallback } from "@/utils/React/Managers/CallBackManager";
import useDynamicStates from "@/utils/React/Managers/StateManager";
import { useInterval, useTimeout } from "@/utils/React/Managers/TimeManager";
import { useCustomEffect } from "@/utils/React/Managers/UseEffectManager";

const reactHooksMap: any = {
  [ReactHooks.useState]: useDynamicStates,
  [ReactHooks.useEffect]: useCustomEffect,
  [ReactHooks.useCallback]: useCustomCallback,
  [ReactHooks.useTimeOut]: useTimeout,
  [ReactHooks.useInterval]: useInterval,
};

export default reactHooksMap;
