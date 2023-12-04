import {
  generateElement,
  generateImage,
} from "@/core/Renderer/definitions/generators";
import { Vertical } from "@/predefined/JSON/Navigations/Vertical";
import { KnownElementTag } from "@/types";

export const NavWithLogo = generateElement(
  "Nav",
  {
    variables: {
      links: [
        {
          name: "Home",
          image: "/icons/home.svg",
          href: "/",
        },
        {
          name: "Games",
          image: "/icons/games.svg",
          href: "/",
          subText: "Need a game server? This is a place for you!",
        },
        {
          name: "Forum",
          image: "/icons/forum.svg",
          href: "/forum",
          subText: "Wanna hang out? That's the place!",
        },
      ],
    },
    elementAttributes: {
      className: "hidden fixed lg:flex flex-col h-screen ml-20 z-40 top-0",
    },
    children: [
      generateElement("LogoWrapper", {
        elementAttributes: {
          className: "mt-10 lg:mt-10",
        },
        children: [
          generateImage("Logo", {
            elementAttributes: {
              ["src" as any]: "kgb.png",
              ["height" as any]: 96,
            },
          }),
        ],
      }),
      Vertical,
    ],
  },
  KnownElementTag.Aside
);
