import {CreateState, SetState} from "@/types/react";
import React, {useState} from "react";

export const createState = <T>({key, defaultValue}: CreateState<T>): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const initialState = defaultValue !== undefined ? defaultValue : (null as unknown as T);
    return useState<T>(initialState);
}

export function setState<T>(setValue: SetState<T>, newState: T){
    return setValue(newState);
}

export const getAllStateValues = (states: any) => {
    const result: { [key: string]: any } = {};
    for (let key in states) {
        result[key] = states[key].value;
    }
    return result;
};

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