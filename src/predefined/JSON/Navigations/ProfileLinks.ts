import { ternaryCondition } from "@/core/Renderer/definitions/evaluators";
import { setState, useTimeOut } from "@/core/Renderer/definitions/executors";
import {
  generateElement,
  generateTextField,
} from "@/core/Renderer/definitions/generators";
import { getAttribute, getState } from "@/core/Renderer/definitions/getters";

export const ProfileSettings = generateElement("ProfileSettings", {
  states: {
    initial: true,
  },
  functions: [useTimeOut([], [setState("initial", false)], 7000)],
  elementAttributes: {
    className: `${ternaryCondition(
      getState("initial"),
      "animate-slideInRight",
      "animate-slideOutLeft"
    )} absolute cursor-default box bg-neural-dark bg-opacity-90 arrow-center w-48 rounded-2xl flex flex-col justify-center items-center pl-4  py-3 pr-2 text-center z-40`,
    style: { left: "6.5rem", minHeight: "5rem" },
  },
  rendererDynamic: ["elementAttributes.className"],
  rendererConditions: ["elementAttributes.className"],
  children: [
    generateElement("Username", {
      elementAttributes: {
        className: "flex flex-col",
      },
      states: {
        text: ternaryCondition(
          getAttribute("username"),
          `Hello, ${getAttribute("username")}`,
          "Sign in"
        ),
        text2: ternaryCondition(
          getAttribute("username"),
          "Nice to have you back! Enjoy your stay.",
          "Hi, nice to have you on board! Click on the user icon to sign in"
        ),
      },
      receiveAttributes: {
        username: "Nav.session.username",
      },
      rendererDynamic: ["states.text", "states.text2"],
      rendererConditions: ["states.text", "states.text2"],
      children: [
        generateTextField("Title", {
          elementAttributes: {
            className: "font-extrabold text-primary",
          },
          receiveAttributes: {
            text: "Username.states.text",
          },
        }),
        generateTextField("Title", {
          elementAttributes: {
            className: "text-xs",
          },
          receiveAttributes: {
            text: "Username.states.text2",
          },
        }),
      ],
    }),
  ],
});
