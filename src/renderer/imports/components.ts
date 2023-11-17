import { KnownComponentType } from "@/types";
// import Element from '@/renderer/strategies/Element';
import Image from "@/renderer/strategies/Image";
import Text from "@/renderer/strategies/Text";
import dynamic from "next/dynamic";
// import Link from "@/renderer/strategies/Link";

const componentsMaps: any = {
  [KnownComponentType.Image]: Image,
  [KnownComponentType.Element]: dynamic(
    () => import("@/renderer/strategies/Element")
  ),
  [KnownComponentType.Link]: dynamic(
    () => import("@/renderer/strategies/Link")
  ),
  [KnownComponentType.Text]: Text,
  // [KnownComponentType.Translation]: Translation,
};
export default componentsMaps;
