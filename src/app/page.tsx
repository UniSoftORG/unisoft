import InitiateRenderer from "@/renderer/InitiateRenderer";
import { HomePage } from "@/website/pageRouter"
import {Slider} from "@/predefined/components/Sliders/1/Slider";

export default async function Home() {
  return <>

    {await InitiateRenderer([Slider])}
  </>
}
