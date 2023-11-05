function isNullish(value: any) {
  return value === null || value === undefined;
}

function splitByOperator(str: string, operator: string): string[] {
  let depth = 0;
  let lastIndex = 0;
  const parts: string[] = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === "(") depth++;
    else if (char === ")") depth--;

    if (depth === 0 && str.substr(i, operator.length) === operator) {
      parts.push(str.substring(lastIndex, i));
      i += operator.length - 1;
      lastIndex = i + 1;
    }
  }

  parts.push(str.substring(lastIndex));
  return parts.map((part) => part.trim());
}

function findMatchingColon(str: string): number {
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "?") depth++;
    else if (str[i] === ":") {
      if (depth === 1) return i;
      depth--;
    }
  }
  return -1;
}

function parseExpression(str: string): any {
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

  const questionIndex = str.indexOf("?");
  if (questionIndex !== -1) {
    const colonIndex = findMatchingColon(str);
    if (colonIndex !== -1) {
      return {
        condition: parseExpression(str.substring(0, questionIndex)),
        trueBranch: parseExpression(
          str.substring(questionIndex + 1, colonIndex),
        ),
        falseBranch: parseExpression(str.substring(colonIndex + 1)),
      };
    }
  }

  const operators = [
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

  for (const operator of operators) {
    const parts = splitByOperator(str, operator);
    if (parts && parts.length === 2) {
      return {
        left: parseExpression(parts[0]),
        operator,
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
      if (!isNaN(Number(str))) return Number(str);
      return str.replace(/^'(.*)'$/, "$1");
  }
}

function evaluateExpression(expr: any): any {
  if (
    typeof expr === "string" ||
    typeof expr === "number" ||
    typeof expr === "boolean" ||
    expr === null
  ) {
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

  const leftValue = evaluateExpression(expr.left);
  const rightValue = evaluateExpression(expr.right);

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

export function evaluate(str: string): any {
  return evaluateExpression(parseExpression(str));
}
