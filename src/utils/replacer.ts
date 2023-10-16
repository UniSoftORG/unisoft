import {getValue} from "../../packages/utils/src/getters";

export const setValue = (obj: any, path: string, value: any) => {
    const parts = path.split(".");
    parts.reduce((acc, part, index) => {
        if (index === parts.length - 1) {
            acc[part] = value;
        }
        return acc[part];
    }, obj);
};

const resolvePlaceholders = (str: string, obj: any): string => {
    const regex = /\$\{(.*?)\}/g;
    let match;
    let lastIndex = 0;
    let result = '';

    while ((match = regex.exec(str)) !== null) {
        const placeholder = match[1];
        const replacementValue = placeholder.includes('${')
            ? resolvePlaceholders(placeholder, obj)
            : getValue(obj, placeholder);

        result += str.slice(lastIndex, match.index) + replacementValue;
        lastIndex = regex.lastIndex;
    }

    result += str.slice(lastIndex);
    return result;
};

const extractAndReplace = (str: string, obj: any): string => {
    let replacedStr = str;
    let regexMatch;

    const regex = /\$\{([^${}]+)\}/g;

    while ((regexMatch = regex.exec(replacedStr))) {
        const fullMatch = regexMatch[0];
        const path = regexMatch[1];

        const value = getValue(obj, path);

        if (typeof value === 'string' && value.includes('${')) {
            replacedStr = replacedStr.replace(fullMatch, extractAndReplace(value, obj));
        } else {
            replacedStr = replacedStr.replace(fullMatch, value);
        }

        regex.lastIndex = 0;
    }

    return replacedStr;
};

export const dynamicReplacer = (obj: any, targets: any[]) => {
    for (let path of targets) {
        const targetStr = getValue(obj, path);
        const replaced = extractAndReplace(targetStr, obj);
        setValue(obj, path, replaced);
    }

    return obj;
};

