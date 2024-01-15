import { IComponentType } from "@/types";
import { createElement } from 'react';

const Text: React.FC<{ componentData: IComponentType; events?: any }> = ({
  componentData,
  events,
}) => {
  return createElement(componentData.element ?? 'span', {
    className: componentData.elementAttributes?.className,
    ...events,
    style: componentData.elementAttributes?.style
  }, (
    componentData.passAttributes?.text
  ))
};

export default Text;
