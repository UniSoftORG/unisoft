import { generateElement } from '@/core/Renderer/definitions/generators';
import { IComponentType, ElementTags } from '@/types';

export const VerticalSection = (children: IComponentType[]) => generateElement("VerticalSection", {
  elementAttributes: {
    className:
      "flex flex-row space-x-3 mt-4 overflow-y-auto pb-3 lg:pb-0",
  },
  children: children
}, ElementTags.Section);