import {registerFunction, wrapExternalFunction} from "@/utils/Functions/DynamicFunctionLibrary";
import {Getters} from "unisoft-utils";

export const wrappedAfter = wrapExternalFunction(
    Getters.after,
    attributes => [attributes.subject, attributes.search]
);
// registerFunction('after', wrappedAfter);


export const wrappedAfterLast = wrapExternalFunction(
    Getters.afterLast,
    attributes => [attributes.subject, attributes.search]
);
// registerFunction('afterLast', wrappedAfterLast);


export const wrappedBefore = wrapExternalFunction(
    Getters.before,
    attributes => [attributes.subject, attributes.search]
);
// registerFunction('before', wrappedBefore);


export const wrappedBeforeLast = wrapExternalFunction(
    Getters.beforeLast,
    attributes => [attributes.subject, attributes.search]
);
// registerFunction('beforeLast', wrappedBeforeLast);

export const wrappedWordCount = wrapExternalFunction(
    Getters.wordCount,
    attributes => [attributes.subject]
);
// registerFunction('wordCount', wrappedWordCount);


export const wrappedUcsplit = wrapExternalFunction(
    Getters.ucsplit,
    attributes => [attributes.subject]
);
// registerFunction('ucsplit', wrappedUcsplit);


export const wrappedSubstrCount = wrapExternalFunction(
    Getters.substrCount,
    attributes => [attributes.subject, attributes.search]
);


export const consoleLog = wrapExternalFunction(
    (value) => {
        if (value) {
            console.log(value);
        }
    },
    attributes => [attributes.value]
);

// registerFunction('substrCount', wrappedSubstrCount);

