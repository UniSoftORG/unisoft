"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
function isNullish(value) {
    return value === null || value === undefined;
}
function splitByOperator(str, operator) {
    var depth = 0;
    var lastIndex = 0;
    var parts = [];
    for (var i = 0; i < str.length; i++) {
        var char = str[i];
        if (char === "(")
            depth++;
        else if (char === ")")
            depth--;
        if (depth === 0 && str.substr(i, operator.length) === operator) {
            parts.push(str.substring(lastIndex, i));
            i += operator.length - 1;
            lastIndex = i + 1;
        }
    }
    parts.push(str.substring(lastIndex));
    return parts.map(function (part) { return part.trim(); });
}
function findMatchingColon(str) {
    var depth = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] === "?")
            depth++;
        else if (str[i] === ":") {
            if (depth === 1)
                return i;
            depth--;
        }
    }
    return -1;
}
function parseExpression(str) {
    str = str.trim();
    if (str[0] === "(" && str[str.length - 1] === ")") {
        return parseExpression(str.slice(1, -1));
    }
    if (str.startsWith("!")) {
        return {
            unaryOperator: "!",
            expression: parseExpression(str.slice(1)),
        };
    }
    var questionIndex = str.indexOf("?");
    if (questionIndex !== -1) {
        var colonIndex = findMatchingColon(str);
        if (colonIndex !== -1) {
            return {
                condition: parseExpression(str.substring(0, questionIndex)),
                trueBranch: parseExpression(str.substring(questionIndex + 1, colonIndex)),
                falseBranch: parseExpression(str.substring(colonIndex + 1)),
            };
        }
    }
    var operators = [
        "??",
        "||",
        "&&",
        "!==",
        "===",
        "==",
        ">",
        "<",
        ">=",
        "<=",
    ];
    for (var _i = 0, operators_1 = operators; _i < operators_1.length; _i++) {
        var operator = operators_1[_i];
        var parts = splitByOperator(str, operator);
        if (parts && parts.length === 2) {
            return {
                left: parseExpression(parts[0]),
                operator: operator,
                right: parseExpression(parts[1]),
            };
        }
    }
    switch (str) {
        case "true":
            return true;
        case "false":
            return false;
        case "null":
            return null;
        case "undefined":
            return null;
        default:
            if (!isNaN(Number(str)))
                return Number(str);
            return str.replace(/^'(.*)'$/, "$1");
    }
}
function evaluateExpression(expr) {
    if (typeof expr === "string" ||
        typeof expr === "number" ||
        typeof expr === "boolean" ||
        expr === null) {
        return expr;
    }
    if (expr && "unaryOperator" in expr) {
        switch (expr.unaryOperator) {
            case "!":
                return !evaluateExpression(expr.expression);
            default:
                throw new Error("Unknown unary operator: " + expr.unaryOperator);
        }
    }
    if (expr && "condition" in expr) {
        return evaluateExpression(expr.condition)
            ? evaluateExpression(expr.trueBranch)
            : evaluateExpression(expr.falseBranch);
    }
    var leftValue = evaluateExpression(expr.left);
    var rightValue = evaluateExpression(expr.right);
    switch (expr.operator) {
        case "===":
        case "==":
            return leftValue === rightValue;
        case ">":
            return leftValue > rightValue;
        case "<":
            return leftValue < rightValue;
        case ">=":
            return leftValue >= rightValue;
        case "<=":
            return leftValue <= rightValue;
        case "!==":
            return leftValue !== rightValue;
        case "&&":
            return leftValue && rightValue;
        case "||":
            return leftValue || rightValue;
        case "??":
            return isNullish(leftValue) ? rightValue : leftValue;
        default:
            throw new Error("Unknown operator: " + expr.operator);
    }
}
function evaluate(str) {
    return evaluateExpression(parseExpression(str));
}
exports.evaluate = evaluate;
