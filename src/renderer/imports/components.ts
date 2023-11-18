import { KnownComponentType } from "@/types";
import Element from '@/renderer/strategies/Element';
import Image from "@/renderer/strategies/Image";
import Text from "@/renderer/strategies/Text";
import Link from "@/renderer/strategies/Link";

const componentsMaps: any = {
  [KnownComponentType.Image]: Image,
  [KnownComponentType.Element]: Element,
  [KnownComponentType.Link]: Link,
  [KnownComponentType.Text]: Text,
  // [KnownComponentType.Translation]: Translation,
};
export default componentsMaps;
