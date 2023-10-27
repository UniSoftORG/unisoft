import { Attributes } from './DynamicFunctionLibrary';

export const cyclicIncrement: (params: Attributes) => any = ({ number, max = Infinity, min = -Infinity, reset = false, callbacks = [] }) => {
    const nextNumber = number + 1;
    const value = reset ? (nextNumber > max ? min : nextNumber) : nextNumber;
    return { value, min, max };
};

export const after = (subject: string, search: string): string => {
    const pos = subject.indexOf(search);
    return pos === -1 ? "" : subject.slice(pos + search.length);
};

export const cyclicDecrement: (params: Attributes) => any = ({ number, max = Infinity, min = -Infinity, reset = false, callbacks = [] }) => {
    const prevNumber = number - 1;
    const value = reset ? (prevNumber < min ? max : prevNumber) : prevNumber;
    return { value, min, max };
};
