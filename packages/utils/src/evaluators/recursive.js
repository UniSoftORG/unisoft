"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMostFrequent = void 0;
/**
 * Finds the most frequent value in an array.
 *
 * @param {Array<string | number>} data - The array to search for the most frequent value.
 * @return {string | number} The most frequent value in the array.
 */
var findMostFrequent = function (data) {
    if (data.length === 0)
        return undefined;
    var frequencyMap = new Map();
    var mostFrequentItem = undefined;
    var maxFrequency = 0;
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var item = data_1[_i];
        var frequency = (frequencyMap.get(item) || 0) + 1;
        frequencyMap.set(item, frequency);
        if (frequency > maxFrequency) {
            maxFrequency = frequency;
            mostFrequentItem = item;
        }
    }
    return mostFrequentItem;
};
exports.findMostFrequent = findMostFrequent;
