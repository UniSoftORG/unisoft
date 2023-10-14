import {Dispatch, SetStateAction} from "react";

export type CreateState<T> = {
    key: string;
    defaultValue?: T;
};

export type SetState<T> = Dispatch<SetStateAction<T>>;
