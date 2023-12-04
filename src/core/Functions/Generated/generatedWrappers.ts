import { wrapExternalFunction } from "@/core/Functions/DynamicFunctionLibrary";
import {
  after,
  afterLast,
  before,
  beforeLast,
  substrCount,
  ucsplit,
  wordCount,
} from "unisoft-utils";

export const wrappedAfter = wrapExternalFunction(after, (attributes) => [
  attributes.subject,
  attributes.search,
]);

export const wrappedAfterLast = wrapExternalFunction(
  afterLast,
  (attributes) => [attributes.subject, attributes.search]
);

export const wrappedBefore = wrapExternalFunction(before, (attributes) => [
  attributes.subject,
  attributes.search,
]);

export const wrappedBeforeLast = wrapExternalFunction(
  beforeLast,
  (attributes) => [attributes.subject, attributes.search]
);

export const wrappedWordCount = wrapExternalFunction(
  wordCount,
  (attributes) => [attributes.subject]
);

export const wrappedUcsplit = wrapExternalFunction(ucsplit, (attributes) => [
  attributes.subject,
]);
// registerFunction('ucsplit', wrappedUcsplit);

export const wrappedSubstrCount = wrapExternalFunction(
  substrCount,
  (attributes) => [attributes.subject, attributes.search]
);

export const consoleLog = wrapExternalFunction(
  (value) => {
    if (value) {
      console.log(value);
    }
  },
  (attributes) => [attributes.value]
);
