import {IComponentType} from "@/types";
import PrepareRenderer from "@/renderer/PrepareRenderer";
import {prepareRequests} from "@/renderer/helpers/initializors";

export default async function InitiateRenderer(template: IComponentType[]) {
    return template.map(async (componentData: IComponentType, index: number) => {

        if (componentData?.requests?.length) await prepareRequests(componentData, componentData.variables)

        return PrepareRenderer(componentData, index, true);
    });
}
