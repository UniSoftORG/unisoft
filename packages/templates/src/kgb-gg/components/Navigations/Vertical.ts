import { KnownElementTag } from '@/types';
import { generateElement } from '@/definitions/generators';
import { Profile } from '@/kgb-gg/components/User/Profile';
import { NavLinks } from '@/kgb-gg/components/Navigations/NavLinks';

export const Vertical = generateElement(
  'VerticalNavigation',
  {
    elementAttributes: {
      className:
        'flex justify-between mt-12 flex-col bg-dark-card-transparent py-5 nav-bg h-[calc(100vh-15rem)]',
      style: {
        borderRadius: '60px',
        transition: 'border-radius 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      },
    },
    children: [Profile, NavLinks],
  },
  KnownElementTag.Nav
);
