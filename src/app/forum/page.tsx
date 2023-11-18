import { Forum } from "@/predefined/forum";
import InitiateRenderer from "@/renderer/InitiateRenderer";

export default async function Home() {
  return await InitiateRenderer([Forum]);
}
