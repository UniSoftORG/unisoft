import { createEvent, setState } from "@/core/Renderer/definitions/executors";
import {
  generateElement,
  generateImage,
  generateLink,
} from "@/core/Renderer/definitions/generators";
import { Events } from "@/types";
import { LinkHover } from "./LinkHover";

export const Link = generateLink("NavLink", {
  mapByKey: "Nav.variables.links",
  elementAttributes: {
    className: "animate-fadeIn",
  },
  states: {
    hovered: "false",
  },
  onEvents: [
    createEvent(Events.onMouseEnter, [setState("hovered", "true")]),
    createEvent(Events.onMouseLeave, [setState("hovered", "false")]),
  ],
  children: [
    generateElement("LinkButton", {
      elementAttributes: {
        className:
          "flex justify-center items-center rounded-lg px-8 py-6 z-50",
        style: { minWidth: "2.5rem" },
      },
      children: [
        generateImage(
          "LinkIcon",
          {
            elementAttributes: {
              className: "transition-transform duration-300 ease-in-out",
            },
            receiveAttributes: {
              image: "NavLink.passAttributes.image",
            },
          },
          24
        ),
      ],
    }),
    LinkHover,
  ],
});
