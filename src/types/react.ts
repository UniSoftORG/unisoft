import {Dispatch, SetStateAction} from "react";

export type CreateState = { [key: string]: any }

export type SetState<T> = Dispatch<SetStateAction<T>>;

export interface Action {
    type: string;
    payload: {
        key: string;
        value: any;
    };
}
