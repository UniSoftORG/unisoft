import { IComponentType } from '@/types';
import { generateComponentForRendering } from '@/renderer/helpers/initializors';
import { PrepareRenderer } from '@/renderer/PrepareRenderer';
import { Slider } from '@/predefined/components/Sliders/Slider';

export default async function Home() {
  return [Slider].map(async (componentData: IComponentType, index: number) => {
    await generateComponentForRendering(componentData);

    return (
      <PrepareRenderer
        component={componentData}
        key={`${componentData.uuid}-${index}`}
        fromClient={false}
      />
    );
  });
}
