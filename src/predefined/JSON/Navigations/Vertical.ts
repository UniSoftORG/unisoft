import { generateElement } from "@/core/Renderer/definitions/generators";
import { Profile } from "@/predefined/JSON/User/Profile";
import { ElementTags } from "@/types";
import { NavLinks } from "./NavLinks";

export const Vertical = generateElement(
  "VerticalNavigation",
  {
    elementAttributes: {
      className:
        "flex justify-between mt-12 flex-col bg-dark-card-transparent py-5 nav-bg h-[calc(100vh-15rem)]",
      style: {
        borderRadius: "60px",
        transition: "border-radius 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      },
    },
    children: [Profile, NavLinks],
  },
  ElementTags.Nav
);
