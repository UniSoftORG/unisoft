import { IComponentType } from "@/types";

const Text: React.FC<{ componentData: IComponentType; events?: any }> = ({
  componentData,
  events,
}) => {
  return (
    <span
      className={
        componentData.elementAttributes?.className + " whitespace-pre-line"
      }
    >
      {componentData.passAttributes?.text &&
      typeof componentData.passAttributes?.text === "string"
        ? componentData.passAttributes.text
        : undefined}
    </span>
  );
};

export default Text;
