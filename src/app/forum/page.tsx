import InitiateRenderer from "@/core/Renderer/InitiateRenderer";
import { ForumPage } from "@/template/forum";

export default async function Home() {
  return await InitiateRenderer(ForumPage);
}
