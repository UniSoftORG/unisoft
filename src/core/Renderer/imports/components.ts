import Element from "@/core/Renderer/strategies/Element";
import Image from "@/core/Renderer/strategies/Image";
import Link from "@/core/Renderer/strategies/Link";
import Text from "@/core/Renderer/strategies/Text";
import { KnownComponentType } from "@/types";

const componentsMaps: any = {
  [KnownComponentType.Image]: Image,
  [KnownComponentType.Element]: Element,
  [KnownComponentType.Link]: Link,
  [KnownComponentType.Text]: Text,
  // [KnownComponentType.Translation]: Translation,
};
export default componentsMaps;
