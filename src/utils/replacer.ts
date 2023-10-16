import {Setters, Getters} from "unisoft-utils";

export const extractAndReplace = <T>(str: string, obj: T): string => {
    const regex = /\$\{([^${}]+)\}/g;

    return str.replace(regex, (fullMatch, path) => {
        const value = Getters.getValue(obj, path);
        if (typeof value === 'string' && value.includes('${')) {
            return extractAndReplace(value, obj);
        }
        return value;
    });
};


export const dynamicReplacer = <T>(obj: T, targets: string[]): T => {
    for (let path of targets) {
        const targetStr = Getters.getValue(obj, path);
        const replaced = extractAndReplace(targetStr as string, obj);
        Setters.setByDotNotation(obj, path, replaced);
    }

    return obj;
};