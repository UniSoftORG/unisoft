import {IComponentBase} from "@/types";

const Text: React.FC<{ componentData: IComponentBase; events?:any }> = ({componentData, events}) => {
    return componentData.props.text
};

export default Text;
