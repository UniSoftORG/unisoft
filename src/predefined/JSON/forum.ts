import { getLatestAnnouncements, getLatestTopics, getMainCategories } from '@/core/Backend/Endpoints/forum';
import { generateElement } from '@/core/Renderer/definitions/generators';
import { ElementTags } from '@/types';
import { VerticalSection } from '@/predefined/JSON/Flex/VerticalSection';
import { SimpleCard } from '@/predefined/JSON/Cards/SimpleCard';
import { FlexCard } from '@/predefined/JSON/Cards/FlexCard';

export const Forum = generateElement(
  'Forum',
  {
    elementAttributes: {
      className: 'relative w-full',
    },
    variables: {
      news: [],
      latest_topics: [],
      mainCategories: []
    },
    children: [
      VerticalSection([
        {
          ...SimpleCard,
          mapByKey: 'Forum.variables.news',
        }
      ]),
      generateElement('CentralContent', {
        elementAttributes: {
          className: 'grid grid-cols-12 mt-12 relative mb-12 space-y-6 lg:space-y-0 lg:space-x-6'
        },
        children: [
          generateElement('Categories', {
            elementAttributes: {
              className: 'col-span-12 lg:col-span-9 z-20'
            },
            children: [
              {
                ...FlexCard,
                mapByKey: "Forum.variables.mainCategories",
              }
            ]
          }, ElementTags.Section)
        ],
      })
    ],
    requests: [
      getLatestAnnouncements('news'),
      getLatestTopics('latest_topics'),
      getMainCategories('mainCategories'),
    ],
  },
  ElementTags.Main,
);
