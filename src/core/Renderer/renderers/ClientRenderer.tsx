"use client";
import useModal from "@/core/Modals/hooks/useModal";
import Renderer from "@/core/Renderer/Render";
import StateRenderer from "@/core/Renderer/renderers/StateRenderer";
import { DefaultModalType, FunctionNames, IComponentType } from "@/types";

const ClientRenderer: React.FC<{
  component: IComponentType;
}> = ({ component }) => {
  const { activeComponent, onOpen, onClose } = useModal();

  if (component.states) {
    return (
      <StateRenderer
        component={{
          ...component,
          passAttributes: {
            ...component.passAttributes,
            hooks: {
              ...component.passAttributes?.hooks,
              ...{
                [FunctionNames.useModalHook]: (component: DefaultModalType) =>
                  onOpen(component),
              },
            },
          },
        }}
        key={component.uuid}
      />
    );
  }

  return (
    <Renderer
      component={{
        ...component,
        passAttributes: {
          ...component.passAttributes,
          hooks: {
            ...component.passAttributes?.hooks,
            ...{
              [FunctionNames.useModalHook]: (component: DefaultModalType) =>
                onOpen(component),
            },
          },
        },
      }}
      fromClient={true}
      key={component.uuid}
    />
  );
};

export default ClientRenderer;
