"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operators = exports.ValueReplacement = void 0;
var ValueReplacement;
(function (ValueReplacement) {
    ValueReplacement[ValueReplacement["All"] = 0] = "All";
    ValueReplacement[ValueReplacement["After"] = 1] = "After";
    ValueReplacement[ValueReplacement["Before"] = 2] = "Before";
})(ValueReplacement || (exports.ValueReplacement = ValueReplacement = {}));
var Operators;
(function (Operators) {
    Operators["NullishCoalescing"] = "??";
    Operators["LogicalOr"] = "||";
    Operators["LogicalAnd"] = "&&";
    Operators["NotStrictEqual"] = "!==";
    Operators["StrictEqual"] = "===";
    Operators["Equal"] = "==";
    Operators["GreaterThan"] = ">";
    Operators["LessThan"] = "<";
    Operators["GreaterThanOrEqual"] = ">=";
    Operators["LessThanOrEqual"] = "<=";
})(Operators || (exports.Operators = Operators = {}));
