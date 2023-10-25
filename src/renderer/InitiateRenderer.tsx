import { IComponentType } from "@/types";
import PrepareRenderer from "@/renderer/PrepareRenderer";

export default async function InitiateRenderer(template: any[]) {
  return template.map((componentData: IComponentType, index: number) => {
    return PrepareRenderer(componentData, index, true);
  });
  // let dynamicProps = {};

  // if (componentData?.requests?.length) {
  //     const requestedData = componentData.requests ? await createRequest(componentData.requests) : undefined
  //     dynamicProps = Object.keys(requestedData || {}).reduce((acc, key) => {
  //         if (!(requestedData) || requestedData[key] !== undefined) {
  //             if (requestedData) {
  //                 (acc as ComponentData)[key] = requestedData[key].data;
  //             }
  //         }
  //         return acc;
  //     }, {});
  // }
  // })
}
