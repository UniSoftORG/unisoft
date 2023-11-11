import { KnownElementTag } from '@/types';
import { generateElement } from '@/definitions/generators';
import { Link } from '@/predefined/components/Navigations/Link';

export const NavLinks = generateElement('NavLinks', {
  elementAttributes: {
    className: 'flex-grow flex justify-center items-center',
  },
  children: [
    generateElement(
      'Links',
      {
        children: [Link],
      },
      KnownElementTag.Ul
    ),
  ],
});
