import { ReactHooks } from "@/types";
import useDynamicStates from "@/utils/React/Managers/StateManager";
import { useCustomEffect } from "@/utils/React/Managers/UseEffectManager";
import { useCustomCallback } from "@/utils/React/Managers/CallBackManager";
import { useInterval, useTimeout } from "@/utils/React/Managers/TimeManager";

const reactHooksMap: any = {
  [ReactHooks.useState]: useDynamicStates,
  [ReactHooks.useEffect]: useCustomEffect,
  [ReactHooks.useCallback]: useCustomCallback,
  [ReactHooks.useTimeOut]: useTimeout,
  [ReactHooks.useInterval]: useInterval,
};

export default reactHooksMap;
