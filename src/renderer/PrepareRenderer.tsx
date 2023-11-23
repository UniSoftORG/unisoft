import { IComponentType } from '@/types';
import Renderer from '@/renderer/Render';
import { Suspense } from 'react';
import ClientRenderer from '@/renderer/renderers/ClientRenderer';
import { replaceDynamicTargets } from '@/renderer/helpers/replacers';

export const PrepareRenderer: React.FC<{
  component: IComponentType;
  fromClient?: boolean;
}> = ({ component, fromClient }) => {
  if (component.dynamic)
    component = replaceDynamicTargets(component, component.dynamic);

  if (component.states) {
    return (
      <Suspense>
        <ClientRenderer key={component.uuid} component={component} />
      </Suspense>
    );
  }

  return (
    <Renderer
      component={component}
      key={component.uuid}
      fromClient={fromClient}
    />
  );
};
