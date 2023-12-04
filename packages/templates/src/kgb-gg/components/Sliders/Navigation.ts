import { generateElement } from '@/definitions/generators';
import { NavItem } from './NavItem';

export const Navigation = generateElement('Navigation', {
  elementAttributes: {
    className: `absolute h-screen flex flex-col justify-center items-center right-6`,
  },
  children: [NavItem],
});
