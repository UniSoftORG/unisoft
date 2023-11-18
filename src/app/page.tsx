import InitiateRenderer from "@/renderer/InitiateRenderer";
import { HomePage } from "@/template/home";
export default async function Home() {
  return await InitiateRenderer(HomePage);
}
