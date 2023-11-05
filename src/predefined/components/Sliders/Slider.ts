import { KnownElementTag, Operators } from "@/types";
import { generateElement } from "@/definitions/generators";
import { setState, useInterval } from "@/definitions/executors";
import { getAttribute, getState } from "@/definitions/getters";
import { customCondition, ternaryCondition } from "@/definitions/evaluators";

export const Slider = generateElement(
    "Slider",
    {
        elementAttributes: {
            className: "relative h-screen w-full",
        },
        variables: {
            slides: [
                {
                    image: "/images/slider/bg-test.webp",
                    href: "/",
                },
                {
                    image: "/images/slider/bg-test3.webp",
                    href: "/",
                },
            ],
        },
        functions: [
            useInterval(
                ["activeSlide"],
                [
                    setState(
                        "activeSlide",
                        customCondition(`${getState("activeSlide")} === 1 ? 0 : 1`),
                    ),
                ],
                1000,
            ),
        ],
        states: {
            activeSlide: 0,
            loading: true,
        },
        rendererDynamic: ["functions.0.attributes.executeFn.0.attributes.value"],
        rendererConditions: ["functions.0.attributes.executeFn.0.attributes.value"],
        children: [
            generateElement("SliderBackground", {
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
                        "opacity-0",
                    )}
                            `,
                    style: {
                        backgroundImage:
                            "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2) 100%), url(${passAttributes.image})",
                        backgroundPosition: "60% center",
                        backgroundRepeat: "no-repeat",
                    },
                },
                receiveAttributes: {
                    slides: "Slider.variables.slides",
                    activeSlide: "Slider.states.activeSlide",
                    parent: "Slider.name",
                },
                dynamic: [
                    "elementAttributes.style.backgroundImage",
                    "elementAttributes.className",
                ],
                conditions: ["elementAttributes.className"],
            }),
        ],
    },
    KnownElementTag.Section,
);
