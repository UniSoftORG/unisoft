
import InitiateRenderer from "@/renderer/InitiateRenderer";
import { Slider } from "@/predefined/components/Sliders/Slider";
import {Forum} from "@/predefined/forum";
import {generatePassAttributes} from "@/utils/Renderer/propUtils";
import {NavWithLogo} from "@/predefined/components/Navigations/NavWithLogo";
import {prepareProps} from "@/renderer/helpers/initializors";

export default async function Home() {
  // prepareProps(NavWithLogo);
  //
  // return <pre>{JSON.stringify(NavWithLogo, null, 4)}</pre>
  return await InitiateRenderer([Slider]);
}
