import {ComponentData} from "@/types";

const Debug: React.FC<{ componentData: ComponentData; events?:any }> = ({componentData, events}) => {
    return JSON.stringify(componentData.props)
};

export default Debug;
