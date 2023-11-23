import { KnownComponentType } from '@/types';
import Element from '@/renderer/strategies/Element';

import dynamic from 'next/dynamic';
import Link from "@/renderer/strategies/Link";

const componentsMaps: any = {
  [KnownComponentType.Element]: Element,
  [KnownComponentType.Link]: Link,
  [KnownComponentType.Image]: dynamic(
    () => import('@/renderer/strategies/Image')
  ),
  [KnownComponentType.Text]: dynamic(
    () => import('@/renderer/strategies/Text')
  ),
  // [KnownComponentType.Translation]: Translation,
};
export default componentsMaps;
