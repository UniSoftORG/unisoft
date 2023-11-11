import { IComponentType } from '@/types';
import componentsMaps from '@/renderer/imports/components';
import { replaceDynamicTargets } from '@/renderer/helpers/replacers';
import { processRenderer } from '@/utils/Renderer/helpers';

const Renderer: React.FC<{
  component: IComponentType;
  passFromParent?: any;
  fromClient?: boolean;
}> = ({ component, passFromParent, fromClient }) => {
  const Component = componentsMaps[component.type];
  if (!Component) throw new Error(`Component does not exists!`);
  if (component.dynamic)
    component = replaceDynamicTargets(component, component.dynamic);
  component = processRenderer(component, fromClient);

  return <Component {...component} componentData={component} />;
};

export default Renderer;
