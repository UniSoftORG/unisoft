import { IComponentType} from "@/types";

const Text: React.FC<{ componentData: IComponentType; events?: any }> = ({
  componentData,
  events,
}) => {
  return <span>{JSON.stringify(componentData)}</span>
};

export default Text;
