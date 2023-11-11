import { KnownElementTag } from '@/types';
import { generateElement, generateImage } from '@/definitions/generators';
import User from '@/public/icons/user.svg';
import { LinkHover } from '@/predefined/components/Navigations/LinkHover';
import { createEvent, setState } from '@/definitions/executors';
import { Events } from '@/types/events';

export const Link = generateElement(
  'NavLink',
  {
    mapByKey: 'Nav.variables.links',
    elementAttributes: {
      className: 'animate-zoomIn',
    },
    states: {
      hovered: 'false',
    },
    onEvents: [
      createEvent(Events.onMouseEnter, [setState('hovered', 'true')]),
      createEvent(Events.onMouseLeave, [setState('hovered', 'false')]),
    ],
    // functions: [
    //     useFunction('consoleLog', {value: '${states.hovered}'}),
    // ],
    children: [
      generateElement('Link', {
        children: [
          generateElement(
            'LinkButton',
            {
              elementAttributes: {
                className:
                  'flex justify-center items-center rounded-lg px-8 py-6 z-50',
                style: { minWidth: '2.5rem' },
              },
              children: [
                generateImage(
                  'LinkIcon',
                  {
                    elementAttributes: {
                      ['src' as any]: User,
                      className:
                        'transition-transform duration-500 ease-in-out',
                    },
                  },
                  24
                ),
              ],
            },
            KnownElementTag.Link
          ),
        ],
      }),
      LinkHover,
    ],
  },
  KnownElementTag.Li
);
