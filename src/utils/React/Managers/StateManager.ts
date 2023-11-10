'use client'
import { Action, CreateState } from '@/types/react'
import { useReducer } from 'react'

export const statesMap: { [key: string]: any } = {}
export const statesActionsMap: { [key: string]: any } = {}

function stateReducer(state: CreateState, action: Action) {
  switch (action.type) {
    case 'SET_STATE':
      statesMap[action.payload.key] = action.payload.value
        return { ...statesMap, [action.payload.key]: action.payload.value}
    default:
      return state
  }
}

export function useDynamicStates(
  initialStates: CreateState
): [CreateState, (key: string, value: any) => void] {
  const [state, dispatch] = useReducer(stateReducer, initialStates)

  Object.keys(state).map((stateKey) => {
    if(!statesMap[stateKey]){
      statesActionsMap[stateKey] = {
        setState: (key: string, value: any) =>
            dispatch({ type: 'SET_STATE', payload: { key, value } })
      }
      statesMap[stateKey] = state
    }
  })
  // statesMap['test'] = {state}
  const setStateByKey = (key: string, value: any) => {
    dispatch({ type: 'SET_STATE', payload: { key, value } })
  }

  return [state, setStateByKey]
}

export const getAllStates = (statesMap: any) => {
  return Object.assign({}, ...statesMap)
}

export const appendToObjectState = <T extends object>(
  state: T,
  newData: Partial<T>
) => {
  return { ...state, ...newData }
}

export const appendToArrayState = <T>(state: T[], newValue: T) => {
  return [...state, newValue]
}
