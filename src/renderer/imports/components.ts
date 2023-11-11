import { KnownComponentType } from '@/types';
import Element from '@/renderer/strategies/Element';
// import Image from '@/test/strategies/Image';
// import Text from '@/test/strategies/Text';
import dynamic from 'next/dynamic';
// import Translation from "@/renderer/strategies/Translation"

const componentsMaps: any = {
  [KnownComponentType.Element]: Element,
  [KnownComponentType.Image]: dynamic(
    () => import('@/renderer/strategies/Image')
  ),
  [KnownComponentType.Text]: dynamic(
    () => import('@/renderer/strategies/Text')
  ),
  // [KnownComponentType.Translation]: Translation,
};

// export function componentsMap(get: any){
//     return componentsMaps[get]
// }

export default componentsMaps;
