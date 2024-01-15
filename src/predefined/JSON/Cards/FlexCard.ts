import { generateElement, generateImage, generateTextField } from '@/core/Renderer/definitions/generators';
import { HeroIconTitle } from '@/predefined/JSON/Sections/Hero/HeroIconTitle';
import { ElementTags, TextTags } from '@/types';

export const FlexCard = generateElement('FlexCard', {
  elementAttributes: {
    className: 'flex flex-col space-y-2 mb-8',
  },
  children: [
    HeroIconTitle,
    generateElement('FlexCategories', {
      mapByKey: 'FlexCard.passAttributes.categories',
      elementAttributes: {
        className: 'dark-gradient-r grid opacity grid-cols-12 lg:gap-6 mt-2 px-5 py-3.5 font-bold rounded-3xl',
      },
      children: [
        generateElement('Category', {
          elementAttributes: {
            className: 'col-span-7 lg:col-span-7 flex items-center space-x-3',
          },
          children: [
            generateImage('Icon', {
              elementAttributes: {
                className: 'rounded-full',
              },
              receiveAttributes: {
                image: 'FlexCategories.passAttributes.icon.label',
              },
            }, 42),
            generateElement('CategoryInfo', {
              elementAttributes: {
               className: "w-10/12 ml-2"
              },
              children: [
                generateTextField('Title', {
                  elementAttributes: {
                    className: 'text-lg truncate',
                  },
                  receiveAttributes: {
                    text: 'FlexCategories.passAttributes.title',
                  },
                }),
                generateTextField('Description', {
                  elementAttributes: {
                    className: 'text-sm font-semibold text-gray truncate',
                  },
                  receiveAttributes: {
                    text: 'FlexCategories.passAttributes.short_description',
                  },
                }, TextTags.Paragraph),
              ]
            })
          ],
        }, ElementTags.Data),
        generateElement('CategoryPostStats', {
          elementAttributes: {
            className: 'hidden lg:flex lg:flex-col col-span-1 items-center justify-end text-sm',
          },
          children: [
            generateTextField('Posts', {
              elementAttributes: {
                className: 'text-gray truncate',
              },
              passAttributes: {
                text: 'Posts',
              },
            }, TextTags.Span),
            generateTextField('PostsCount', {
              receiveAttributes: {
                text: 'FlexCategories.passAttributes.stats.posts',
              },
            }, TextTags.Span),
          ],
        }),
        generateElement('CategoryThreadsStats', {
          elementAttributes: {
            className: 'hidden lg:flex lg:flex-col col-span-1 items-center justify-end text-sm',
          },
          children: [
            generateTextField('Threads', {
              elementAttributes: {
                className: 'text-gray truncate',
              },
              passAttributes: {
                text: 'Threads',
              },
            }, TextTags.Span),
            generateTextField('ThreadsCount', {
              receiveAttributes: {
                text: 'FlexCategories.passAttributes.stats.threads',
              },
            }, TextTags.Span),
          ],
        })
        // generateTextField('Titles', {
        //   elementAttributes: {
        //     className: 'text-lg truncate'
        //   },
        //   receiveAttributes: {
        //     text: 'FlexCategories.passAttributes.title'
        //   }
        // })
      ],
    }),
  ],
});