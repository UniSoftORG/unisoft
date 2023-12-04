import {
  createEvent,
  useModalHook,
} from "@/core/Renderer/definitions/executors";
import {
  generateElement,
  generateImage,
} from "@/core/Renderer/definitions/generators";
import { ProfileSettings } from "@/predefined/JSON/Navigations/ProfileLinks";
import { DefaultModalType, Events } from "@/types";

export const Profile = generateElement("Profile", {
  renderer: "client",
  elementAttributes: {
    className:
      "flex flex-col right-0 items-center justify-center cursor-pointer w-full",
  },
  states: {
    openSettings: false,
  },
  onEvents: [
    createEvent(Events.onClick, [useModalHook(DefaultModalType.LOGIN)]),
  ],
  receiveAttributes: {
    session: "Nav.session",
  },
  children: [
    generateImage("Avatar", {
      elementAttributes: {
        ["src" as any]: "/icons/user.svg",
        ["width" as any]: 100,
        ["height" as any]: 100,
        className:
          "rounded-full aspect-square object-cover w-12 h-12 border-2 border-gray-700 p-1.5",
      },
    }),
    ProfileSettings,
  ],
});
