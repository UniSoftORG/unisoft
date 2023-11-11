import { generateElement, generateImage } from '@/definitions/generators';
import User from '@/public/icons/user.svg';

export const Profile = generateElement('Profile', {
  elementAttributes: {
    className:
      'flex flex-col right-0 items-center justify-center cursor-pointer w-full',
  },
  children: [
    generateImage('Avatar', {
      elementAttributes: {
        ['src' as any]: User,
        className:
          'rounded-full aspect-square object-cover w-12 h-12 border-2 border-gray-700 p-1.5',
      },
    }),
  ],
});
