import InitiateRenderer from "@/core/Renderer/InitiateRenderer";
import { HomePage } from "@/template/home";

export default async function Home() {
  return await InitiateRenderer(HomePage);
}
