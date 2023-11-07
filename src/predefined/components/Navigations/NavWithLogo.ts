import {KnownElementTag,} from "@/types";
import {generateElement, generateImage} from "@/definitions/generators";
import Logo from "@/public/kgb.png";
import {Vertical} from "@/predefined/components/Navigations/Vertical";
import HomeIcon from "@/public/icons/home.svg";
import GamesIcon from "@/public/icons/games.svg";
import ForumIcon from "@/public/icons/forum.svg";

export const NavWithLogo = generateElement(
    "Nav",
    {
        variables: {
            links: [
                {
                    name: "Home",
                    image: HomeIcon,
                    href: "/"
                },
                {
                    name: "Games",
                    image: GamesIcon,
                    href: "/gameserver",
                    subText: "Need a game server? This is a place for you!",
                },
                {
                    name: "Forum",
                    image: ForumIcon,
                    href: "/forum",
                    subText: "Wanna hang out? That's the place!",
                }
            ]
        },
        elementAttributes: {
            className: 'hidden fixed lg:flex flex-col h-screen ml-20 z-40 top-0'
        },
         children: [
             generateElement('LogoWrapper', {
                 elementAttributes: {
                     className: 'mt-10 lg:mt-10',
                 },
               children: [
                   generateImage('Logo', {
                       elementAttributes: {
                           ['src' as any]: Logo,
                           ['height' as any]: 96
                       }
                   })
               ]
             }),
             Vertical
         ]
    },
    KnownElementTag.Aside,
);
