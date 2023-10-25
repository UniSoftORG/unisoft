import { KnownComponentType } from "@/types";
import Element from "@/renderer/strategies/Element";
// import Image from "@/renderer/strategies/Image"
// import Text from "@/renderer/strategies/Text"
// import Translation from "@/renderer/strategies/Translation"

const componentsMaps: any = {
  [KnownComponentType.Element]: Element,
  // [KnownComponentType.Image]: Image,
  // [KnownComponentType.Text]: Text,
  // [KnownComponentType.Translation]: Translation,
};

// export function componentsMap(get: any){
//     return componentsMaps[get]
// }

export default componentsMaps;
