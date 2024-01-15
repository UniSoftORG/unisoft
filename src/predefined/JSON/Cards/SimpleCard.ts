import { generateElement, generateImage, generateTextField } from '@/core/Renderer/definitions/generators';
import { ElementTags, TextTags } from '@/types';

export const SimpleCard = generateElement(
  "Card",
  {
    elementAttributes: {
      className: 'relative overflow-hidden grid shadow-4xl grid-cols-12 min-w-fit lg:min-w-0 lg:flex-1 justify-center items-center bg-neural-dark p-6 rounded-3xl'
    },
    children: [
      generateImage('CardImage', {
        elementAttributes: {
          src: '/icons/react-icons/${passAttributes.image}.svg',
          className: "col-span-2 p-2 aspect-square flex justify-center items-center rounded-full svg-color white",
        },
        receiveAttributes: {
          image: 'Card.passAttributes.category.icon.label',
        },
        dynamic: [
          "elementAttributes.src"
        ]
      }, 52),
      generateElement('CardInfo', {
        elementAttributes: {
          className: 'ml-3 col-span-10'
        },
        receiveAttributes: {
          title: 'Card.passAttributes.title',
          description: 'Card.passAttributes.description_plain',
        },
        children: [
          generateTextField('Title', {
            elementAttributes: {
              className: 'font-bold line-clamp-1'
            },
            receiveAttributes: {
              text: 'CardInfo.passAttributes.title'
            },
          }),
          generateTextField('Title', {
            elementAttributes: {
              className: 'text-xs text-gray line-clamp-1 mt-1'
            },
            receiveAttributes: {
              text: 'CardInfo.passAttributes.description'
            },
          }, TextTags.Paragraph)
        ]
      })
    ]
  },
  ElementTags.Article
);
