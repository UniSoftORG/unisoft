import {DetermineRendererProps} from "@/types";
import Renderer from "./Renderer";
import ClientRenderer from "./renderers/ClientRenderer";

const DetermineRenderer: React.FC<DetermineRendererProps> = ({componentData, parentType, parentUuid, parentProps, index}) => {
    const props: DetermineRendererProps = {
        componentData: componentData,
        parentType: parentType,
        parentUuid: parentUuid,
        index: componentData.uuid,
        parentProps: parentProps
    }

    if (componentData.renderer === 'client') {
        return <ClientRenderer {...props} key={`${componentData.uuid}-${index}`}/>
    } else {
        return <Renderer {...props} key={`${componentData.uuid}-${index}`}/>
    }
}

export default DetermineRenderer;
