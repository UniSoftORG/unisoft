import { Action, CreateState } from "@/types";
import { useReducer } from "react";

export const pageStates: any = {};

function stateReducer(state: CreateState, action: Action) {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
}

export default function useDynamicStates(
  initialStates: CreateState
): [CreateState, (key: string, value: any) => void] {
  const [state, dispatch] = useReducer(stateReducer, initialStates);
  const setStateByKey = (key: string, value: any) => {
    dispatch({ type: "SET_STATE", payload: { key, value } });
  };

  return [state, setStateByKey];
}

export const getAllStates = (statesMap: any) => {
  return Object.assign({}, ...statesMap);
};

export const appendToObjectState = <T extends object>(
  state: T,
  newData: Partial<T>
) => {
  return { ...state, ...newData };
};

export const appendToArrayState = <T>(state: T[], newValue: T) => {
  return [...state, newValue];
};
