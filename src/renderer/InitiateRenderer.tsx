import {IComponentBase} from "@/types";
import DetermineRenderer from "./DetermineRenderer";
import {generatePassAttributes, replaceWithValuesFromMainObject} from "@/utils/Renderer/propUtils";
import {Transformers} from "unisoft-utils";

export default async function InitiateRenderer(template: any[]) {
    return template.map(async (componentData: any, index: number) => {
        let dynamicProps = {};

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
        generatePassAttributes(componentData, componentData?.passAttributes)
        replaceWithValuesFromMainObject(componentData, componentData.passAttributes)
        // if (componentData.dynamic) dynamicProps = Transformers.replaceDynamicTargets(dynamicProps, dynamicProps.dynamic);

        return <DetermineRenderer
            componentData={componentData}
            parentType={componentData.type}
            parentUuid={componentData.uuid}
            key={`${componentData.uuid}-${index}`}
            index={index}
        />
    })
}