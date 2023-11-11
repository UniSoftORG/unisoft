/**
 * Creates a condition based on the given parameters and returns the result.
 *
 * @param {any} firstParam - The first parameter.
 * @param operator
 * @param {any} secondParam - The second parameter.
 * @returns {boolean} The result of the condition.
 */
export const createCondition = (
  firstParam: any,
  operator: string,
  secondParam: any
): boolean => {
  const conditions: { [key in string]: () => boolean } = {
    '===': () => firstParam === secondParam,
    '!==': () => firstParam !== secondParam,
    '<': () => firstParam < secondParam,
    '<=': () => firstParam <= secondParam,
    '>': () => firstParam > secondParam,
    '>=': () => firstParam >= secondParam,
  };
  return (
    conditions[operator]?.() ??
    (console.warn(`Unknown condition: ${operator}`), false)
  );
};
