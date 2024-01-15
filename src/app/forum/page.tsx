import InitiateRenderer from '@/core/Renderer/InitiateRenderer';
import { ForumPage } from '@/template/pages/forum';

export default async function Forum() {
  return await InitiateRenderer(ForumPage);
}
