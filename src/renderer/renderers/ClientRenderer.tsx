import Renderer from "@/renderer/Render";
import StateRenderer from "@/renderer/renderers/StateRenderer";
import { IComponentType } from "@/types";

const ClientRenderer: React.FC<{
  component: IComponentType;
}> = ({ component }) => {
  if (component.states) {
    return <StateRenderer component={component} key={component.uuid} />;
  }

  return (
    <Renderer component={component} fromClient={true} key={component.uuid} />
  );
};

export default ClientRenderer;
