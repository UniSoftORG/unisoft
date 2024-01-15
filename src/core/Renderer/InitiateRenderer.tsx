import { PrepareRenderer } from "@/core/Renderer/PrepareRenderer";
import { initComponent } from "@/core/Renderer/helpers/init";
import { IComponentType } from "@/types";
import { getSession } from "@/utils/Auth/NextAuth";
// import { createJsonFile } from '@/utils/createFile';

export default async function InitiateRenderer(template: IComponentType[]) {
  const session = await getSession();

  return template.map(async (componentData: IComponentType, index: number) => {
    const test = await initComponent({
      ...componentData,
      ...{ session: session?.user },
    })

    // return <pre>{JSON.stringify(test.children[1].children[0].children[0].children[1], null, 2)}</pre>
    // // createJsonFile(test.name + ".json", test);
    return (
      <PrepareRenderer
        component={test}
        key={index}
      />
    );
  });
}
