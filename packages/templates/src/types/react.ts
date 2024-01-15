import { Dispatch, SetStateAction } from 'react';

export type CreateState = { [key: string]: any };

export type SetState<T> = Dispatch<SetStateAction<T>>;

export interface Action {
  type: string;
  payload: {
    key: string;
    value: any;
  };
}

export enum ReactHooks {
  useState = 'useState',
  useEffect = 'useEffect',
  useContext = 'useContext',
  useReducer = 'useReducer',
  useCallback = 'useCallback',
  useMemo = 'useMemo',
  useRef = 'useRef',
  useImperativeHandle = 'useImperativeHandle',
  useLayoutEffect = 'useLayoutEffect',
  useDebugValue = 'useDebugValue',
  useTransition = 'useTransition',
  useDeferredValue = 'useDeferredValue',

  // Custom hooks, to ensure the best practices
  useTimeOut = 'useTimeOut',
  useInterval = 'useInterval',
}
