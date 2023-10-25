import InitiateRenderer from "@/renderer/InitiateRenderer";
import { Slider } from "@/predefined/components/Sliders/Slider";
import { Creators } from "unisoft-utils";

export default async function Home() {
  return await InitiateRenderer(Creators.simpleDeepClone([Slider]));
}
