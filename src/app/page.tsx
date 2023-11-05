import InitiateRenderer from "@/renderer/InitiateRenderer";
import { HomePage } from "@/website/pageRouter"

export default async function Home() {
  return <>
  a
    {await InitiateRenderer(HomePage)}
  </>
}
