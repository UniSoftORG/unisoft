import { KnownElementTag, Operators } from '@/types';
import { generateElement } from '@/definitions/generators';
import { setState, useInterval } from '@/definitions/executors';
import { getState } from '@/definitions/getters';
import { ternaryCondition } from '@/definitions/evaluators';
import { ActiveSlide } from './Slide';
import { Navigation } from './Navigation';

export const Slider = generateElement(
  'Slider',
  {
    elementAttributes: {
      className: 'relative h-screen w-full',
    },
    variables: {
      slides: [
        {
          image: '/images/slider/bg-test.webp',
          href: '/',
          text: 'Counter Strike: Global Offensive',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          image: '/images/slider/bg-test3.webp',
          href: '/',
          text: 'Minecraft',
          description:
            'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      ],
    },
    functions: [
      useInterval(
        ['activeSlide'],
        [
          setState(
            'activeSlide',
            ternaryCondition(
              {
                value1: getState('activeSlide'),
                operator: Operators.StrictEqual,
                value2: 1,
              },
              0,
              1
            )
          ),
        ],
        5000
      ),
    ],
    states: {
      activeSlide: 0,
    },
    rendererDynamic: ['functions.0.attributes.callbacks.0.attributes.value'],
    rendererConditions: ['functions.0.attributes.callbacks.0.attributes.value'],
    children: [
      // generateElement('Wrap', {
      //     elementAttributes: {
      //         className: "flex flex-col lg:grid lg:grid-cols-6 lg:content-center lg:justify-items-end w-full",
      //     },
      // }),
      ActiveSlide,
      Navigation,
    ],
  },
  KnownElementTag.Section
);
