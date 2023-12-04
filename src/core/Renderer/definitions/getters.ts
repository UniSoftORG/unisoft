export const getValueByDotNation = (key: string) => key;
export const getSession = (key?: string) => "${session" + `.${key}` + "}";
export const getAttribute = (key: string) => "${passAttributes." + key + "}";
export const getVariable = (key: string) => "${variables." + key + "}";
export const getState = (key: string) => "${states." + key + "}";
