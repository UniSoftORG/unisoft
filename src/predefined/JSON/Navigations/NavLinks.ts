import { generateElement } from "@/core/Renderer/definitions/generators";
import { ElementTags } from "@/types";
import { Link } from "./Link";
// import { Indicator } from '@/predefined/JSON/Navigations/Indicator';

export const NavLinks = generateElement("NavLinks", {
  elementAttributes: {
    className: "flex-grow flex justify-center items-center",
  },
  children: [
    // Indicator,
    generateElement(
      "Links",
      {
        children: [Link],
      },
      ElementTags.Ul
    ),
  ],
});
