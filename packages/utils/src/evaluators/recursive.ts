/**
 * Finds the most frequent value in an array.
 *
 * @param {Array<string | number>} data - The array to search for the most frequent value.
 * @return {string | number} The most frequent value in the array.
 */
export const findMostFrequent = (
  data: (string | number)[]
): string | number | undefined => {
  if (data.length === 0) return undefined;

  const frequencyMap = new Map<string | number, number>();
  let mostFrequentItem: string | number | undefined = undefined;
  let maxFrequency = 0;

  for (const item of data) {
    const frequency = (frequencyMap.get(item) || 0) + 1;
    frequencyMap.set(item, frequency);

    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      mostFrequentItem = item;
    }
  }

  return mostFrequentItem;
};
