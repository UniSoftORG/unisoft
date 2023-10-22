"use client"
import {Action, CreateState, SetState} from "@/types/react";
import {useEffect, useReducer, useState} from "react";
import {Helpers} from "unisoft-utils";

export const createState = ({key, defaultValue}: CreateState): {
    [key: string]: any
} => {
    const initialState = defaultValue !== undefined ? defaultValue : (null as unknown as typeof defaultValue);
    const [state, setState] = useState<typeof defaultValue>(initialState);
    return {
        [key]: state,
        [`${key}SetState`]: setState
    };
};

function stateReducer(state: CreateState, action: Action) {
    switch (action.type) {
        case 'SET_STATE':
            return {...state, [action.payload.key]: action.payload.value};
        default:
            return state;
    }
}

export function useDynamicStates(initialStates: CreateState): [CreateState, (key: string, value: any) => void] {
    const [state, dispatch] = useReducer(stateReducer, initialStates);

    const setStateByKey = (key: string, value: any) => {
        dispatch({ type: 'SET_STATE', payload: { key, value } });
    };

    return [state, setStateByKey];
}

export function setState<T>(setValue: SetState<T>, newState: T, triggerUpdate?: any) {

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // setValue(newState);
            triggerUpdate && triggerUpdate()
        }, 2000)

        return () => clearTimeout(timeoutId);
    }, [])
}

export const getAllStates = (statesMap: any) => {
    return Object.assign({}, ...statesMap);
};

export const createAllStates = (states: {
    [key: string]: string
}) => {
    return Helpers.transformEntries(states, (key, defaultValue) => createState({key, defaultValue}))
}

export const generateStates = (states: CreateState) => {
    return getAllStates(Helpers.transformEntries(states, (key, defaultValue) => createState({key, defaultValue})))
}

export const useNavigation = (currentState: number, maxState: number) => {
    const next = () => {
        if (currentState < maxState - 1) {
            return currentState + 1;
        }
        return currentState;
    };

    const prev = () => {
        if (currentState > 0) {
            return currentState - 1;
        }
        return currentState;
    };

    return {next, prev};
};

export const appendToObjectState = <T extends object>(state: T, newData: Partial<T>) => {
    return {...state, ...newData};
};

export const appendToArrayState = <T>(state: T[], newValue: T) => {
    return [...state, newValue];
};