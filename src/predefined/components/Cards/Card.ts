import { customCondition } from "@/definitions/evaluators";
import { createEvent, setState } from "@/definitions/executors";
import {
  generateElement,
  generateImage,
  generateTextField
} from "@/definitions/generators";
import { getAttribute, getState } from "@/definitions/getters";
import { products } from "@/endpoints/products";
import DoubleArrow from "@/public/icons/doubleArrow.svg";
import { KnownElementTag } from "@/types";
import { Events } from "@/types/events";

export const Card = generateElement(
  "GameProducts",
  {
    variables: {
      products: [],
    },
    elementAttributes: {
      className: "mt-12 mx-4 lg:ml-52 lg:mr-20",
    },
    children: [
      generateElement(
        "GameHeader",
        {
          children: [
            generateTextField("GameServers", {
              elementAttributes: {
                className: "text-gray-dark font-bold text-5xl",
              },
              passAttributes: {
                text: "Featured Games",
              },
            }),
          ],
        },
        KnownElementTag.Header
      ),
      generateElement(
        "GameList",
        {
          elementAttributes: {
            className: `mt-12 grid grid-cols-1 lg:grid-cols-4 gap-5 w-full`,
          },
          children: [
            generateElement("Game", {
              mapByKey: "GameProducts.variables.products",
              states: {
                hovered: "false",
              },
              onEvents: [
                createEvent(Events.onMouseEnter, [setState("hovered", "true")]),
                createEvent(Events.onMouseLeave, [
                  setState("hovered", "false"),
                ]),
              ],
              elementAttributes: {
                className: `flex w-full h-full rounded-3xl items-center justify-center overflow-hidden aspect-square relative game-card ${customCondition(
                  `${getState("hovered")} && mouse-over`
                )}`,
                style: {
                  backgroundImage: `url(${
                    process.env.NEXT_PUBLIC_STORAGE_URL
                  }/${getAttribute("image")})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                },
              },
              children: [
                generateElement("Actions", {
                  elementAttributes: {
                    className: `flex flex-col flex-grow  items-center transform transition-transform duration-300 ease-out ${customCondition(
                      `${getAttribute(
                        "hovered"
                      )} ? translate-y-[-1rem] mt-32 : mt-44`
                    )}`,
                  },
                  rendererDynamic: ["elementAttributes.className"],
                  rendererConditions: ["elementAttributes.className"],
                  receiveAttributes: {
                    hovered: "Game.states.hovered",
                  },
                  children: [
                    generateTextField("Label", {
                      elementAttributes: {
                        className: "font-extrabold text-2xl",
                      },
                      passAttributes: {
                        text: "Test",
                      },
                    }),
                    generateImage(
                      "Arrow",
                      {
                        elementAttributes: {
                          ["src" as any]: DoubleArrow,
                          className: `relative top-5  -rotate-180 transition-opacity duration-300 ease-in-out ${customCondition(
                            `${getAttribute(
                              "hovered"
                            )} ? opacity-0 : opacity-100`
                          )}`,
                        },
                        rendererDynamic: ["elementAttributes.className"],
                        rendererConditions: ["elementAttributes.className"],
                        receiveAttributes: {
                          hovered: "Actions.passAttributes.hovered",
                        },
                      },
                      12
                    ),
                  ],
                }),
                generateElement(
                  "Footer",
                  {
                    receiveAttributes: {
                      hovered: "Game.states.hovered",
                    },
                    elementAttributes: {
                      className: "h-96",
                    },
                    children: [
                      generateElement("FooterBody", {
                        elementAttributes: {
                          className: `absolute bottom-2 left-0 right-0 flex space-x-2 w-full px-4 py-4 transition-opacity duration-300 ease-out ${customCondition(
                            `${getAttribute(
                              "hovered"
                            )} ? opacity-100 : opacity-0`
                          )}`,
                        },
                        rendererDynamic: ["elementAttributes.className"],
                        rendererConditions: ["elementAttributes.className"],
                        receiveAttributes: {
                          hovered: "Footer.passAttributes.hovered",
                        },
                        children: [
                          generateElement(
                            "Button",
                            {
                              elementAttributes: {
                                className:
                                  "w-full rounded-full justify-center items-center bg-gradient-to-r from-red to-orange-light py-4",
                              },
                              children: [
                                generateTextField("Label", {
                                  elementAttributes: {
                                    className: "font-extrabold text-2xl",
                                  },
                                  passAttributes: {
                                    text: "Test",
                                  },
                                }),
                              ],
                            },
                            KnownElementTag.Button
                          ),
                          generateElement(
                            "Button2",
                            {
                              elementAttributes: {
                                className:
                                  "w-full justify-center items-center py-4",
                              },
                              children: [
                                generateTextField("Label", {
                                  elementAttributes: {
                                    className: "font-extrabold text-2xl",
                                  },
                                  passAttributes: {
                                    text: "Test",
                                  },
                                }),
                              ],
                            },
                            KnownElementTag.Button
                          ),
                        ],
                      }),
                    ],
                  },
                  KnownElementTag.Footer
                ),
              ],
              rendererDynamic: ["elementAttributes.className"],
              rendererConditions: ["elementAttributes.className"],
              dynamic: [
                "elementAttributes.style.backgroundImage",
                "onEvents.0.callbacks.0.attributes.value",
                "onEvents.1.callbacks.0.attributes.value",
              ],
            }),
          ],
        },
        KnownElementTag.Div
      ),
    ],
    requests: [
      {
        objKey: "products",
        ...products,
      },
    ],
  },
  KnownElementTag.Section
);