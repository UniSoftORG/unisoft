import InitiateRenderer from "@/core/Renderer/InitiateRenderer";
import { GameServersPage } from '@/template/pages/gameservers';

export default async function GameServers() {
  return await InitiateRenderer(GameServersPage);
}
