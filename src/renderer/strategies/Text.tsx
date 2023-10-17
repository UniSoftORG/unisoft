import {IComponent} from "@/types";

const Text: React.FC<{ componentData: IComponent; events?:any }> = ({componentData, events}) => {
    return componentData.props.text
};

export default Text;
