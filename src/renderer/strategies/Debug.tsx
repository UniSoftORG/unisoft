import { IComponentBase } from "@/types";

const Debug: React.FC<{ componentData: IComponentBase; events?: any }> = ({
  componentData,
  events,
}) => {
  return JSON.stringify(componentData.props);
};

export default Debug;
