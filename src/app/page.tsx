import { IComponentType } from '@/types';
import { generateComponentForRendering } from '@/renderer/helpers/initializors';
import { PrepareRenderer } from '@/renderer/PrepareRenderer';
import { HomePage } from '@/template/home';

export default async function Home() {
  return HomePage.map(async (componentData: IComponentType, index: number) => {
    await generateComponentForRendering(componentData);

    return (
      <PrepareRenderer
        component={componentData}
        key={`${componentData.uuid}`}
        fromClient={false}
      />
    );
  });
}
