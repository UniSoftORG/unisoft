"use client"
import Renderer from "../Renderer";
import {DetermineRendererProps} from "@/types";

const ClientRenderer: React.FC<DetermineRendererProps> = ({
                                                              componentData,
                                                              parentType,
                                                              parentUuid,
                                                              index,
                                                              parentProps
                                                          }) => {
    return <Renderer
        componentData={componentData}
        parentType={parentType}
        parentUuid={parentUuid}
        index={componentData.uuid}
        parentProps={parentProps}
    />
}

export default ClientRenderer;
