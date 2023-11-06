import {IComponentType} from "@/types";

const Debug: React.FC<{ componentData: IComponentType; events?: any }> = ({
  componentData,
  events,
}) => {
  return JSON.stringify(componentData);
};

export default Debug;
