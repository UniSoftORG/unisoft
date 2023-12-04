import { ChatCompletionFunctions } from "openai-edge";

export const defaultDefinitions: ChatCompletionFunctions[] = [
  {
    name: "current_page_components",
    description: "Get components of any page.",
    parameters: {
      type: "object",
      properties: {
        page: {
          enums: ["home", "forum"],
          description: "Page link.",
        },
      },
    },
  },
  {
    name: "example_component",
    description:
      "Example slider component definition, with functions.py, useEffects, animations, conditions, etc...",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "create_element",
    description: "Create a JSX element on desired page.",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Element name. Could be anything, but important prop.",
        },
        tag: {
          enums: ["div"],
          description: "Element tag.",
          default: "div",
        },
        className: {
          type: "string",
          description: "Tailwind classNames if desired.",
        },
      },
      required: ["name"],
    },
  },
];
