import { ternaryCondition } from "@/core/Renderer/definitions/evaluators";
import {
  generateElement,
  generateTextField,
} from "@/core/Renderer/definitions/generators";
import { getAttribute } from "@/core/Renderer/definitions/getters";
import { Operators } from "@/types";

export const ActiveSlide = generateElement("Slide", {
  mapByKey: "Slider.variables.slides",
  elementAttributes: {
    className: `absolute w-full bg-cover bg-center h-full pl-8 pr-8 lg:pl-52 lg:pr-12 grid content-center transition duration-500
              ${ternaryCondition(
                {
                  value1: getAttribute("index"),
                  operator: Operators.StrictEqual,
                  value2: getAttribute("activeSlide"),
                },
                "opacity-100",
                "opacity-0"
              )}`,
    style: {
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2) 100%), url(${getAttribute(
        "image"
      )})`,
      backgroundPosition: "60% center",
      backgroundRepeat: "no-repeat",
    },
  },
  children: [
    generateTextField("Title", {
      receiveAttributes: {
        text: "Slide.passAttributes.text",
      },
      elementAttributes: { className: "text-5xl lg:text-7xl font-bold" },
    }),
    generateTextField("Description", {
      receiveAttributes: {
        text: "Slide.passAttributes.description",
      },
    }),
  ],
  receiveAttributes: {
    activeSlide: "Slider.states.activeSlide",
  },
  dynamic: ["elementAttributes.style.backgroundImage"],
  rendererDynamic: ["elementAttributes.className"],
  rendererConditions: ["elementAttributes.className"],
});
