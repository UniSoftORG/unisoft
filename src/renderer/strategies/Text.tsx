import { IComponentType } from "@/types";

const Text: React.FC<{ componentData: IComponentType; events?: any }> = ({
  componentData,
  events,
}) => {
  return (
    <span className={componentData.elementAttributes?.className}>
      {componentData.passAttributes.text}
    </span>
  );
};

export default Text;
