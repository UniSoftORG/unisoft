import {IComponent} from "@/types";

const Debug: React.FC<{ componentData: IComponent; events?:any }> = ({componentData, events}) => {
    return JSON.stringify(componentData.props)
};

export default Debug;
