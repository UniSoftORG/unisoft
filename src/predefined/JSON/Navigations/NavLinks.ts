import { generateElement } from "@/core/Renderer/definitions/generators";
import { KnownElementTag } from "@/types";
import { Link } from "./Link";

export const NavLinks = generateElement("NavLinks", {
  elementAttributes: {
    className: "flex-grow flex justify-center items-center",
  },
  children: [
    generateElement(
      "Links",
      {
        children: [Link],
      },
      KnownElementTag.Ul
    ),
  ],
});
