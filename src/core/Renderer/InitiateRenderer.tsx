import { PrepareRenderer } from "@/core/Renderer/PrepareRenderer";
import { initComponent } from "@/core/Renderer/helpers/init";
import { IComponentType } from "@/types";
import { getSession } from "@/utils/Auth/NextAuth";

export default async function InitiateRenderer(template: IComponentType[]) {
  const session = await getSession();

  return template.map(async (componentData: IComponentType, index: number) => {
    return (
      <PrepareRenderer
        component={await initComponent({
          ...componentData,
          ...{ session: session?.user },
        })}
        key={index}
      />
    );
  });
}
