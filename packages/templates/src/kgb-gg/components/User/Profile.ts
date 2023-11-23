import { generateElement, generateImage } from '@/definitions/generators';

export const Profile = generateElement('Profile', {
  elementAttributes: {
    className:
      'flex flex-col right-0 items-center justify-center cursor-pointer w-full',
  },
  children: [
    generateImage('Avatar', {
      elementAttributes: {
        ['src' as any]: '/icons/user.svg',
        ['width' as any]: 100,
        ['height' as any]: 100,
        className:
          'rounded-full aspect-square object-cover w-12 h-12 border-2 border-gray-700 p-1.5',
      },
    }),
  ],
});
