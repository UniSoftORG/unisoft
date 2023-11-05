import { ReactHooks } from "@/types";
import { useDynamicStates } from "@/utils/React/HookManagers/StateManager";
import { useReactEffect } from "@/utils/React/HookManagers/UseEffectManager";
import { useCallback } from "@/utils/React/HookManagers/CallBackManager";
import { useInterval, useTimeout } from "@/utils/React/HookManagers/TimeManager";

const reactHooksMap: any = {
  [ReactHooks.useState]: useDynamicStates,
  [ReactHooks.useEffect]: useReactEffect,
  [ReactHooks.useCallback]: useCallback,
  [ReactHooks.useTimeOut]: useTimeout,
  [ReactHooks.useInterval]: useInterval,
};

export default reactHooksMap;
