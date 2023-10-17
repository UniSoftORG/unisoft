import {IComponent} from "@/types";
import DetermineRenderer from "./DetermineRenderer";

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

        return <DetermineRenderer
            componentData={{...componentData, ...{props: {...componentData.props, ...dynamicProps}}}}
            parentType={componentData.type}
            parentUuid={componentData.uuid}
            key={`${componentData.uuid}-${index}`}
            index={index}
        />
    })
}