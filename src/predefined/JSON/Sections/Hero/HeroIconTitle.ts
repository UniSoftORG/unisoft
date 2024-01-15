import { generateElement, generateImage, generateTextField } from '@/core/Renderer/definitions/generators';
import { ElementTags, TextTags } from '@/types';

export const HeroIconTitle = generateElement(
  'HeroIconTitle',
  {
    elementAttributes: {
      className: 'inline-flex items-center ml-2'
    },
    children: [
      generateImage('Icon', {
        elementAttributes: {
          className: "rounded-full",
        },
        receiveAttributes: {
          image: "FlexCard.passAttributes.icon.front_path"
        }
      }, 42),
      generateTextField('Title', {
        elementAttributes: {
          className: 'text-2xl ml-2 font-semibold'
        },
        receiveAttributes: {
          text: "FlexCard.passAttributes.title"
        }
      }, TextTags.H1),
    ]
  }, ElementTags.Header
)