import { createElement } from 'react';
import ChildRenderer from '@/renderer/renderers/ChildRenderer';
import { IComponentType } from '@/types';
import { handleEvents } from '@/utils/Renderer/events';

const Element: React.FC<{
  children?: IComponentType[] | string;
  componentData: IComponentType;
}> = ({ children, componentData }) => {
  return createElement(
    componentData.element as string,
    {
      ...handleEvents(componentData, { customPrefix: 'executeOn' }),
      ...componentData.elementAttributes,
    },
    children ? (
      <ChildRenderer parentData={componentData}>{children}</ChildRenderer>
    ) : undefined
  );
};

export default Element;
