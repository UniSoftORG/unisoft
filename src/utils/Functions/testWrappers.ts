import {wrapExternalFunction} from "@/utils/Functions/DynamicFunctionLibrary";
import {Getters} from "unisoft-utils";

export const wrappedAfter = wrapExternalFunction(
    Getters.after,
    attributes => [attributes.subject, attributes.search]
);

export const wrappedAfterLast = wrapExternalFunction(
    Getters.afterLast,
    attributes => [attributes.subject, attributes.search]
);

export const wrappedBefore = wrapExternalFunction(
    Getters.before,
    attributes => [attributes.subject, attributes.search]
);

export const wrappedBeforeLast = wrapExternalFunction(
    Getters.beforeLast,
    attributes => [attributes.subject, attributes.search]
);

export const wrappedBetween = wrapExternalFunction(
    Getters.between,
    attributes => [attributes.subject, attributes.start, attributes.end, attributes.]
);

export const wrappedSubstr = wrapExternalFunction(
    Getters.substr,
    attributes => [attributes.subject, attributes.start, attributes.length?, attributes.]
);

export const wrappedWordCount = wrapExternalFunction(
    Getters.wordCount,
    attributes => [attributes.subject]
);

export const wrappedUcsplit = wrapExternalFunction(
    Getters.ucsplit,
    attributes => [attributes.subject]
);

export const wrappedSubstrCount = wrapExternalFunction(
    Getters.substrCount,
    attributes => [attributes.subject, attributes.search]
);
