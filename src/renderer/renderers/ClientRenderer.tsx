'use client';
import { IComponentType } from '@/types';
import StateRenderer from '@/renderer/renderers/StateRenderer';
import Renderer from '@/renderer/Render';
import { Suspense } from 'react';

const ClientRenderer: React.FC<{
  component: IComponentType;
}> = ({ component }) => {
  if (component.states) {
    return <StateRenderer component={component} key={component.uuid} />;
  }

  return (
    <Suspense>
      <Renderer component={component} fromClient={true} key={component.uuid} />
    </Suspense>
  );
};

export default ClientRenderer;
