import { IComponentType } from "@/types";
import { initComponent } from '@/renderer/helpers/init';
import { PrepareRenderer } from "@/renderer/PrepareRenderer";

export default async function InitiateRenderer(template: IComponentType[]) {
  return template.map(async (componentData: IComponentType, index: number) => {
    return <PrepareRenderer component={await initComponent(componentData)} key={index} />;
  });
}
