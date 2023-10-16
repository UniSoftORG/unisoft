import {ComponentData} from "@/types";

const Text: React.FC<{ componentData: ComponentData; events?:any }> = ({componentData, events}) => {
    return componentData.props[componentData.props.text]
};

export default Text;
