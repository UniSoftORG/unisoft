import { generateElement } from "@/core/Renderer/definitions/generators";
import { NavItem } from "@/predefined/JSON/Sliders/NavItem";

export const Navigation = generateElement("Navigation", {
  elementAttributes: {
    className: `absolute h-screen flex flex-col justify-center items-center right-6`,
  },
  receiveAttributes: {
    activeSlide: "Slider.states.activeSlide",
  },
  children: [NavItem],
});
