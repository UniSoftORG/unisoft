import { ternaryCondition } from "@/core/Renderer/definitions/evaluators";
import { setState, useInterval } from "@/core/Renderer/definitions/executors";
import { generateElement } from "@/core/Renderer/definitions/generators";
import { getState } from "@/core/Renderer/definitions/getters";
import { Navigation } from "@/predefined/JSON/Sliders/Navigation";
import { ActiveSlide } from "@/predefined/JSON/Sliders/Slide";
import { KnownElementTag, Operators } from "@/types";

export const Slider = generateElement(
  "Slider",
  {
    elementAttributes: {
      className: "relative h-screen w-full",
    },
    variables: {
      test: {},
      slides: [
        {
          image: "/images/slider/bg-test.webp",
          href: "/",
          text: "Counter Strike: Global Offensive",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          image: "/images/slider/bg-test3.webp",
          href: "/",
          text: "Minecraft",
          description:
            "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          image: "/images/slider/bg-test2.webp",
          href: "/",
          text: "Minecraft",
          description:
            "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      ],
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

  KnownElementTag.Section
);
