import { PrepareRenderer } from "@/renderer/PrepareRenderer";
import { generateComponentForRendering } from "@/renderer/helpers/generateComponentForRendering";
import { IComponentType } from "@/types";

export default async function InitiateRenderer(template: IComponentType[]) {
  return template.map(async (componentData: IComponentType, index: number) => {
    await generateComponentForRendering(componentData);

    return <PrepareRenderer component={componentData} key={index} />;
  });
}
