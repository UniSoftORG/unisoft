
import InitiateRenderer from "@/renderer/InitiateRenderer";
import { Slider } from "@/predefined/components/Sliders/Slider";
import {Forum} from "@/predefined/forum";

export default async function Home() {
  return await InitiateRenderer([Forum, Slider]);
}
