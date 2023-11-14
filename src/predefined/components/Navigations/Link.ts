import { KnownElementTag } from '@/types';
import {generateElement, generateImage, generateLink} from '@/definitions/generators';
import { LinkHover } from './LinkHover';
import { createEvent, setState } from '@/definitions/executors';
import { Events } from '@/types/events';

export const Link = generateLink(
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
        receiveAttributes: {
          image: 'NavLink.passAttributes.image',
        },
        children: [
          generateElement(
            'LinkButton',
            {
              receiveAttributes: {
                image: 'Link.passAttributes.image',
              },
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
                      className:
                        'transition-transform duration-300 ease-in-out',
                    },
                    receiveAttributes: {
                      image: 'LinkButton.passAttributes.image',
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
  }
);
