import InitiateRenderer from "@/core/Renderer/InitiateRenderer";
import { HomePage } from "@/template/pages/home";

export default async function Home() {
  return await InitiateRenderer(HomePage);
}
