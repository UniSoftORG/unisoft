"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObjectFromMapOptions = void 0;
/**
 * Generates an object from an array of map options.
 *
 * @param {MapOption[]} mapOptions - The array of map options.
 * @return {Record<string, any>} The object uni-imports from the map options.
 */
var createObjectFromMapOptions = function (mapOptions) {
    return mapOptions.reduce(function (acc, option) {
        if (typeof option === "string") {
            acc[option] = option;
        }
        else {
            var key = option.key, value = option.value, _a = option.beforeValue, beforeValue = _a === void 0 ? "" : _a, _b = option.afterValue, afterValue = _b === void 0 ? "" : _b;
            acc[key] = "".concat(beforeValue).concat(value).concat(afterValue);
        }
        return acc;
    }, {});
};
exports.createObjectFromMapOptions = createObjectFromMapOptions;
