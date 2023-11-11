import { IComponentType } from '@/types';
import { runFunction } from '@/utils/Functions/DynamicFunctionLibrary';

type EventConfig = {
  function: string;
  props?: Array<{ name: string; from: string }>;
  from: string;
};

const events = [
  'Click',
  'MouseOver',
  'MouseEnter',
  'MouseDown',
  'MouseUp',
  'MouseMove',
  'MouseOut',
  'Blur',
  'Focus',
  'Change',
  'Submit',
];

export const handleEvents = (
  componentData: IComponentType,
  options: { customPrefix?: string }
) => {
  if (!componentData || !componentData.onEvents) return {};
  const handlers: { [key: string]: any } = {};

  componentData?.onEvents.map((customEvent: any) => {
    handlers['on' + customEvent.name] = (event: any) => {
      customEvent.callbacks.forEach((value: any) =>
        runFunction(value, componentData.uuid)
      );
    };
  });

  return handlers;
};
