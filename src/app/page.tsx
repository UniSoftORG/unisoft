import InitiateRenderer from "@/renderer/InitiateRenderer";
import { Slider } from "@/predefined/components/Sliders/Slider";

export default async function Home() {
  return await InitiateRenderer([Slider]);
}
