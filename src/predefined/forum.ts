import { KnownElementTag } from '@/types';
import { generateElement, generateTextField } from '@/definitions/generators';
import { SupportedApiMethods } from '@/interfaces/api/generics';

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
        method: SupportedApiMethods.GET,
        url: 'forum/threads?limit=4&category=announcements&include=category',
      },
      {
        objKey: 'latest_topics',
        method: SupportedApiMethods.GET,
        url: 'forum/threads?limit=5&include=category',
      },
      {
        objKey: 'mainCategories',
        method: SupportedApiMethods.GET,
        url: 'forum/categories?include=stats, sub_categories',
      },
    ],
  },
  KnownElementTag.Section
);
