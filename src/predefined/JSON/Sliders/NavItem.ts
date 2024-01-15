import {
  customCondition,
  ternaryCondition,
} from "@/core/Renderer/definitions/evaluators";
import { createEvent, setState } from "@/core/Renderer/definitions/executors";
import {
  generateElement,
  generateImage,
  generateTextField,
} from "@/core/Renderer/definitions/generators";
import { getAttribute } from "@/core/Renderer/definitions/getters";
import { Events, ElementTags, Operators } from "@/types";

const ternaryUtil = (
  trueReturn: string | number,
  falseReturn: string | number
) =>
  ternaryCondition(
    {
      value1: getAttribute("index"),
      operator: Operators.StrictEqual,
      value2: getAttribute("activeSlide"),
    },
    trueReturn,
    falseReturn
  );

export const NavItem = generateElement("Item", {
  mapByKey: "Slider.variables.slides",
  elementAttributes: {
    className: `${getAttribute("index")} ${customCondition(
      `${getAttribute("activeSlide")} === ${getAttribute(
        "index"
      )} && slider-button-hover`
    )} lg:flex z-40 lg:justify-center items-center lg:px-3 lg:py-2 rounded-full`,
  },
  rendererDynamic: ["elementAttributes.className"],
  rendererConditions: ["elementAttributes.className"],
  receiveAttributes: {
    activeSlide: "Navigation.passAttributes.activeSlide",
  },
  children: [
    generateElement(
      "Thumbnail",
      {
        elementAttributes: {
          className: `w-full blue-purple border-0 py-4 mr-4 hidden lg:block rounded-full transition duration-500 ease-in-out ${ternaryUtil(
            "opacity-100",
            "opacity-0"
          )}`,
        },
        rendererDynamic: ["elementAttributes.className"],
        rendererConditions: ["elementAttributes.className"],
        children: [
          generateTextField("Test", {
            passAttributes: {
              text: "test",
            },
            elementAttributes: { className: "font-bold" },
          }),
        ],
        receiveAttributes: {
          activeSlide: "Item.passAttributes.activeSlide",
          index: "Item.passAttributes.index",
        },
      },
      ElementTags.Button
    ),
    generateElement(
      "ImageWrapper",
      {
        uuid: getAttribute("parentUuid"),
        receiveAttributes: {
          index: "Item.passAttributes.index",
          image: "Item.passAttributes.image",
          activeSlide: "Item.passAttributes.activeSlide",
          parentUuid: "Slider.uuid",
        },
        elementAttributes: {
          className: `transition-all duration-300 ease-in-out transform border-2 p-1 lg:p-2 rounded-full m-1.5 lg:w-48 aspect-square ${ternaryUtil(
            "border-gray-300",
            "border-gray-700"
          )}`,
        },
        dynamic: ["uuid"],
        rendererDynamic: [
          "elementAttributes.className",
          "onEvents.0.callbacks.0.attributes.value",
        ],
        rendererConditions: ["elementAttributes.className"],
        onEvents: [
          createEvent(Events.onClick, [
            setState("activeSlide", getAttribute("index")),
          ]),
        ],
        children: [
          generateImage(
            "NavImage",
            {
              elementAttributes: {
                className:
                  "w-16 h-16 lg:h-full lg:w-full rounded-full object-cover",
              },
              receiveAttributes: {
                image: "ImageWrapper.passAttributes.image",
              },
            },
            100
          ),
        ],
      },
      ElementTags.Button
    ),
  ],
});
