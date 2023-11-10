export const getValueByDotNation = (key: string) => key
export const getAttribute = (key: string) => '${passAttributes.'+key+'}'
export const getVariable = (key: string) => '${variables.' + key + '}'
export const getState = (key: string): string | number | object | unknown => '${states.'+key+'}'
