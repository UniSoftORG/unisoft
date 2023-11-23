import { KnownElementTag } from '@/types';
import { generateElement, generateTextField } from '@/definitions/generators';
import {
  getLatestAnnouncements,
  getLatestTopics,
  getMainCategories,
} from '@/endpoints/forum';

export const Forum = generateElement(
  'Forum',
  {
    elementAttributes: {
      className: 'relative w-full',
    },
    variables: {
      news: [],
      latest_topics: [],
      mainCategories: [],
    },
    dynamic: ['functions.0.attributes.value'],
    children: [
      generateElement('News', {
        mapByKey: 'Forum.variables.news',
        children: [
          generateTextField('TextTest', {
            receiveAttributes: {
              text: 'News.passAttributes.title',
              slug: 'News.passAttributes.slug',
            },
          }),
        ],
      }),
    ],
    requests: [
      {
        objKey: 'news',
        ...getLatestAnnouncements,
      },
      {
        objKey: 'latest_topics',
        ...getLatestTopics,
      },
      {
        objKey: 'mainCategories',
        ...getMainCategories,
      },
    ],
  },
  KnownElementTag.Section
);
