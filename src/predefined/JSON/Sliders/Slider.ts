import { ternaryCondition } from "@/core/Renderer/definitions/evaluators";
import { setState, useInterval } from "@/core/Renderer/definitions/executors";
import { generateElement } from "@/core/Renderer/definitions/generators";
import { getState } from "@/core/Renderer/definitions/getters";
import { Navigation } from "@/predefined/JSON/Sliders/Navigation";
import { ActiveSlide } from "@/predefined/JSON/Sliders/Slide";
import { ElementTags, Operators } from "@/types";
import { slides } from '@/template/data/slides';

export const Slider = generateElement(
  "Slider",
  {
    elementAttributes: {
      className: "relative h-screen w-full",
    },
    variables: {
      slides: slides,
    },
    functions: [
      useInterval(
        ["activeSlide"],
        [
          setState(
            "activeSlide",
            ternaryCondition(
              {
                value1: getState("activeSlide"),
                operator: Operators.StrictEqual,
                value2: 1,
              },
              0,
              1
            )
          ),
        ],
        5000
      ),
    ],
    states: {
      activeSlide: 0,
    },
    rendererDynamic: ["functions.0.attributes.callbacks.0.attributes.value"],
    rendererConditions: ["functions.0.attributes.callbacks.0.attributes.value"],
    children: [ActiveSlide, Navigation],
  },

  ElementTags.Section
);
