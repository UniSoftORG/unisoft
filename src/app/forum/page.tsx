import { Forum } from "@/predefined/forum";
import InitiateRenderer from "@/renderer/InitiateRenderer";

export default async function Home() {
  return <>{InitiateRenderer([Forum])}</>;
}
